<?php
    require('db.php');

    $db_query = $db_conn->prepare('SELECT unlikesArray FROM pictures WHERE id=:id');
    $db_query->bindParam(':id', $_POST['id']);
    $db_query->execute();
    $result = $db_query->fetchAll();
    if($result[0]['unlikesArray']){
        $table = json_decode($result[0]['unlikesArray']);
        $table = $table->table;

        for($x = 0; $x < count($table); $x++){
            if($_POST['user'] == $table[$x]){
                $dislike = true;
                break;
            }
            $dislike = false;
        }
    }

    $db_query = $db_conn->prepare('SELECT likesArray, unlikesArray FROM pictures WHERE id=:id');
    $db_query->bindParam(':id', $_POST['id']);
    $db_query->execute();
    $result = $db_query->fetchAll();

    //print_r($result);

    //print_r($result[0]['likesArray']);
    if(empty($result[0]['likesArray'])){
        
        $table = [];
        class Table{
            public $table = [];
        }
        $table = new Table();
        array_push($table->table, $_POST['user']);
        $table = json_encode($table);

        $db_query = $db_conn->prepare('UPDATE pictures SET likesArray=:likesArray WHERE id=:id');
        $db_query->bindParam(':likesArray', $table);
        $db_query->bindParam(':id', $_POST['id']);
        if($db_query->execute()){
            
            $db_query = $db_conn->prepare('SELECT likes FROM pictures WHERE id=:id');
            $db_query->bindParam(':id', $_POST['id']);
            $db_query->execute();

            $result = $db_query->fetchAll();

            $value = ++$result[0]['likes'];
            
            $db_query = $db_conn->prepare('UPDATE pictures SET likes=:likes WHERE id=:id');
            $db_query->bindParam(':id', $_POST['id']);
            $db_query->bindParam(':likes', $value);
            
            if($db_query->execute()){
                print('complete');
            }else{
                print(2);
            }

        }else{
            print(2);
        }

    }else{
        
        $table = json_decode($result[0]['likesArray']);
        //print_r($table->table);
        foreach($table->table as $person){
            if($person == $_POST['user']){
                
                print(1);
                break;
            }
        }

    }

    //1 - TA OSOBA ZLIKOWALA!
    //2 - ERROR
?>
