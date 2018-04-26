<?php
    require('db.php');
    header('Content-Type: text/plain');

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

    $db_query = $db_conn->prepare('SELECT likes, unlikes FROM users WHERE login=:login');
    $db_query->bindParam(':login', $_POST['user']);
    $db_query->execute();
    $result = $db_query->fetchAll();
    $dislike = false;
    if(($result[0]['likes'] == null) && ($result[0]['unlikes'] == null)){
        
    }else if($result[0]['unlikes']){
        $table = json_decode($result[0]['unlikes']);
        foreach($table as $picture){
            if($picture == $_POST['id']){
                $dislike = true;
                break;
            }
            $dislike = false;
        }
    }

    if(!$dislike){
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
                    $end = true;
                    break;
                }
                $end = false;
            }
            if(!$end){
                array_push($table->table, $_POST['user']);
                $table = json_encode($table);
                $db_query = $db_conn->prepare('UPDATE pictures SET likesArray=:likesArray WHERE id=:id');
                $db_query->bindParam(':id', $_POST['id']);
                $db_query->bindParam(':likesArray', $table);
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
                        
                        $db_query = $db_conn->prepare('SELECT likes FROM users WHERE login=:login');
                        $db_query->bindParam(':login', $_POST['user']);
                        $db_query->execute();
                        $result = $db_query->fetchAll();


                        if($result[0]['likes'] == null){

                            $table = [];
                            array_push($table, $_POST['id']);
                            $table = json_encode($table);
                            $db_query = $db_conn->prepare('UPDATE users SET likes=:likes WHERE login=:login');
                            $db_query->bindParam(':login', $_POST['user']);
                            $db_query->bindParam(':likes', $table);

                            $db_query->execute();

                        }else{

                            $table = json_decode($result[0]['likes']);
                            array_push($table, $_POST['id']);
                            $table = json_encode($table);
                            $db_query = $db_conn->prepare('UPDATE users SET likes=:likes WHERE login=:login');
                            $db_query->bindParam(':login', $_POST['user']);
                            $db_query->bindParam(':likes', $table);

                            $db_query->execute();

                        }

                    }else{
                        print(3);
                    }
                    
                }else{
                    print(2);
                }
            }

        }
    }

    //1 - TA OSOBA ZLIKOWALA!
    //2 - ERROR
?>
