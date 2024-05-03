<?php

function databaseConnection() {
    $servername = "127.0.0.1";
    $username="giacomo";
    $password="giacomo";
    $dbname="chiacchiere";

    $db = new mysqli($servername, $username, $password, $dbname);


    if ($db->connect_error) {
        die('no connesso error: ' . $db->connect_error);

    }
    return $db;
}