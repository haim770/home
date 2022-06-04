<?php
// get authTest file
$authPath = "../../../Authentication/authTest.php";
include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);

/** 
 * Get our user who wants to upload new ad to server
 */
$arr = []; //for global scope var
$query = "SELECT uuid from users where mail = :alice";
$arr["alice"] = $token->data->user;
$arr["alice"] = ($db->readDBNoStoredProcedure($query, $arr))[0]->uuid;


$querySelector = $DATA_OBJ->params->ss;
/**
 * Select all categorys distinct
 */
$query = "SELECT DISTINCT `category` FROM ad_content WHERE `master` = 1"
?>