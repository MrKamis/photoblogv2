<?php
    require('db.php');
    header('Content-Type: text/plain');

    function generateRandomString($length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    $login = $_POST['login'];

    $key = generateRandomString(99);

    $db_query = $db_conn->prepare('DELETE FROM sessions WHERE login=:login');
    $db_query->bindParam(':login', $login);
    $db_query->execute();

    $db_query = $db_conn->prepare('INSERT INTO sessions(login, session_key) VALUES(:login, :session_key)');
    $db_query->bindParam(':login', $login);
    $db_query->bindParam(':session_key', $key);
    if($db_query->execute()){
        print($key);
    }else{
        print(1);
    }

?>