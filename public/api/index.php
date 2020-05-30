<?php 
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Content-Type: application/json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require '../../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__.'/../../');
$dotenv->load();

$servername = $_ENV["DB_SERVER"];
$username = $_ENV["DB_USER"];
$password = $_ENV["DB_PW"];
$dbname = $_ENV["DB_NAME"];

$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

if(isset($_POST["nom"])):

    if(!isset($_POST["userid"])):
        echo json_encode([
            'error' => 'Estem fent canvis xupis. Sisplau, refresca el navegador per tenir l\'última versió. I si no encara no furula, espera una estona.'
        ]);
        exit;
    endif;

    try {

        $galetes = intval($_POST["galetes"]);
        $nom = $_POST["nom"];
        $ip = $_SERVER["REMOTE_ADDR"];
        $userid = $_POST["userid"];

        /*$sql = "INSERT INTO boles (ip,nom,galetes,created_at)
        VALUES ('".$_SERVER["REMOTE_ADDR"]."', '".$_POST["nom"]."', '".$_POST["galetes"]."', NOW())
        ON DUPLICATE KEY UPDATE galetes = '".$_POST["galetes"]."'";*/
        // use exec() because no results are returned
        /*$insert = $conn->prepare( "INSERT INTO boles (ip,nom,galetes,created_at)
        VALUES (:ip, :nom, :galetes, NOW())
        ON DUPLICATE KEY UPDATE galetes = case when :galetes < galetes + 11 then :galetes else galetes end");
        */
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
        echo json_encode($lastrow);
        exit;

    } catch(PDOException $e) {
        echo $sql . "<br>" . $e->getMessage();
    }

endif;

$reslang = $conn->query("SET lc_time_names = 'ca_ES'");
//DATE_FORMAT(updated_at, '%d %M %H:%i') as 'updated'
$res = $conn->query("SELECT userid,nom,galetes,UNIX_TIMESTAMP(updated_at) as updated FROM boles WHERE nom is not null and nom<>'Ningú' ORDER BY galetes DESC limit 30");
echo json_encode($res->fetchAll(PDO::FETCH_ASSOC));

exit;