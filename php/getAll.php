<?php
    class Photo{
        public function __construct($a, $b, $c, $d, $e, $f, $g){
            $this->title = $a;
            $this->author = $b;
            $this->src = $c;
            $this->date = $d;
            $this->likes = $e;
            $this->unlikes = $f;
            $this->id = $g;
        }
    }
    require('db.php');

    $db_query = $db_conn->prepare('SELECT * FROM pictures ORDER BY date DESC');
    $db_query->execute();
    $result = $db_query->fetchAll();

    $tablica = [];

    for($x = 0; $x < count($result); $x++){
        $tmp = new Photo($result[$x]['title'], $result[$x]['author'], $result[$x]['src'], $result[$x]['date'], $result[$x]['likes'], $result[$x]['unlikes'], $result[$x]['id']);
        array_push($tablica, $tmp);
    }

    print(json_encode($tablica));
?>