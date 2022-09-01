<?php
// get authTest file
$authPath = "../../Authentication/authTest.php";
include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);

$arr = []; //for global scope var
$query = "SELECT uuid from users where mail = :alice";
$arr["alice"] = $token->data->user;
$arr["alice"] = ($db->readDBNoStoredProcedure($query, $arr))[0]->uuid;
// get users list with there message counter.
$query= "SELECT first_name, last_name, uuid, (SELECT COUNT(messages.seen) FROM `messages` WHERE messages.seen=0 AND messages.receiver=:alice and messages.sender=uuid) as new_prv_msg from users where uuid in (SELECT DISTINCT sender from messages where receiver =:alice UNION SELECT DISTINCT receiver from messages where sender =:alice)";
$info = (object)[];
$info->message = $db->readDBNoStoredProcedure($query, $arr);
$info->data_type = "contactList";
echo json_encode($info);
die;

?>