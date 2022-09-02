<?php
 $authPath = "../../Authentication/authTest.php";
 require_once(__DIR__.'/../queries.php');
 include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);
function addToFavorites(){
  //add ad to the user favorites
  global $user;
  global $db;
  global $DATA_OBJ;
  global $arr;
  global $queryArr;
  $arr=[];
  $arr["favorite_id"]=uniqid();
  $favorite_id=uniqid();
  $arr["userId"]= $user->getUuid();
  $arr["adID"]=$DATA_OBJ->params->adID;
  $query=$queryArr["insertFavoriteAd"];
  $result=$db->readDBNoStoredProcedure($query,$arr);
  $arr=[];
  echo json_encode($result);
  die;
}
function removeFromFavorites(){
  //remove ad from user favorites
  global $user;
   global $db;
  global $DATA_OBJ;
  global $arr;
  $arr=[];
  $arr["userId"] = $user->getUuid();
  $arr["adID"]=$DATA_OBJ->params->adID;
  $query="DELETE from favorites where userId=:userId and AdId=:adID";
  $result=$db->readDBNoStoredProcedure($query,$arr);
  echo json_encode($result);
  $arr=[];
  die;
}
function getAllFavorites($userId){
  //get all favorite ads for user
  global $db;
  global $queryArr;
  global $arr;
  $arr=[];
  $arr["userId"]=$userId;
  $query=$queryArr["getFavoritesTouserId"];
  $result=$db->readDBNoStoredProcedure($query,$arr);
  $arr=[];
  return $result;

}
function getImagesForAdIdFav($adID){
  //get images for favorite ad
global $db;
    global $DATA_OBJ;
    global $queryArr;
    global $arr;
  global $user;
    $arr=[];
    $arr['element_id'] = $adID; //the adid
    $query = $queryArr["getPicsForElementId"];
    $result = $db->readDBNoStoredProcedure($query, $arr);
    $arr=[];
    // print_r($result);
    return $result;
}
function getAdForAdIdFav($adId){
  //get the ad for the adID for favorite ad
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
  //get ad content for the ad id favorite
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
  //get the user record associated with the user id
global $db;
    global $DATA_OBJ;
    global $arr;
    global $queryArr;
    $arr=[];
    $arr['uuid'] = $userID; //the userId
    $query = $queryArr["getUserByID"];
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
global $user;
$arr=[];
$user_id = $user->getUuid();
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