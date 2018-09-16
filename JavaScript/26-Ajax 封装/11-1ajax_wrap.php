<?php
    $username = $_GET['username'];
    $password = $_GET['password'];
    $json = array(
        'name'=>$username,
        'password'=>$password
    );
    echo json_encode($json);//对象转字符串
?>
