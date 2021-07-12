<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require '../../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../../');
$dotenv->load();

$servername = $_ENV["DB_SERVER"];
$username = $_ENV["DB_USER"];
$password = $_ENV["DB_PW"];
$dbname = $_ENV["DB_NAME"];

$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$app = AppFactory::create();

$app->addRoutingMiddleware();
$errorMiddleware = $app->addErrorMiddleware(true, true, true);

// Ranking
$app->get('/api/index.php', function (Request $request, Response $response, $args) use ($conn) {

    $reslang = $conn->query("SET lc_time_names = 'ca_ES'");
    $res = $conn->query("SELECT B.userid,B.nom,B.galetes,UNIX_TIMESTAMP(B.updated_at) as updated,monthcookies FROM boles B
    LEFT JOIN (
        SELECT userid,SUM(newcookies) as monthcookies 
        FROM partides 
        WHERE MONTH(created_at) = MONTH(CURRENT_DATE())
        AND YEAR(created_at) = YEAR(CURRENT_DATE()) 
        GROUP BY userid
    ) P ON B.userid = P.userid
    WHERE B.nom is not null and B.nom<>'Ningú' ORDER BY monthcookies DESC, B.galetes DESC");
    $data = json_encode($res->fetchAll(PDO::FETCH_ASSOC));

    $res2 = $conn->query("SELECT userid,SUM(newcookies) as new FROM partides WHERE MONTH(created_at) = MONTH(CURRENT_DATE())
    AND YEAR(created_at) = YEAR(CURRENT_DATE()) GROUP BY userid");

    $response->getBody()->write($data);
    return $response->withHeader('Content-Type', 'application/json');
});

// Set balls
$app->post('/api/index.php', function (Request $request, Response $response, $args) use ($conn) {

    try {

        $post = json_decode($request->getBody());
        $galetes = intval($post->galetes);
        $newgaletes = intval($post->newgaletes);
        $nom = $post->nom;
        $ip = $_SERVER["REMOTE_ADDR"];
        $userid = $post->userid;
        $game = $post->game ?? 'boles';

        $insert1 = $conn->prepare("INSERT INTO partides (game,userid,cookies,newcookies) VALUES ( :game, :userid, :cookies, :newcookies )");
        $ex1 = $insert1->execute([
            ':game' => $game,
            ':userid' => $userid,
            ':cookies' => $galetes,
            ':newcookies' => $newgaletes
        ]);

        $insert = $conn->prepare("INSERT INTO boles (userid,ip,nom,galetes,created_at)
        VALUES (:userid, :ip, :nom, :galetes, NOW())
        ON DUPLICATE KEY UPDATE galetes = case when :galetes > galetes then :galetes else galetes end");
        $ex = $insert->execute([
            ':userid' => $userid,
            ':ip' => $ip,
            ':nom' => $nom,
            ':galetes' => $galetes
        ]);

        $stmt = $conn->prepare("SELECT * FROM boles WHERE userid=?");
        $stmt->execute([$userid]);
        $lastrow = $stmt->fetchObject();
        $data = json_encode($lastrow);
        $response->getBody()->write($data);
        return $response->withHeader('Content-Type', 'application/json');
    } catch (PDOException $e) {

        $data = json_encode([
            'error' => $e->getMessage()
        ]);
        $response->getBody()->write($data);
        return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
    }
});

// Load user data
$app->post('/api/loadUser/', function (Request $request, Response $response, $args) use ($conn) {

    $post = json_decode($request->getBody());
    $userid = $post->userid;

    $stmt = $conn->prepare("SELECT userid,nom,galetes FROM boles WHERE userid=? LIMIT 1");
    $stmt->execute([$userid]);
    $user = $stmt->fetchObject();

    $stmt2 = $conn->prepare("SELECT COUNT(*) FROM partides WHERE userid=?");
    $user->partides = $stmt2->execute([$userid]);

    $data = json_encode($user);
    $response->getBody()->write($data);
    return $response->withHeader('Content-Type', 'application/json');
});

// Change name
$app->post('/api/changeName/', function (Request $request, Response $response, $args) use ($conn) {

    $post = json_decode($request->getBody());
    $userid = $post->userid;
    $nom = $post->name;

    $insert1 = $conn->prepare("UPDATE boles SET nom=:nom WHERE userid=:userid");
    $ex1 = $insert1->execute([
        ':userid' => $userid,
        ':nom' => $nom
    ]);

    $stmt = $conn->prepare("SELECT * FROM boles WHERE userid=?");
    $stmt->execute([$userid]);
    $user = $stmt->fetchObject();
    $data = json_encode($user);
    $response->getBody()->write($data);
    return $response->withHeader('Content-Type', 'application/json');
});

$app->run();
