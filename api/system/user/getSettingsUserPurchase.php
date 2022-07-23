<?php
// get authTest file
$authPath = "../../Authentication/authTest.php";
include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);
$arr = []; //for global scope var
// our uuid
$arr["alice"] = $user->getUuid();

$query = "SELECT `purchase_id`as id, `packageId` as pack_id, `purchase_time` as purchase_date, `price` as value  FROM `purchase_history` WHERE `userId` =:alice";

echo json_encode(
    array(
        "message" => "users",
        "result" => $db->readDBNoStoredProcedure($query, $arr),
    )
);
die;