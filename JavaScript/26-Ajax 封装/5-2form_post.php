<?php
    $username = $_POST['username'];//
    $password = $_POST['password'];
    $result;
    if($username == 'hello' && $password == '8888'){
        $result = 1;//成功
    }else{
        $result = 2;//失败
    }
    echo $result;
    header('location:./05-2form_post.html?'.$result);
?>
