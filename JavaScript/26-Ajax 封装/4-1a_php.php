<?php
    $username = $_GET['username'];//
    $password = $_GET['password'];
    $result;
    if($username == 'hello' && $password == '8888'){
        $result = '恭喜注册成功';
    }else{
        $result = '注册失败';
    }
    echo $result;
?>
