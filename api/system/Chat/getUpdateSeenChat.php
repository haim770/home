<?php
// get authTest file
$authPath = "../../Authentication/authTest.php";
include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);
$CJSAESPath = "../../Authentication/DiffiHelman/CryptoAes.php";
require_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $CJSAESPath);

$secretKey = $user->getPrivateSharedKey();

$arr = []; //for global scope var
// user we chat with uuid
$query = "select * from messages where sender = :alice && receiver =:chatWith && newUpdate = 1";
$arr["alice"] = $user->getUuid();
$arr['chatWith'] = $DATA_OBJ->params->chatWith ?? "null";
$newMessages = $db->readDBNoStoredProcedure($query, $arr);
// Encrypt all messages we send to the user
if (is_array($newMessages))
    foreach ($newMessages as $row) {
        $row->message = CryptoAes::cryptoJsAesEncrypt($secretKey, $row->message);
    }


$query = "update messages set newUpdate = 0 where (receiver = :chatWith and sender = :alice and newUpdate = 1)";
$db->writeDBNotStoredProcedure($query, $arr);

if (is_array($newMessages)) {
    $info = (object)[];
    $info->updates = $newMessages;
    echo json_encode($info);
    die;
}

die;
