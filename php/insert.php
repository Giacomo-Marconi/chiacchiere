<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$colors = ['CBE4F9', 'CDF5F6', 'EFF9DA', 'F9EBDF', 'F9D8D6', 'D6CDEA'];

require_once 'database.php';

$db = databaseConnection();

if(isset($_POST['storia'])){
    echo "in<br>";
    $testo = $_POST['storia'];
    if($testo == ""){
        echo "vuoto";
        $db->close();
        header('Location: ../index.html');
        exit();
    }
    //echo $testo;
    $testo = str_replace("'", "\'", $testo);

    if(isset($_POST['colore'])){
        $colore = $_POST['colore'];
        $sql = "INSERT INTO post (testo, colore) VALUES ('$testo', '$colors[$colore]')";
    } else {
        $sql = "INSERT INTO post (testo, colore) VALUES ('$testo', '000000')";
    }
    

    if($db->query($sql) === TRUE){
        echo "create";
    } else {
        echo "Error: " . $sql . "<br>" . $db->error;
    }
} 

$db->close();

header('Location: ../index.html');