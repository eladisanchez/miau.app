<?php 

header("Access-Control-Allow-Origin: http://eladi.cat");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Content-Type: application/json');


// La funcioneta
function funcionetaDelMarc() {

    $tubes = $_POST["tubes"];

    // COSES

    return $resultat;

}


// Retornar el numbro
echo json_encode([
    'steps' => funcionetaDelMarc()
]);
exit;