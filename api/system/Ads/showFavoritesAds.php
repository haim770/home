<?php
$authPath = "../../Authentication/authTest.php";
include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);
$arr = array();
// test if user is admin
if($user->getRule() == "5150"||$user->getRule() == "2001"){
  
function getAllAdContentAndAdAndUsersForArrOfAdsFavorites(){
    //returns the wanted ads with all their data and user created the ad
    $arr=[];
    $adIdsForTheSearch=getAdsIdAndUserIdThatFeetSearchFavorites();
    
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
        $result[$i++]=getAdWithAdContentForAdIdFavorites($value->adID,$value->user_id);
    }
   
    echo json_encode($result);
    $arr=[];
}
function getAdsIdAndUserIdThatFeetSearchFavorites(){
    //we search in ads and in adcontent and get adid and user id desired ad return them
    global $db;
    global $DATA_OBJ;
    global $arr;
    global $user;
    $userId=$user->getUuid();
    $query = "select  DISTINCT ads.adID,ads.user_id from ads,favorites where  ads.adID = favorites.adId and ads.active =1 and favorites.userId ='$userId' limit ".$DATA_OBJ->limitBy->end." OFFSET ".$DATA_OBJ->limitBy->start.";";
    $result = $db->readDBNoStoredProcedure($query,[]);
    $arr=[];
    return $result;
}
function getAdWithAdContentForAdIdFavorites($adId,$user_id){
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
    $resultUserForTheAd=getUserForUserIdFavorites($user_id);
    $resultImagesForAdId=getImagesForAdIdFavorites($adId);
    $result = [];
    $result["ad"] = $resultAdTable;
    $result["adContent"] = $resultAdContentTable;
    $result["user"]=$resultUserForTheAd;
    $result["adImages"]=$resultImagesForAdId;
    $result["favorite"]=true;
    $arr = [];
    return $result;
}
function getImagesForAdIdFavorites($adId){
    //return the images for the adId
    global $db;
    global $DATA_OBJ;
    global $arr;
    $arr=[];
    $arr['element_id'] = $adId; //the adid
    $query = "select * from pictures where element_id =:element_id order by serial_number";
    $result = $db->readDBNoStoredProcedure($query, $arr);
    $arr=[];
    // print_r($result);
    return $result;
}
function getUserForUserIdFavorites($user_id){
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
getAllAdContentAndAdAndUsersForArrOfAdsFavorites();
}
else {
  echo "kkdkd";
    die;
    echo json_encode(
        array(
            "message" => "Error",
            "result" => "You got no permission to get this data",
        )
    );
    die;
}
?>