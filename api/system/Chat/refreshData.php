<?php
// get authTest file
$authPath = "../../Authentication/authTest.php";
include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);
$CJSAESPath = "../../Authentication/DiffiHelman/CryptoAes.php";
require_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $CJSAESPath);

$secretKey = $user->getPrivateSharedKey();

$arr = []; //for global scope var
$info = (object)[];
// our uuid
$query = "SELECT uuid from users where mail = :alice";
$arr["alice"] = $token->data->user;
$arr["alice"] = ($db->readDBNoStoredProcedure($query, $arr))[0]->uuid;

// user we chat with uuid
$arr['chatWith'] = $DATA_OBJ->params->chatWith ?? "null";

//read new messages we got
$query = "select * from messages where (sender =:chatWith and receiver =:alice and seen = 0)";
$chatMessages = $db->readDBNoStoredProcedure($query, $arr);
if(is_array($chatMessages))
foreach ($chatMessages as $row) {
    $row->message = CryptoAes::cryptoJsAesEncrypt($secretKey, $row->message);
}

//update seen stats to saw message.
$query = "update messages set seen = 1 ,newUpdate = 1 where (sender =:chatWith and receiver =:alice and seen = 0)";
$db->writeDBNotStoredProcedure($query, $arr);


$info->chatMessages = $chatMessages;
$info->data_type = "refreshChat";
echo json_encode($info);
die;
