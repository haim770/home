<?php
$arr = [];
$arr['first_name'] = "lidor";
$arr['mail'] = "lidorag2@gmail.com";
$arr['password'] = password_hash("123", PASSWORD_DEFAULT);
$arr['uuid'] = uniqid();
$arr['last_name'] = "bs";
$arr['phone'] = "123456789";

$query = "register(:uuid,:first_name,:last_name,:phone,:mail,:password)";
$result = $db->writeDB($query, $arr);
echo json_encode($result);


?>