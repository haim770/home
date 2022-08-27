<?php
/**
 * This api need to get only posts that contains Form data!
 */
//error_reporting(E_ALL);
//ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

$DATA_OBJ = $_POST;
$data_type = $DATA_OBJ["data_type"] ?? "";
require_once('../api/system/classes/useDBs.php');
$db = dbClass::GetInstance();

// Proccess postNewAdd
if ($DATA_OBJ["data_type"] == "postNewAdd") {
    include("../api/system/Ads/CreateNewAd/postNewAdd.php");
}
if($DATA_OBJ["data_type"] == "editAd"){
    include("../api/system/Ads/CreateNewAd/editAd.php");
    die;
}

if ($DATA_OBJ["data_type"] == "postNewBlog") {
    include("../api/system/Blog/postNewBlog.php");
    die;
}

if ($DATA_OBJ["data_type"] == "updateBlog") {
    include("../api/system/Blog/updateBlog.php");
    die;
}
?>