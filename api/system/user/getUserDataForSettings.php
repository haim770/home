<?php
// get authTest file
$authPath = "../../Authentication/authTest.php";
include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);
$arr = []; //for global scope var
// our uuid
$arr["alice"] = $user->getUuid();

$query = "SELECT `first_name`,`last_name`,`phone`,`mail`,`rule`,`remaining_ads`,`rule` FROM `users` WHERE `uuid` =:alice";

echo json_encode(
    array(
        "message" => "users",
        "userdata" => $db->readDBNoStoredProcedure($query, $arr),
    )
);
die;
