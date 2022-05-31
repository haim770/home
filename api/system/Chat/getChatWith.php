<?php
// get authTest file
$authPath = "../../Authentication/authTest.php";
include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);

$arr = []; //for global scope var
// our uuid
$query = "SELECT uuid from users where mail = :alice";
$arr["alice"] = $token->data->user;
$arr["alice"] = ($db->readDBNoStoredProcedure($query, $arr))[0]->uuid;

// user we chat with uuid
$arr['chatWith'] = $DATA_OBJ->params->chatWith ?? "null";


//update seen stats to saw message.
$query = "update messages set seen = 1 ,newUpdate = 1 where receiver = :alice and sender = :chatWith and seen = 0";
$db->writeDBNotStoredProcedure($query, $arr);


//read data back from data base and display it on pur chat box
$query = "select * from messages where (sender =:alice && receiver =:chatWith) || (sender =:chatWith && receiver =:alice)";
$chatMessages = $db->readDBNoStoredProcedure($query, $arr);

$info = (object)[];
$info->chatMessages = $chatMessages;
$info->gotData = $DATA_OBJ->params;
$info->arr = $arr;
$info->data_type = "chatMessages";
echo json_encode($info);
die;
