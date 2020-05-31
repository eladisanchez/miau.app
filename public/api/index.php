<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require '../../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__.'/../../');
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
    $res = $conn->query("SELECT userid,nom,galetes,UNIX_TIMESTAMP(updated_at) as updated FROM boles WHERE nom is not null and nom<>'Ningú' ORDER BY galetes DESC limit 50");
    $data = json_encode($res->fetchAll(PDO::FETCH_ASSOC));

    $response->getBody()->write($data);
    return $response->withHeader('Content-Type', 'application/json');

});

// Set balls
$app->post('/api/index.php', function (Request $request, Response $response, $args) use ($conn) {
    
    try {

        if(isset($_POST["nom"])):
            $galetes = intval($_POST["galetes"]);
            $nom = $_POST["nom"];
            $ip = $_SERVER["REMOTE_ADDR"];
            $userid = $_POST["userid"];
        else:
            $post = json_decode($request->getBody());
            $galetes = intval($post->galetes);
            $nom = $post->nom;
            $ip = $_SERVER["REMOTE_ADDR"];
            $userid = $post->userid;
        endif;

        $insert = $conn->prepare( "INSERT INTO boles (userid,ip,nom,galetes,created_at)
        VALUES (:userid, :ip, :nom, :galetes, NOW())
        ON DUPLICATE KEY UPDATE galetes = case when :galetes > galetes then :galetes else galetes end");
        $insert->execute([
            ':userid' => $userid,
            ':ip' => $ip,
            ':nom' => $nom,
            ':galetes' => $galetes
        ]);

        $id = $conn->lastInsertId();
        $stmt = $conn->prepare("SELECT * FROM boles WHERE id=?");
        $stmt->execute([$id]);
        $lastrow = $stmt->fetchObject();
        $data = json_encode($lastrow);
        $response->getBody()->write($data);
        return $response->withHeader('Content-Type', 'application/json');

    } catch(PDOException $e) {

        $data = json_encode([
            'error'=> $e->getMessage()
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
    $data = json_encode($user);
    $response->getBody()->write($data);
    return $response->withHeader('Content-Type', 'application/json');

});

$app->run();