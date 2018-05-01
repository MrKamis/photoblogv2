<?php
    require('db.php');
    header('Content-Type: text/plain');

    try{
        $db_query = $db_conn->prepare();
    }
?>  