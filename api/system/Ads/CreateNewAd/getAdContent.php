<?php
// get authTest file
$authPath = "../../../Authentication/authTest.php";
include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);
/**
 * Select all categorys distinct
 */
$arr = []; //for global scope var
$arr["type"] = $DATA_OBJ->params->type;
if($arr["type"]=="buy")
    $arr["type"] = "קנייה";
else {
    $arr["type"] = "השכרה";
}
$query = "SELECT * FROM `ad_content` WHERE `category` =:type and `master` = 1;";
echo json_encode(
    array(
        "message" => "additionalParams",
        "result" => $db->readDBNoStoredProcedure($query, $arr),
    )
);
die;
?>