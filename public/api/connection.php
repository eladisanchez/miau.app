<?php 

require '../../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__.'/../../');
$dotenv->load();

$servername = $_ENV["DB_SERVER"];
$username = $_ENV["DB_USER"];
$password = $_ENV["DB_PW"];
$dbname = $_ENV["DB_NAME"];

$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);