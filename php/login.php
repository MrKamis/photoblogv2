<?php
    if(isSet($_POST["content"])){
        $user = json_decode($_POST["content"]);
        $user->lPassword = md5($user->lPassword);
        require('db.php');

        $db_query = $db_conn->prepare('SELECT login FROM users WHERE login=:login AND password=:password');

        $db_query->bindParam(':login', $user->lLogin);
        $db_query->bindParam(':password', $user->lPassword);

        $db_query->execute();
        $result = $db_query->fetchAll();

        if(!empty($result)){
            print('complete');
        }else{
            print('1');
        }
    }
?>