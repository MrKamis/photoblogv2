<?php
    if(isSet($_POST["content"])){
        $user = json_decode($_POST["content"]);
        if($user->rPassword == $user->rRepeatPassword){
            require('db.php');
            $user->rPassword = md5($user->rPassword);
            
            $db_query = $db_conn->prepare('SELECT * FROM users WHERE login=:login');
            $db_query->bindParam(':login', $user->rLogin);
            $db_query->execute();

            $result = $db_query->fetchAll();
            if(empty($result)){
                
                $db_query = null;
                $db_query = $db_conn->prepare('INSERT INTO users(login, password, permissions) VALUES(:login, :password, 0)');
                $db_query->bindParam(':login', $user->rLogin);
                $db_query->bindParam(':password', $user->rPassword);
                $db_query->execute();

                print('complete');

            }else{
                print('2');
            }
        }else{
            print('1');
        }
    }
?>