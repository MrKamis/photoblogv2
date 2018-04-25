<?php
    require('db.php');

    $db_query = $db_conn->prepare('SELECT likesArray, unlikesArray FROM pictures WHERE id=:id');
    $db_query->bindParam(':id', $_POST['id']);
    $db_query->execute();
    $result = $db_query->fetchAll();

    //print_r($result);

    if(empty($result)){
        $table = new Array();
        array_push($table, );
    }
    
?>