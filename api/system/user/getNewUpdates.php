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
$query = "SELECT messages.message, users.first_name, users.last_name FROM messages INNER JOIN users ON messages.sender = users.uuid where messages.receiver =:alice and dateMsg >= NOW() - INTERVAL 2 SECOND";
$chats = $db->readDBNoStoredProcedure($query, $arr);
$info->chatMessages = $chats;


$info->data_type = "refresh";
echo json_encode($info);
die;
