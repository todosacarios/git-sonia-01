

<?php
    
    session_start();

    require_once("../connection.php");

    if ( ! empty( $_POST ) ) {

        if ( isset( $_POST['userUser'] ) && isset( $_POST['passUser'] ) ) {

            $user1=mysqli_real_escape_string ($connection,$_POST['userUser']);
            $pass1=mysqli_real_escape_string ($connection,$_POST['passUser']);

            $miId=session_id();

            $resultado=mysqli_query($connection,"SELECT * FROM tblap_users WHERE userUser = '$user1' AND passUser = '$pass1'");

            $cuantos=  mysqli_num_rows($resultado);

        	if($cuantos==0){

                echo "<script> 
                location.href ='index.php';
                alert('User not Found $user1 $pass1 ;');
                </script>";

            }else{
               

                $regs=mysqli_fetch_array($resultado);
                
                $_SESSION['usuarioADA'] = $regs["nameUser"];

                // echo "<script> 
                // location.href ='index.php?op=menu.php';
                // </script>";

                echo "<script> 
                location.href ='index.php';
                </script>";
            }
            
        }
    }else{

        echo "No se ha enviado nada";
    }

$connection->close(); 


?>