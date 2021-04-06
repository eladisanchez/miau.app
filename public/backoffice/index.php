<?php 
require '../api/connection.php';
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Miau Backend</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css">
    <link rel="stylesheet" href="//cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css">
  </head>
  <body>
  <section class="section">
    <div class="container">
      <h1 class="title">
        Miau Backend
      </h1>
      <h2 class="subtitle">CUCU</h2>
    <table class="table" id="partides">
    <thead><tr>
        <td>Joc</td>
        <td>Hora</td>
        <td>Nom</td>
        <td>Punts</td>
        <td>Galetes</td>
    </tr>
    </thead>
      <?php

        $res = $conn->query("SELECT partides.game,partides.created_at,boles.nom,partides.newcookies,partides.cookies FROM partides INNER JOIN boles ON partides.userid=boles.userid ORDER BY partides.created_at DESC LIMIT 500");
        $partides = $res->fetchAll(PDO::FETCH_ASSOC);

        foreach($partides as $p):
            ?><tr><td><?= $p["game"] ?></td><td><?= $p["created_at"] ?></td><td><?= $p["nom"] ?></td><td><?= $p["newcookies"] ?></td><td><?= $p["cookies"] ?></td></tr><?php
        endforeach;
        
        ?>
    </div>
  </section>
  <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
  <script src="//cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
  <script>
    $(document).ready(function() {
    $('#partides').DataTable();
} );
    </script>
  </body>
</html>
