<?php
    if(!empty($_FILES)){
       $file = $_FILES["file"];

        $upload_dir = '../upload/';
        $tmp_name = basename(rand(1000,9999).pathinfo($file['name'], 2));

        

        if(move_uploaded_file($_FILES["file"]["tmp_name"], $upload_dir . basename($tmp_name))){
            
            require('db.php');

            $db_query = $db_conn->prepare('SELECT permissions FROM users WHERE login=:login');
            $db_query->bindParam(':login', $_POST['author']);
            $db_query->execute();
            $result = $db_query->fetchAll();
            if($result[0]['permissions'] == 0){
                return(print(3));
            }

            $db_query = $db_conn->prepare("INSERT INTO pictures(author, title, date, src, likes, unlikes) VALUES(:author, :title, NOW(), :src, 0, 0)");
            $db_query->bindParam(':author', $_POST['author']);
            $db_query->bindParam(':title', $_POST['title']);
            $src = 'upload/' . $tmp_name;
            $db_query->bindParam(':src', $src);

            $db_query->execute();
            print('complete');

        }else{
            print(2);
        }

    }else{
        print(1);
    }
?>