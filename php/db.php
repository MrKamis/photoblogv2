<?php
    $db_user = 'root';
    $db_password = '';
    $db_host = '127.0.0.1';
    $db_name = 'photoBlog';

    $db_conn = new PDO("mysql: host=$db_host; dbname=$db_name", $db_user, $db_password);
?>