<?php
    require('db.php');
    header('Content-Type: text/plain');

    try{
        $db_query = $db_conn->prepare('SELECT reviews FROM users WHERE login=:login');
        $db_query->bindParam(':login', $_POST['user']);
        $db_query->execute();
        $result = $db_query->fetchAll();

        if($result[0]['reviews'] == null){
            $table = [$_POST['id']];
            $table = json_encode($table);

            $db_query = $db_conn->prepare('UPDATE users SET reviews=:reviews WHERE login=:login');
            $db_query->bindParam(':reviews', $table);
            $db_query->bindParam(':login', $_POST['user']);
            if($db_query->execute()){

                $db_query = $db_conn->prepare('SELECT likes FROM pictures WHERE id=:id');
                $db_query->bindParam(':id', $_POST['id']);
                $db_query->execute();
                $result = $db_query->fetchAll();
                $likes = ++$result[0]['likes'];

                $db_query = $db_conn->prepare('UPDATE pictures SET likes=:likes WHERE id=:id');
                $db_query->bindParam(':likes', $likes);
                $db_query->bindParam(':id', $_POST['id']);
                if($db_query->execute()){
                    throw new Exception('complete');
                }else{
                    throw new Exception(3);
                }

            }else{
                throw new Exception(2);
            }
        }else{
            $table = json_decode($result[0]['reviews']);
            foreach($table as $item){
                if($item == $_POST['id']){
                    throw new Exception(1);
                    break;
                }
            }

            $db_query = $db_conn->prepare('UPDATE users SET reviews=:reviews WHERE login=:login');
            $db_query->bindParam(':login', $_POST['user']);
            array_push($table, $_POST['id']);
            $table = json_encode($table);
            $db_query->bindParam(':reviews', $table);
            $db_query->execute();

            $db_query = $db_conn->prepare('SELECT likes FROM pictures WHERE id=:id');
            $db_query->bindParam(':id', $_POST['id']);
            $db_query->execute();
            $result = $db_query->fetchAll();
            $likes = ++$result[0]['likes'];

            $db_query = $db_conn->prepare('UPDATE pictures SET likes=:likes WHERE id=:id');
            $db_query->bindParam(':likes', $likes);
            $db_query->bindParam(':id', $_POST['id']);
            if($db_query->execute()){
                throw new Exception('complete');
            }else{
                throw new Exception(3);
            }

        }
    }catch(Exception $e){
        print($e->getMessage());
    }
?>