<?php
// $authPath = "../../Authentication/authTest.php";
// include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);
require_once("searchAds.php");
function addToFavorites(){
  global $db;
  global $DATA_OBJ;
  global $arr;
  $arr=[];
  $favorite_id=uniqid();
  $userId=1;
  $adID=$DATA_OBJ->params->adID;
  $query="INSERT INTO favorites (favorite_id,userId,AdId) VALUES ('$favorite_id', '$userId', '$adID') ";
  $result=$db->readDBNoStoredProcedure($query);
  echo json_encode($result);
  die;
}
function getAllFavorites($userId){
  //get all favorites for user
  global $db;
  $query="select * from favorites where userId = '$userId'";
  $result=$db->readDBNoStoredProcedure($query);
  return $result;

}
function getImagesForAdIdFav($adID){
global $db;
    global $DATA_OBJ;
    global $arr;
    $arr=[];
    $arr['element_id'] = $adID; //the adid
    $query = "select * from pictures where element_id =:element_id order by serial_number";
    $result = $db->readDBNoStoredProcedure($query, $arr);
    $arr=[];
    // print_r($result);
    return $result;
}
function getAdForAdIdFav($adId){
    global $db;
    global $DATA_OBJ;
    global $arr;
    $arr=[];
    $arr['adID'] = $adId; //the adid
    $query = "getAdById(:adID)";
    $resultAdTable = $db->readDb($query, $arr);
    $arr=[];
    return $resultAdTable;
    
}
function getAdContentForAdIdFav($adID){
 global $db;
    global $DATA_OBJ;
    global $arr;
    $arr=[];
    $arr['adID'] = $adID; //the adid
    $query = "getAdContentForAdId(:adID)";
    $resultAdContentTable = $db->readDb($query, $arr);
    return $resultAdContentTable;
}
function getUserForAdIdFav($userID){
global $db;
    global $DATA_OBJ;
    global $arr;
    $arr=[];
    $arr['uuid'] = $userID; //the userId
    $query = "select * from users where uuid =:uuid";
    $result = $db->readDBNoStoredProcedure($query, $arr);
    $arr=[];
    return $result;
}
function getFullAdDetails($adID,$user_id){
//get all ad to the user make obj of array with jey value
    $result["ad"] = getAdForAdIdFav($adID);
    $result["adContent"] = getAdContentForAdIdFav($adID);
    $result["user"]=getUserForAdIdFav($user_id);
    $result["adImages"]=getImagesForAdIdFav($adID);
    return $result;
}
function getFavoritesForUserId(){
  //get all favorites ads for user id
global $db;
global $DATA_OBJ;
global $arr;
$arr=[];
$user_id=1;
$arrOfAds=getAllFavorites($user_id);
if(gettype($arrOfAds)!="array"&&gettype($arrOfAds)!="Array"&&gettype($arrOfAds)!="Object"){
        $arr=[];
        return;
    }
    $i=0;
  
foreach ($arrOfAds as $key => $value) {
        $result[$i++]=getFullAdDetails($value->AdId,$value->userId);
    }
   
    echo json_encode($result);
}
?>