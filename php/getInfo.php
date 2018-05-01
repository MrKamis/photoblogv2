<?php
    require('db.php');
    header('Content-Type: text/plain');

    try{
        $db_query = $db_conn->prepare('SELECT * FROM users WHERE login=:login');
        $db_query->bindParam(':login', $_POST['login']);

        if(!$db_query->execute()){
            throw new Exception(1);
        }

        $result = $db_query->fetchAll();

        class User{
                public $login;
                public $permissions;
                public $reviews;
            public function __construct($login, $permissions = 1, $reviews){
                $this->login = $login;
                $this->permissions = $permissions;
                $this->reviews = json_decode($reviews);
            }
        }

        $user = new User($result[0]['login'], $result[0]['permissions'], $result[0]['reviews']);
        throw new Exception(json_encode($user));
    }catch(Exception $e){
        print($e->getMessage());
    }
?>