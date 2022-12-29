<?php

session_start();

    if(isset($_SESSION['usuarioADA'])){

        if(isset($_GET["op"])){

            $opcion=$_GET["op"];

        }else{

            $opcion='menu.php';

            $usuario =$_SESSION['usuarioADA'];
            
            require_once 'topMenu.php';

            require_once $opcion;
        }

    }else{

        $opcion='loginForm.php';
        echo "No hay sesion iniciada";
    	require_once $opcion;
    }

?>

<?php

// if(isset($_GET["op"])){

// 	$opcion=$_GET["op"];

// }else{

// 	$opcion="welcome.php";
// }

?>

<?php 

    //require_once 'loginForm.php'; 

?>

<?php 

    // if(isset($_SESSION['usuario'])){

    // 	$usuario =$_SESSION['usuario'];
        
    // 	require_once 'topMenu.php';

    // 	require_once $opcion;

    // }else{

    // 	require_once $opcion;
    // } 

?>

<?php 

    //require_once 'pie.php'; 
    
?>