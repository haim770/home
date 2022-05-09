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
$arr=[];
$error = "";
if(isset($_POST['data'])){
$dataType = $_POST['data'];
if ($dataType == "ads") 
getAllAds();
if ($dataType == "register") 
register();
if($dataType=="getSelectedAdByIdAndCity"
){
getSelectedAdByIdAndCity();
}
if($dataType=='insertAd'){
    insertAd();
}
if($dataType=='addParameterAds'){
    addParameterAds();
}
if($dataType=='login'){
    login();
}
}
function login(){
    //user login to site by mail and password
    global $db;
    global $arr;
    $arr['mail']=$_POST['mail'];
    $arr['password']=password_hash($_POST['password'], PASSWORD_DEFAULT);
    $query = "getUserByMailAndPassword(:mail,:password)";
    $result=$db->readDB($query,$arr);
    echo json_encode($result);
    $arr=[];
    if($result)
        setLastSeen();
}
function setLastSeen(){
    //user login to site by mail and password
    global $db;
    global $arr;
    $arr['last_seen']=date("Y-m-d H:i:s");
    $arr['mail']=$_POST['mail'];
    $query = "setLastSeen(:mail,:last_seen)";
    $result=$db->writeDB($query,$arr);
    if($result!=null){
        echo "you are logged in";
    }
}
function register(){
      global $db;
    global $arr;
    $arr['first_name']=$_POST['first_name'];
    $arr['mail']=$_POST['mail'];
    $arr['password']=password_hash($_POST['password'], PASSWORD_DEFAULT);
    $arr['uuid']=uniqid();
    $arr['last_name']=$_POST['last_name'];
    $arr['phone']=$_POST['phone'];
    
   $query = "register(:uuid,:first_name,:last_name,:phone,:mail,:password)";
    $result=$db->writeDB($query,$arr);
	echo json_encode ($result);
    $arr=[];
}
function addParameterAds(){
    global $db;
    global $arr;
    $arr['paramName']=$_POST['paramName'];
    $arr['paramType']=$_POST['paramType'];
    if($arr['paramType']=="VARCHAR")
    $query="ALTER TABLE ads ADD `{$arr['paramName']}`  varchar(255) NULL";
    if($arr['paramType']=="INT")
    $query="ALTER TABLE ads ADD `{$arr['paramName']}`  tinyint(1)";
    if($arr['paramType']=="TEXT")
    $query="ALTER TABLE ads ADD `{$arr['paramName']}` TEXT";
    $result=$db->writeDBNotStoredProcedure($query);
    $arr=[];
	echo json_encode ($result);
}
function insertAd(){
    global $db;
    global $arr;
    $arr['adID']=$_POST['adID'];
    $arr['city']=$_POST['city'];
    $arr['street']=$_POST['street'];
    $arr['building_number']=$_POST['building_number'];
    $arr['entry']=$_POST['entry'];
    $arr['user_id']=$_POST['user_id'];
    $arr['apartment']=$_POST['apartment'];
    $arr['rooms']=$_POST['rooms'];
    $query = "insertAd(:adID,:city,:street,:building_number,:entry,:user_id,:apartment,:rooms)";
    $result=$db->writeDB($query,$arr);
	echo json_encode ($result);
}
// select city from ads where adID =:adIDd
function getSelectedAdByIdAndCity(){
    global $db;
    global $arr;
    $info = (object)[];
    $arr['id']=1;
    $arr['city']="haifa";
    $query = "getSelectedAdByIdAndCity(:id,:city)";
    $result=$db->readDB($query,$arr);
    echo json_encode ($result);
}
function getAllAds(){
    global $db;
    global $arr;
    $arr=[];
    $query = "getAdsTable";
    $arrayReturn= $db->readDB($query,$arr);
    // echo json_encode ($arrayReturn,JSON_FORCE_OBJECT);
    echo json_encode ($arrayReturn);
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

