<?php
    $username = $_GET['username'];//
    $password = $_GET['password'];
    $result;
    if($username == 'hello' && $password == '8888'){
        $result = 1;//成功
    }else{
        $result = 2;//失败
    }
    echo $result;
    //header('location:./04-2a_php_target.html?'.$result);
?>
