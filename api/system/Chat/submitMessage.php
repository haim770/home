<?php
// get authTest file
$authPath = "../../Authentication/authTest.php";
include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);

$CJSAESPath = "../../Authentication/DiffiHelman/CryptoAes.php";
require_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $CJSAESPath);

$secretKey = $user->getPrivateSharedKey();
$arr = []; //for global scope var
// our uuid
$query = "SELECT uuid from users where mail = :alice";
$arr["alice"] = $token->data->user;
$arr["alice"] = ($db->readDBNoStoredProcedure($query, $arr))[0]->uuid;

// user we chat with uuid
$arr['chatWith'] = $DATA_OBJ->params->chatWith ?? "null";
//$arr['date'] = date("Y-m-d H:i:s");

// Decrypt the incoming message
$arr['message'] = CryptoAes::cryptoJsAesDecrypt($secretKey, $DATA_OBJ->params->message); // message we got from the user.
$arr['msgid'] = uniqid(); // generate rnd msgid

// write our message to database
$query = "insert into messages (msgid,sender,receiver,message,dateMsg) values (:msgid,:alice,:chatWith,:message,NOW())";
$db->writeDBNotStoredProcedure($query, $arr);

// send back the message after we write the message in database
$query = "select * from messages where msgid = :msgid limit 1";
$a['msgid'] = $arr['msgid'];
$myLastMessage = $db->readDBNoStoredProcedure($query, $a); // return array of object 
$myLastMessage[0]->message = CryptoAes::cryptoJsAesEncrypt($secretKey, $myLastMessage[0]->message);

$info = (object)[];
$info->chatMessages = $myLastMessage;
$info->data_type = "chatMessages";

echo json_encode($info);
die;
