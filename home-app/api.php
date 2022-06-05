<?php
//error_reporting(E_ALL);
//ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
// use to capture the data we get from client side
// we use this way and not with POST or GET becuse if we want to use it with POST or GET we need to 
// format our data before sending it to the server.
$DATA_RAW = file_get_contents("php://input");
require_once('../api/system/Ads/searchAds.php');

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
function generateSearchFromBothAdContentAndAds(){
    //make a search arr from the params we got and based on adcontent and ads gets a start of the search query
    //also consider offset request and limit.
    global $arr;
    global $DATA_OBJ;
    if(!isset($DATA_OBJ->params)||$DATA_OBJ->params==[]){
        //if there is no params
        return "select  DISTINCT ads.adID,ads.user_id from ads limit ".$DATA_OBJ->limitBy->end." OFFSET ".$DATA_OBJ->limitBy->start.";";
    }
    //if there is parameters to search by
    $query="select DISTINCT ads.adID,ads.user_id from ads,ad_content where ads.adID=ad_content.adID" ;
    $queryAdTableParams="";//the part for querying ads table
    $queryAdContentTableParams="";//the part for querying adcontent
    if (isset($DATA_OBJ->params)) {
        foreach ($DATA_OBJ->params as $key => $value) {
            if ($key == 'data_type') {
                continue;
            }
            if($key=="create_time"||$key=="user_id"||$key=="active"||$key=="contact_counter"||$key=="watch"||$key=="close_reason"||$key=="expire_date"||$key=="approval_status"||$key=="ad_link"||$key=="city"||$key=="street"||$key=="building_number"||$key=="entry"||$key=="apartment"||$key=="zip_code"||$key=="map_X"||$key=="map_Y"||$key=="price"||$key=="rooms"||$key=="adType"){
                $queryAdTableParams.=" and $key = '$value' ";
                $arr[$key] = $value;

            }
            else{
               $queryAdContentTableParams.="and EXISTS(select 1 from ad_content where ad_content.name = '$key' and ad_content.value ='$value')"; 
               $arr[$key] = $key;
               $arr[$value] = $value;
            }
            
        }
        if (isset($DATA_OBJ->limitBy)){
             $query.=" ".$queryAdTableParams." ".$queryAdContentTableParams." limit ".$DATA_OBJ->limitBy->end." offset ".$DATA_OBJ->limitBy->start.";";
        }
        else{
        $query.=" ".$queryAdTableParams." ".$queryAdContentTableParams.";";
    }
    }
    return $query;
}
function getAdsIdAndUserIdThatFeetSearch(){
    //we search in ads and in adcontent and get adid and user id desired ad return them
     global $db;
    global $DATA_OBJ;
    global $arr;
     $query = generateSearchFromBothAdContentAndAds();
    $result = $db->readDBNoStoredProcedure($query,[]);
    
    $arr=[];
    return $result;
}
function getAdWithAdContentForAdId($adId,$user_id){
    //get adcontent+ad for adid
    global $db;
    global $DATA_OBJ;
    global $arr;
    $arr=[];
    $arr['adID'] = $adId; //the adid
    $query = "getAdById(:adID)";
    $resultAdTable = $db->readDb($query, $arr);
    $query = "getAdContentForAdId(:adID)";
    $resultAdContentTable = $db->readDb($query, $arr);
    $resultUserForTheAd=getUserForUserId($user_id);
    $resultImagesForAdId=getImagesForAdId($adId);
    $result = [];
    $result["ad"] = $resultAdTable;
    $result["adContent"] = $resultAdContentTable;
    $result["user"]=$resultUserForTheAd;
    $result["adImages"]=$resultImagesForAdId;
    $arr = [];
    return $result;
}
function getImagesForAdId($adId){
    //return the images for the adId
    global $db;
    global $DATA_OBJ;
    global $arr;
    $arr=[];
    $arr['element_id'] = $adId; //the adid
    $query = "select * from pictures where element_id =:element_id order by serial_number";
    $result = $db->readDBNoStoredProcedure($query, $arr);
    $arr=[];
    return $result;
}
function checkIfPathIsFile($path){
    if(isset($path)&&is_file($path)){
        return true;
    }
    return false;
}
function getUserForUserId($user_id){
    //return user record for param user_id
    global $db;
    global $DATA_OBJ;
    global $arr;
    $arr=[];
    $arr['uuid'] = $user_id; //the userId
    $query = "select * from users where uuid =:uuid";
    $result = $db->readDBNoStoredProcedure($query, $arr);
    $arr=[];
    return $result;
}
function getAllAdContentAndAdAndUsersForArrOfAds(){
    //returns the wanted ads with all their data and user created the ad
    $arr=[];
    $adIdsForTheSearch=getAdsIdAndUserIdThatFeetSearch();
    // $adIdsForTheSearch= json_decode(json_encode($adIdsForTheSearch));
    $result=[];
    // echo count($adIdsForTheSearch);
    $i=0;
    if(gettype($adIdsForTheSearch)!="array"&&gettype($adIdsForTheSearch)!="Array"&&gettype($adIdsForTheSearch)!="Object"){
        $arr=[];
        return;
    }
    else
    foreach ($adIdsForTheSearch as $key => $value) {
        $result[$i++]=getAdWithAdContentForAdId($value->adID,$value->user_id);
    }
    echo json_encode($result);
    $arr=[];
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
    $arr=[];

}
function insertNewAdTableArray($ad)
{
    //return array with the ad params the ad we got is std class type so the fields storde like ->
    global $db;
    global $arr;
    $arrForAd=[];
    $arrForAd['adID'] = uniqid();
    $arrForAd['user_id'] = $ad->user_id;
    $arrForAd['city'] = $ad->city;
    $arrForAd['street'] = $ad->street;
    $arrForAd['price'] = $ad->price;
    $arrForAd['adType'] = "ad->adType";
    $arrForAd['building_number'] = $ad->building_number;
    $arrForAd['entry'] = $ad->entry;
    $arrForAd['apartment'] = $ad->apartment;
    $arrForAd['rooms'] = $ad->rooms;
    return $arrForAd;
    // $query = "insertAd(:adID,:city,:street,:building_number,:entry,:user_id,:apartment,:rooms)";
    // $result = $db->writeDB($query, $arr);
    // echo json_encode($result);
}
function insertNewAdContentTableArray($adContent){
    //return array with params of ad content
  $arrOfAdContent=[];
    global $DATA_OBJ;
    $count=0;
    if (isset($adContent)) {
        foreach ($adContent as $key => $value) {
             $arrOfAdContent[$count]["element_id"]=uniqid();
            $arrOfAdContent[$count]["name"] = $key;
            $arrOfAdContent[$count]["value"] = $value;
            $arrOfAdContent[$count++]["master"] = 0;
        }
    }
  
    return $arrOfAdContent;

}
function makeInsertAdContentQuery($adContentArr,$adID){
    //make from the array of 2d ad content query for inserting multy rows
$query="INSERT into ad_content (element_id, adID,master,name,value) VALUES ";
for ($i=0; $i < count($adContentArr); $i++) { 
    $query=$query." ('{$adContentArr[$i]['element_id']}','$adID','0','{$adContentArr[$i]['name']}','{$adContentArr[$i]['value']}'),";
}
    $query=substr($query,0,-1);
 return $query;

}
function insertNewAd(){
    //insert new ad with its ad content
    global $db;
    global $DATA_OBJ;
    global $arr;
    $arr=[];
    $arrOfAd=insertNewAdTableArray($DATA_OBJ->params->ad);
    
    $arrOfAdContent=[];
    $arrOfAdContent=insertNewAdContentTableArray($DATA_OBJ->params->adContent);
    
    $queryAdContent=makeInsertAdContentQuery($arrOfAdContent,$arrOfAd['adID']);
    $queryAd="insertAd(:adID,:user_id,:city,:street,:price,:adType,:building_number,:entry,:apartment,:rooms)";
    $result = $db->writeDB($queryAd, $arrOfAd);
    if($result){
        $result = $db->writeDBNotStoredProcedure($queryAdContent);
    }
    echo json_encode($result);
    $arr=[];
}
function uploadFile(){
    global $DATA_OBJ;
        var_dump($DATA_OBJ->params);
        die;
    

}
if(isset($DATA_OBJ->data_type)&&$DATA_OBJ->data_type=='getAdByID'){
    if(isset($DATA_OBJ->params))
    echo json_encode(getAdWithAdContentForAdId($DATA_OBJ->params->adID,$DATA_OBJ->params->user_id));
}
else
if(isset($DATA_OBJ->data_type)&&$DATA_OBJ->data_type=='insertNewAd'){
    insertNewAd();
}
if(isset($DATA_OBJ->data_type)&&$DATA_OBJ->data_type=='uploadFile'){
    var_dump($DATA_OBJ->params);
    die;
    uploadFile();
}
else
if(isset($DATA_OBJ->data_type)&&$DATA_OBJ->data_type=='getAllAdContentAndAdAndUsersForArrOfAds'){
    getAllAdContentAndAdAndUsersForArrOfAds1();
}
else
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
searchAdByParameters();    }
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
    // Proccess get user contacts getChat
    if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "getContacts") {
        include("../api/system/chat/getContacts.php");
    } else
    // Proccess get user Chat
    if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "getChat") {
        include("../api/system/chat/getChatWith.php");
    } else
// Proccess submit Message 
    if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "submitMessage") {
        include("../api/system/chat/submitMessage.php");
    } else
// Proccess refreshData Message 
    if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "refreshData") {
        include("../api/system/chat/refreshData.php");
    } else
    // Proccess getAnalysticAdsHomePage 
    if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "getSomeAds") {
        include("../api/system/Ads/getAnalysticAdsHomePage.php");
    } else
    // Proccess get seclect data for ads form
    if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "getSelectData") {
        include("../api/system/Ads/Search/dataSearch.php");
    } else
    // Proccess get Additional Ad Contact Data
    if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "getAdditionalAdContactData") {
        include("../api/system/Ads/CreateNewAd/getAdContent.php");
    }
     else
    // Proccess testAuth 
    if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "testAuth") {
        include("../api/Authentication/authTest.php");
    }
     else
if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "Logout") {
        include("../api/Authentication/logout.php");
    } else
if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "Refresh") {
   // echo "refreshCall";
        include("../api/Authentication/refreshTokenController.php");
    } else
if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "Regist") {
    include("../api/Authentication/regist.php");
    } else // proccess the data - Contact

        if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "contacts") {
            include("contact.php");
        }
        else
        if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "getAllAds") {
            getAllAds();

        }
         else // proccess the data - Contact
            if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "TEST2") {
                getAllAds();
            } else // proccess the data - Contact
                if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "SetNewParams") {

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