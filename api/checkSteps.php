<?php 

header("Access-Control-Allow-Origin: http://eladi.cat");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Content-Type: application/json');


// La funcioneta
function funcionetaDelMarc() {

    $tubes = $_POST["tubes"];

    $tubes = [
        [1,2,3],
        [3,7,9,4],
        [1,9,4],
        [6,2,3,3],
        [8,6],
        [],
        []
    ];

    // COSES

    return $resultat;

}


// Retornar el numbro
echo json_encode([
    'steps' => funcionetaDelMarc()
]);
exit;