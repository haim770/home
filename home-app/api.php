<?php
//error_reporting(E_ALL);
//ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json');

// use to capture the data we get from client side
// we use this way and not with POST or GET becuse if we want to use it with POST or GET we need to 
// format our data before sending it to the server.
$DATA_RAW = file_get_contents("php://input");

/**
 * json_decode(json) => PHP =  EQUAL => JSON.parse()     ==> Convert Array to Object
 * json_encode(value) => PHP = EQUAL => JSON.strinfigy() ==> Convert Object to Array
 */
$DATA_OBJ = json_decode($DATA_RAW);
require_once('../api/system/classes/useDBs.php');
$db = dbClass::GetInstance();
$arr = [];
$error = "";
if (isset($_POST['data'])) {
    $dataType = $_POST['data'];
    if ($dataType == "ads")
        getAllAds();
    if (
        $dataType == "getSelectedAdByIdAndCity"
    ) {
        getSelectedAdByIdAndCity();
    }
    if ($dataType == 'insertAd') {
        insertAd();
    }
}
function insertAd()
{
    global $db;
    global $arr;
    $arr['adID'] = $_POST['adID'];
    $arr['city'] = $_POST['city'];
    $arr['street'] = $_POST['street'];
    $arr['building_number'] = $_POST['building_number'];
    $arr['entry'] = $_POST['entry'];
    $arr['user_id'] = $_POST['user_id'];
    $arr['apartment'] = $_POST['apartment'];
    $arr['rooms'] = $_POST['rooms'];
    $query = "insertAd(:adID,:city,:street,:building_number,:entry,:user_id,:apartment,:rooms)";
    $result = $db->writeDB($query, $arr);
    echo json_encode($result);
}
// select city from ads where adID =:adIDd
function getSelectedAdByIdAndCity()
{
    global $db;
    global $arr;
    $info = (object)[];
    $arr['id'] = 1;
    $arr['city'] = "haifa";
    $query = "getSelectedAdByIdAndCity(:id,:city)";
    $result = $db->readDB($query, $arr);
    echo json_encode($result);
}
function getAllAds()
{
    global $db;
    global $arr;
    $query = "getAdsTable";
    $arrayReturn = $db->readDB($query, $arr);
    echo json_encode($arrayReturn, JSON_FORCE_OBJECT);
}

// proccess the data
if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "TEST") {
    echo "TEST123";
} else // proccess the data - Contact
    if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "contacts") {
        include("contact.php");
    } else // proccess the data - Contact
        if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "TEST2"
        ) {
            getAllAds();
        }

