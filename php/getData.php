<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);



require_once 'database.php';

$db = databaseConnection();

$query = "SELECT * FROM post";
$result = $db->query($query);

$post = array();


while($row = $result->fetch_assoc()) {

    $temp=array();

    $temp['testo'] = $row['testo'];
    $temp['id']=$row['id'];
    $temp['color']=$row['colore'];

    $post[] = $temp;
}

header('Content-Type: application/json');

echo json_encode($post);