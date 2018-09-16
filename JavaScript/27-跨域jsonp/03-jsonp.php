<?php
    header('Content-Type:text/html;charset=UTF-8');
    // $dType = $_GET['dType'];
    $callback = $_GET['callback'];
    $arr = array(
        "name"=>"二狗",
        "age"=>20,
        "sex"=>'男'
    );
    echo $callback.'('.json_encode($arr).')';
?>
