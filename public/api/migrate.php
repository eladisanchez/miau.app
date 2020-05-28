<?php 

require 'connection.php';

if(isset($_GET["u"])):

    $res = $conn->prepare("SELECT nom,galetes,userid FROM boles WHERE userid = :userid LIMIT 1");
    $res->execute([
        ':userid' => $_GET["u"]
    ]);
    $user = $res->fetchObject();

endif;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Miau</title>
</head>
<body>
    <script>
        localStorage.setItem('userId','<?php echo $user->userid;?>');
        localStorage.setItem('cookies',<?php echo $user->galetes;?>);
        localStorage.setItem('user','<?php echo $user->nom;?>');
        window.location.href='https://miau.app';
    </script>
</body>
</html>
