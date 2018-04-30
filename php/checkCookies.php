<?php
    require('db.php');
    header('Content-Type: text/plain');

    $db_query = $db_conn->prepare('SELECT * FROM sessions WHERE session_key=:session_key');
    $db_query->bindParam(':session_key', $_POST['content']);
    $db_query->execute();
    $result = $db_query->fetchAll();

    if(!empty($result[0]['login'])){
        print($result[0]['login']);
    }else{
        print(1);
    }
?>