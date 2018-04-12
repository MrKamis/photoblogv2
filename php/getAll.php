<?php
    class Test{
        public $tab = [];
        public function __construct($a){
            array_push($this->tab, $a);
        }
    };
    class Photo{
        public function __construct($a, $b, $c){
            $this->title = $a;
            $this->author = $b;
            $this->src = $c;
            $this->date = date('d.m.y');
            $this->likes = 0;
            $this->unlikes = 0;
        }
    }
    class Tablica{
        public $tab = [];
    }
    $tab = new Tablica;
    for($z = 0; $z < 20; $z++){
        $y = new Photo('mrkami', 'TESTCIK', 'upload/test.jpg');
        $x = new Test($y);
        array_push($tab->tab, $x);
    }
    print(json_encode($tab));
?>