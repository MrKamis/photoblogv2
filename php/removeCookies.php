<?php
    require('db.php');
    header('Content-Type: text/plain');

    $db_query = $db_conn->prepare('DELETE FROM sessions WHERE login=:login');
    $db_query->bindParam(':login', $_POST['content']);
    
    if($db_query->execute()){
        print('complete');
    }else{
        print(1);
    }

?>