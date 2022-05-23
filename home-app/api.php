<?php
//error_reporting(E_ALL);
//ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Credentials: true");

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
    if (isset($_POST['params'])) {
        $params = $_POST['params'];
    }
    if ($dataType == "ads")
        getAllAds();
    if ($dataType == "register")
        register();
    if (
        $dataType == "getSelectedAdByIdAndCity"
    ) {
        getSelectedAdByIdAndCity();
    }
    if ($dataType == 'insertAd') {
        insertAd();
    }
    if ($dataType == 'addParameterAds') {
        addParameterAds();
    }
    if ($dataType == 'login') {
        login();
    }
    if ($dataType == 'getAdByLink') {
        getAdByLink();
    }
    
}
function getAdByLink()
{
    global $db;
    global $arr;
    $arr['adLink'] = $_POST['adLink'];
    $query = "getAdByLink(:adLink)";
    $result = $db->readDB($query, $arr);
    var_dump($result);
    // echo json_encode ($result);
    $arr = [];
}
function getAllMasters(){
    //get masters from adcontent table
     global $db;
    global $DATA_OBJ;
    global $arr;
    $query = "getAllMasters()";
 $result = $db->readDb($query, $arr);
 $arr=[];
 echo json_encode($result);

}
function getAdsAndAdContentForAd()
{
    global $db;
    global $DATA_OBJ;
    global $arr;
    if (isset(($DATA_OBJ->params))) {
        $arr['adID'] = $DATA_OBJ->params; //the adid
    }
    $query = "getAdById(:adID)";
    $resultAdTable = $db->readDb($query, $arr);
    $query = "getAdContentForAdId(:adID)";
    $resultAdContentTable = $db->readDb($query, $arr);
    $result = [];
    $result["ad"] = $resultAdTable;
    $result["adContent"] = $resultAdContentTable;
    echo json_encode($result);
    $arr = [];
}
function generateKeysFromKeyValueArray()
{
    global $DATA_OBJ;
    $str = "";
    if (isset($DATA_OBJ->params)) {
        foreach ($DATA_OBJ->params as $key => $value) {
            if ($key == 'data_type') {
                continue;
            }

            $str .= "$key = :$key and ";
        }
        $str = substr($str, 0, -4);
    }
    return $str;
}
function searchInDbWithUnknownParamsAndTable($table)
{
    //the params are in a key value array and table is string
    global $DATA_OBJ;
    global $arr;
    global $db;
    $paramsName = generateKeysFromKeyValueArray();
    generateArrayParamsFromPost();
    $query = "select * from {$table} where $paramsName";
    //  echo $query;
    //  die;
    $result = $db->readDBNoStoredProcedure($query, $arr);
    $arr = [];
    echo json_encode($result);
}
function searchAdByParameters()
{
    global $DATA_OBJ;
    global $db;
    global $arr;
    $paramsName = generateStringsFromKeysPost();
    generateArrayParamsFromPost();
    $query = "searchAdByCityStreetRoomsPriceTypeWatch({$paramsName})";
    $result = $db->readDB($query, $arr);
    echo json_encode($result);
    $arr = [];
}
function generateArrayParamsFromPost()
{
    //GENERATE ARRAY OF KEYS AND VALUES FROM THE POST ARRAY
    global $arr;
    global $DATA_OBJ;
    if (isset($DATA_OBJ->params)) {
        foreach ($DATA_OBJ->params as $key => $value) {
            if ($key == 'data_type') {
                continue;
            }
            $arr[$key] = $value;
        }
    }
}
function generateStringsFromKeysPost()
{
    //returns the num of parameters with : as delimiter and ,
    global $DATA_OBJ;
    $str = "";
    if (isset($DATA_OBJ->params)) {
        foreach ($DATA_OBJ->params as $key => $value) {
            if ($key == 'data_type') {
                continue;
            }

            $str .= ":$key,";
        }
        $str = substr($str, 0, -1);
    }
    return $str;
}
function login()
{
    //user login to site by mail and password
    global $db;
    global $arr;
    $arr['mail'] = $_POST['mail'];
    $arr['password'] = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $query = "getUserByMailAndPassword(:mail,:password)";
    $result = $db->readDB($query, $arr);
    echo json_encode($result);
    $arr = [];
    if ($result)
        setLastSeen();
}
function setLastSeen()
{
    //user login to site by mail and password
    global $db;
    global $arr;
    $arr['last_seen'] = date("Y-m-d H:i:s");
    $arr['mail'] = $_POST['mail'];
    $query = "setLastSeen(:mail,:last_seen)";
    $result = $db->writeDB($query, $arr);
    if ($result != null) {
        echo "you are logged in";
    }
}
function register()
{
    global $db;
    global $arr;
    $arr['first_name'] = $_POST['first_name'];
    $arr['mail'] = $_POST['mail'];
    $arr['password'] = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $arr['uuid'] = uniqid();
    $arr['last_name'] = $_POST['last_name'];
    $arr['phone'] = $_POST['phone'];

    $query = "register(:uuid,:first_name,:last_name,:phone,:mail,:password)";
    $result = $db->writeDB($query, $arr);
    echo json_encode($result);
    $arr = [];
}
function addParameterAds()
{
    //adding columns to ads table
    global $db;
    global $arr;
    $arr['paramName'] = $_POST['paramName'];
    $arr['paramType'] = $_POST['paramType'];
    if ($arr['paramType'] == "VARCHAR")
        $query = "ALTER TABLE ads ADD `{$arr['paramName']}`  varchar(255) NULL";
    if ($arr['paramType'] == "INT")
        $query = "ALTER TABLE ads ADD `{$arr['paramName']}` int";
    if ($arr['paramType'] == "TEXT")
        $query = "ALTER TABLE ads ADD `{$arr['paramName']}` TEXT";
    if ($arr['paramType'] == "DOUBLE")
        $query = "ALTER TABLE ads ADD `{$arr['paramName']}` double";
    if ($arr['paramType'] == "date")
        $query = "ALTER TABLE ads ADD `{$arr['paramName']}` dateTime";



    $result = $db->writeDBNotStoredProcedure($query);
    $arr = [];
    echo json_encode($result);
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
    $arr = [];
}
function getAllAds()
{
    global $db;
    global $arr;
    $arr = [];
    $query = "getAdsTable";
    $arrayReturn = $db->readDB($query, $arr);
    echo json_encode($arrayReturn);
    $arr=[];
}
function searchAdByParameterswithAdContent(){
    global $db;
    global $arr;
    global $DATA_OBJ;
    $arr = [];
    $paramsName = generateStringsFromKeysPost();
    generateArrayParamsFromPost();
    $query = "searchAdByCityStreetRoomsPriceTypeWatch({$paramsName})";
    $result = $db->readDB($query, $arr);
    $query = "getAdsTable";
    print_r($DATA_OBJ->paramsForAdContent);
    die;
}
function insertPackage(){
    //insert package
    global $db;
    global $DATA_OBJ;
    global $arr;
    $arr['packageId'] = uniqid();
    generateArrayParamsFromPost();
    $query = "insertPackage(:packageId,:price,:title,:content,:ad_value)";
    $result = $db->writeDb($query, $arr);
    echo json_encode($result);
    $arr=[];
}
function getAllPackages(){
    global $db;
    global $DATA_OBJ;
    global $arr;
    $query = "getPackageTable()";
    $result = $db->readDB($query,[]);
    echo json_encode($result);

}
if(isset($DATA_OBJ->data_type)&&$DATA_OBJ->data_type=='getAllPackages'){
    getAllPackages();
}
else
if(isset($DATA_OBJ->data_type)&&$DATA_OBJ->data_type=='addPackage'){
    insertPackage();
}
else
if(isset($DATA_OBJ->data_type)&&$DATA_OBJ->data_type=='getAllMasters'){
    getAllMasters();
}
else
if ( isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type ==  'searchAdByParameters') {
        searchAdByParameters();
    }
 else
// proccess the data
if(isset ($DATA_OBJ->data_type)&&$DATA_OBJ->data_type=="searchAdByParameterswithAdContent"){
    searchAdByParameterswithAdContent();
}
if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "searchInDbWithUnknownParamsAndTable") {
    searchInDbWithUnknownParamsAndTable("ads");
} else
    // Proccess login
    if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "Login") {
        include("../api/Authentication/login.php");
    } else
if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "Logout") {
        include("../api/Authentication/logout.php");
    } else
if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "Refresh") {
        include("../api/Authentication/refreshTokenController.php");
    } else
if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "Regist") {
    include("../api/Authentication/regist.php");
    } else // proccess the data - Contact

        if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "contacts") {
            include("contact.php");}
        if (
            isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "getAllAds"
        ) {
            getAllAds();

        } else // proccess the data - Contact
            if (
                isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "TEST2"
            ) {
                getAllAds();
            } else // proccess the data - Contact
                if (
                    isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "SetNewParams"
                ) {

                    //element_Id,ad_Id,category_name,master_id,min_value_id,
                    //max_value_id,icon_id,free_text_id,required_id,name_id
                    global $db;
                    $arr = [];
                    $arr['element_Id'] = uniqid();
                    $arr['ad_Id'] = '0';
                    $arr['category_name'] = $DATA_OBJ->params->category_name ?? "null";
                    $arr['master_id'] = '1';
                    $arr['min_value_id'] = $DATA_OBJ->params->min_value_id ?? "0";
                    $arr['max_value_id'] = $DATA_OBJ->params->max_value_id ?? "0";
                    $arr['icon_id'] = $DATA_OBJ->params->icon_id ?? "null";
                    $arr['free_text_id'] = $DATA_OBJ->params->free_text_id ?? "null";
                    $arr['required_id'] = $DATA_OBJ->params->required_id ?? "0";
                    $arr['name_id'] = $DATA_OBJ->params->name_id ?? "null";
                    $query = "addMasterAdsParams(:element_Id,:ad_Id,:category_name,:master_id,:min_value_id,:max_value_id
    ,:icon_id,:free_text_id,:required_id,:name_id)";
                    $result = $db->writeDB($query, $arr);
                    echo json_encode($result);
                }
?>