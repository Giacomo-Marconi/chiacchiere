<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);



require_once 'database.php';

$db = databaseConnection();

if(isset($_POST['storia'])){
    echo "in<br>";
    $testo = $_POST['storia'];
    echo "mamma";
    
    //echo $testo;
    $testo = str_replace("'", "\'", $testo);

    $sql = "INSERT INTO post (testo, autore) VALUES ('$testo', 'test')";
    

    if($db->query($sql) === TRUE){
        echo "create";
    } else {
        echo "Error: " . $sql . "<br>" . $db->error;
    }
} 

$db->close();

header('Location: ../index.html');