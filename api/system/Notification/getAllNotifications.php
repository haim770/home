<?php
// get authTest file
$authPath = "../../Authentication/authTest.php";
include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);

$arr = []; //for global scope var

// our uuid
$arr["alice"] = $user->getUuid();

$query = "SELECT `message_content`,`create_time`,`seen`,`msgType`,`NotificationType` FROM `system_messages` where `userId`=:alice order by seen ASC, create_time DESC";

$info = (object)[];
$info->notifications = $db->readDBNoStoredProcedure($query, $arr);

$query = "UPDATE `system_messages` SET `seen`=1 WHERE `userId`=:alice";
$db->writeDBNotStoredProcedure($query,$arr);
echo json_encode($info);
