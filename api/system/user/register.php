<?php
register();
function register()
{
    global $db;
    global $arr;
    global $DATA_OBJ;
    $arr=[];
    $arr['first_name'] =$DATA_OBJ->params->first_name;
    $arr['mail'] =$DATA_OBJ->params->mail;
    $arr['password'] = password_hash($DATA_OBJ->params->password, PASSWORD_DEFAULT);
    $arr['uuid'] = uniqid();
    $arr['last_name'] = $DATA_OBJ->params->last_name;
    $arr['phone'] = $DATA_OBJ->params->phone;
    $query = "register(:uuid,:first_name,:last_name,:phone,:mail,:password)";
    $result = $db->writeDB($query, $arr);
    echo json_encode($result);
    $arr = [];
}


?>