<?php
// require_once('../../home-app/api.php');
// require_once('../classes.useDBs.php');
function getAllAdContentAndAdAndUsersForArrOfAds1(){
   
    //returns the wanted ads with all their data and user created the ad
    $arr=[];
    $adIdsForTheSearch=getAdsIdAndUserIdThatFeetSearch1();
    
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
        $result[$i++]=getAdWithAdContentForAdId1($value->adID,$value->user_id);
    }
   
    echo json_encode($result);
    $arr=[];
}
function getAdsIdAndUserIdThatFeetSearch1(){
    //we search in ads and in adcontent and get adid and user id desired ad return them
    global $db;
    global $DATA_OBJ;
    global $arr;
     $query = generateSearchFromBothAdContentAndAds1();
    $result = $db->readDBNoStoredProcedure($query,[]);
    
    $arr=[];
    return $result;
}
function getAdWithAdContentForAdId1($adId,$user_id){
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
    $resultUserForTheAd=getUserForUserId1($user_id);
    $resultImagesForAdId=getImagesForAdId1($adId);
    $result = [];
    $result["ad"] = $resultAdTable;
    $result["adContent"] = $resultAdContentTable;
    $result["user"]=$resultUserForTheAd;
    $result["adImages"]=$resultImagesForAdId;
    $arr = [];
    return $result;
}
function getImagesForAdId1($adId){
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
function generateSearchFromBothAdContentAndAds1(){
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
            if ($value=="") {
                continue;
            }
            if($key=="maxPrice"){
              $queryAdTableParams.=" and price <= '$value' ";
              continue;
            }
            if($key=="minPrice"){
              $queryAdTableParams.=" and price >= '$value' ";
              continue;
            }
            if($key=="minRooms"){
                $queryAdTableParams.=" and rooms>= '$value' ";
                continue;
            }
            if($key=="maxRooms"){
                $queryAdTableParams.=" and rooms<= '$value' ";
                continue;
            }
            if($key=="create_time"||$key=="user_id"||$key=="active"||$key=="contact_counter"||$key=="watch"||$key=="close_reason"||$key=="expire_date"||$key=="approval_status"||$key=="ad_link"||$key=="city"||$key=="street"||$key=="building_number"||$key=="entry"||$key=="apartment"||$key=="zip_code"||$key=="map_X"||$key=="map_Y"||$key=="price"||$key=="rooms"||$key=="adType"||$key=="floor"||$key=="maxFloor"||$key=="houseCommittee"||$key=="propertyTaxes"||$key=="enteringDate"){
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
function getUserForUserId1($user_id){
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
?>