<?php
// get authTest file
$authPath = "../../Authentication/authTest.php";
include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);

$arr = []; //for global scope var
$query = "SELECT uuid from users where mail = :alice";
$arr["alice"] = $token->data->user;
$arr["alice"] = ($db->readDBNoStoredProcedure($query, $arr))[0]->uuid;


?>
