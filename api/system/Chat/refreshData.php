<?php
// get authTest file
$authPath = "../../Authentication/authTest.php";
include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);

$arr = []; //for global scope var
$info = (object)[];
// our uuid
$query = "SELECT uuid from users where mail = :alice";
$arr["alice"] = $token->data->user;
$arr["alice"] = ($db->readDBNoStoredProcedure($query, $arr))[0]->uuid;

// user we chat with uuid
$arr['chatWith'] = $DATA_OBJ->params->chatWith ?? "null";


//gets new msgs updates we got and set the status of new updates
$query = "select * from messages where sender = :alice && receiver =:chatWith && newUpdate = 1";
$messageUpdateView = $db->readDBNoStoredProcedure($query, $arr);
$messageToUpdate = array();
$info->newMessageUpdate = 0;
    if (is_array($messageUpdateView)) {
        $info->newMessageUpdate = 1;
        //update database that we recived the updates
        $query = "update messages set newUpdate = 1 where (receiver = :alice and sender = :chatWith and newUpdate = 1)";
        $db->writeDBNotStoredProcedure($query, $arr);
            foreach ($messageUpdateView as $value) {
                array_push($messageToUpdate,['msgid'=>$value->msgid,'seen'=>$value->seen, 'received' => $value->received]);
            }
        }
$info->msgUpdate = $messageToUpdate; //update field to dend for js

//read new messages we got
$query = "select * from messages where (sender =:chatWith and receiver =:alice and seen = 0)";
$chatMessages = $db->readDBNoStoredProcedure($query, $arr);

//update seen stats to saw message.
$query = "update messages set seen = 1 ,newUpdate = 1 where (sender =:chatWith and receiver =:alice and seen = 0)";
$db->writeDBNotStoredProcedure($query, $arr);


$info->chatMessages = $chatMessages;
$info->data_type = "refreshChat";
echo json_encode($info);
die;
