<?php
    header('Content-Type:text/html;charset=UTF-8');//响应头信息
    $username = $_GET['username'];//
    $password = $_GET['password'];
    $result;
    if($username == 'hello' && $password == '8888'){
        $result = 1;//成功
    }else{
        $result = 2;//失败
    }
    echo 'HELLO WORLD';
    //header('location:./05-2form_post.html?'.$result);
?>
