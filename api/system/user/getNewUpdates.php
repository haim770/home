<?php
// get authTest file
$authPath = "../../Authentication/authTest.php";
include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);

$arr = []; //for global scope var
$info = (object)[];
// our uuid
$arr["alice"] = $user->getUuid();

//read new messages we got
// >= NOW()-2 => get all new data got in last 2 seconds
$query = "SELECT messages.message, users.first_name, users.last_name, users.uuid FROM messages INNER JOIN users ON messages.sender = users.uuid where messages.receiver =:alice and dateMsg >= NOW() - INTERVAL 2 SECOND";
$chats = $db->readDBNoStoredProcedure($query, $arr);
$info->chatMessages = $chats;

$query = "SELECT COUNT(`seen`) as new_sys_msg FROM `system_messages` WHERE `seen`=0 and `userId`=:alice";
$sys_msg_count = $db->readDBNoStoredProcedure($query, $arr);
$info->system_messages = $sys_msg_count;

$query = "SELECT COUNT(`seen`) as new_prv_msg FROM `messages` WHERE `seen`=0 AND `receiver`=:alice";
$prv_msg_count = $db->readDBNoStoredProcedure($query, $arr);
$info->personal_messages = $prv_msg_count;

$info->data_type = "refresh";
echo json_encode($info);
die;
