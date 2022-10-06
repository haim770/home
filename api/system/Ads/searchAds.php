<?php
// require_once('../../home-app/api.php');
// require_once('../classes.useDBs.php');
 require_once(__DIR__.'/../queries.php');
$userType="";//guest or registered
if($DATA_OBJ->guest=="guest"){
    $userType="guest";
    }
else{
        //now we will populate the user object with the user that signed in
     $authPath = "../../Authentication/authTest.php";
     include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);
    $userType= "registered";
}
global $user;
function getAllAdContentAndAdAndUsersForArrOfAds(){
    //get all ditails for the ads we want it prints to the frontend
    global $userType;
    global $user;
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
function checkIfAdIsFavoriteForUser($adId){
    //check if ad is favorite for the user
    global $userType;
    global $user;
    global $db;
    global $DATA_OBJ;
    if($userType=="guest")
        return false;
    else{
    $userId=$user->getUUID(); 
    $query=makeQueryForCheckIfAdIsFavorite($adId,$userId);
    $result = $db->readDBNoStoredProcedure($query,[]);
    return $result;
    }
}
function getAdsForMain(){
    //get adIds for the main top 3 each time
    global $DATA_OBJ;
    global $db;
    $date=time();
    $query="select adID from ads where active=1 and expire_date > '$date' order by create_time DESC limit ".$DATA_OBJ->params->end." OFFSET ".$DATA_OBJ->params->start;
    $result=$db->readDBNoStoredProcedure($query,[]);
    echo json_encode($result);
}
function getAdsIdAndUserIdThatFeetSearch1(){
    //we search in ads and in adcontent and get adid and user id desired ad return them
    global $db;
    global $DATA_OBJ;
    global $arr;
     $query = generateSearchFromBothAdContentAndAds1();
    $result = $db->readDBNoStoredProcedure($query,[]);
    // echo json_encode($result);
    // die;
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
    //generate the ad record from the queries
    $result["ad"] = $resultAdTable;
    $result["adContent"] = $resultAdContentTable;
    $result["user"]=$resultUserForTheAd;
    $result["adImages"]=$resultImagesForAdId;
    $result["favorite"]=checkIfAdIsFavoriteForUser($adId);
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
    $hasAdContentAtSearch=false;
    $time= $time=date('y-m-d',time());
    if(!isset($DATA_OBJ->params)||$DATA_OBJ->params==[]){
        //if there is no params
        return makeQueryFromDataObjToGetAdsOnlyByLimitAndNoParams($DATA_OBJ,$time);
    }
    //if there is parameters to search by
    return makeQueryFromDataObjToGetAdsByParamsFromUser($DATA_OBJ,$time);
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
function getAdsCloseToday(){
    //get all ads close today
    global $userType;
    if($userType=="guest"){
        echo json_encode("not authorized");
        die;
    }
    global $db;
    global $DATA_OBJ;
    $date=date('Y/m/d', time());
    $query = "select adID,user_id from ads where date(expire_date)='$date' order by create_time DESC limit ".$DATA_OBJ->params->end." OFFSET ".$DATA_OBJ->params->start;
    $adIdsForTheSearch = $db->readDBNoStoredProcedure($query);
    $i=0;
    if(gettype($adIdsForTheSearch)!="array"&&gettype($adIdsForTheSearch)!="Array"&&gettype($adIdsForTheSearch)!="Object"){
        $arr=[];
        echo json_encode($arr);
        return;
    }
    else
    foreach ($adIdsForTheSearch as $key => $value) {
        $result[$i++]=getAdWithAdContentForAdId1($value->adID,$value->user_id);
    }
    echo json_encode($result);
}
function getAdsFromToday(){
//get all ads created today
    global $userType;
    if($userType=="guest"){
        echo json_encode("not authorized");
        die;
    }
    global $db;
    global $DATA_OBJ;
    $date=date('Y/m/d', time());
    $query = "select adID,user_id from ads where date(create_time)='$date' order by create_time DESC limit ".$DATA_OBJ->params->end." OFFSET ".$DATA_OBJ->params->start;
    $adIdsForTheSearch = $db->readDBNoStoredProcedure($query);
    $i=0;
    if(gettype($adIdsForTheSearch)!="array"&&gettype($adIdsForTheSearch)!="Array"&&gettype($adIdsForTheSearch)!="Object"){
        $arr=[];
        echo json_encode($arr);
        return;
    }
    else
    foreach ($adIdsForTheSearch as $key => $value) {
        $result[$i++]=getAdWithAdContentForAdId1($value->adID,$value->user_id);
    }
    echo json_encode($result);
}

function getOpenAds(){
    //get all open ads
    global $userType;
    if($userType=="guest"){
        echo json_encode("not authorized");
        die;
    }
    global $db;
    global $DATA_OBJ;
    $time=time();
    $query = "select adID,user_id from ads where active='1' and expire_date
    >='$time' order by create_time DESC limit ".$DATA_OBJ->params->end." OFFSET ".$DATA_OBJ->params->start;
    $adIdsForTheSearch = $db->readDBNoStoredProcedure($query);
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
}
function getClosedAds(){
    //get all closed ads
    global $userType;
    if($userType=="guest"){
        echo json_encode("not authorized");
        die;
    }
    global $db;
    global $DATA_OBJ;
    $time=time();
    $query = "select adID,user_id from ads where active='0' or expire_date<'$time' order by create_time DESC limit ".$DATA_OBJ->params->end." OFFSET ".$DATA_OBJ->params->start;
    $adIdsForTheSearch = $db->readDBNoStoredProcedure($query);
    $i=0;
    if(gettype($adIdsForTheSearch)!="array"&&gettype($adIdsForTheSearch)!="Array"&&gettype($adIdsForTheSearch)!="Object"){
        $result=[];
        return;
    }
    else
    foreach ($adIdsForTheSearch as $key => $value) {
        $result[$i++]=getAdWithAdContentForAdId1($value->adID,$value->user_id);
    }
    echo json_encode($result);
}
function getAdByAdId($adId){
    //echo the ad for the id we got in dataObj
    global $db;
    global $DATA_OBJ;
    global $arr;
    $query = "select * from ads where adID= '$adId'";
    $result = $db->readDBNoStoredProcedure($query,[]);
    $result=getAdWithAdContentForAdId1($result[0]->adID,$result[0]->user_id);
    echo json_encode($result);
    $arr=[];
    die;
}
function getAdByAdIdWithReturn($adId){
    //returns the ad for the id we got in dataObj
    global $db;
    global $DATA_OBJ;
    global $arr;
    $query = "select * from ads where adID= '$adId'";
    $result = $db->readDBNoStoredProcedure($query,[]);
    $result=getAdWithAdContentForAdId1($result[0]->adID,$result[0]->user_id);
    return $result;
    $arr=[];
    die;
}
function getAdByAdIdForParams($adId){
    //returns the ad for the id we got in dataObj for params func
    global $db;
    global $DATA_OBJ;
    global $arr;
    $query = "select * from ads where adID= '$adId'";
    $result = $db->readDBNoStoredProcedure($query,[]);
    $result=getAdWithAdContentForAdId1($result[0]->adID,$result[0]->user_id);
    $arr=[];
    return $result;
}
function getAllOfMyAds(){
    //get all of my ads by id of user
    global $userType;
    global $user;
    global $db;
    global $DATA_OBJ;
    global $arr;
    if($userType!="registered"||($user->getRule()!="5150"&&$user->getRule()!="2001")){
    echo "not authorized";
    die;
    }
    $userId=$user->getUuid();
    $query="select adID from ads where user_id ='$userId'";
    $adIdForTheSearch = $db->readDBNoStoredProcedure($query,[]);
    $i=0;
    if(gettype($adIdForTheSearch)!="array"&&gettype($adIdForTheSearch)!="Array"&&gettype($adIdForTheSearch)!="Object"){
        $arr=[];
        return;
    }
    else
    foreach ($adIdForTheSearch as $key => $value) {
        $result[$i++]=getAdWithAdContentForAdId1($value->adID,$userId);
    }
    echo json_encode($result);
    $arr=[];
    die;
}
function getAllOfMyActiveAds(){
    //get all active ads of userid
    global $userType;
    global $user;
    global $db;
    global $DATA_OBJ;
    $time=time();
    global $arr;
    if($userType!="registered"||($user->getRule()!="5150"&&$user->getRule()!="2001")){
    echo "not authorized";
    die;
    }
    $userId=$user->getUuid();
    $query="select adID from ads where user_id ='$userId' and active ='1' and expire_date>='$time'";
    $adIdForTheSearch = $db->readDBNoStoredProcedure($query,[]);
    $i=0;
    if(gettype($adIdForTheSearch)!="array"&&gettype($adIdForTheSearch)!="Array"&&gettype($adIdForTheSearch)!="Object"){
        $arr=[];
        return;
    }
    else
    foreach ($adIdForTheSearch as $key => $value) {
        $result[$i++]=getAdWithAdContentForAdId1($value->adID,$userId);
    }
    echo json_encode($result);
    $arr=[];
    die;
}
function getAllOfMyNotActiveAds(){
    //get all active ads of userid
    global $userType;
    global $user;
    global $db;
    global $DATA_OBJ;
    global $arr;
    if($userType!="registered"||($user->getRule()!="5150"&&$user->getRule()!="2001")){
    echo "not authorized";
    die;
    }
    $time=time();
    $userId=$user->getUuid();
    $query="select adID from ads where user_id ='$userId' and active ='0' or expire_date<'$time'";
    $adIdForTheSearch = $db->readDBNoStoredProcedure($query,[]);
    $i=0;
    if(gettype($adIdForTheSearch)!="array"&&gettype($adIdForTheSearch)!="Array"&&gettype($adIdForTheSearch)!="Object"){
        $arr=[];
        return;
    }
    else
    foreach ($adIdForTheSearch as $key => $value) {
        $result[$i++]=getAdWithAdContentForAdId1($value->adID,$userId);
    }
    echo json_encode($result);
    $arr=[];
    die;
}
function showHistory(){
    //get history from the db
  global $userType;
    global $user;
    global $db;
    global $DATA_OBJ;
if($userType!="registered"||($user->getRule()!="5150"&&$user->getRule()!="2001")){
    echo "not authorized";
    die;
}
$time=time();
    $userId=$user->getUuid();
    $query="select adId from history where userId='$userId' and history.adId in (select adID from ads where  active='1' and expire_date>='$time')  order by history.create_time limit 20";
    $adIdForTheSearch=$db->readDBNoStoredProcedure($query);
    $i=0;
    if($adIdForTheSearch==[]||$adIdForTheSearch==""||$adIdForTheSearch==false){
        echo json_encode([]);
        die;
    }
    foreach ($adIdForTheSearch as $key => $value) {
        $result[$i++]=getAdByAdIdWithReturn($value->adId);
    }
    echo json_encode($result);
}
function checkIfHistoryItemExist($adId,$userId){
    //check if history item exist
    global $db;
    $query="select * from history where userId='$userId' and adId='$adId'";
    $result=$db->readDBNoStoredProcedure($query);
    if($result==[]||$result==""||$result==false){
        return false;
    }
    return true;

}
function addMoreTimeToAd(){
    //add more time to ad
    global $userType;
    global $user;
    if($userType!="registered"||($user->getRule()!="5150"&&$user->getRule()!="2001"&&$user->getUuid()==$DATA_OBJ->params->userId)){
    echo "not authorized";
    die;
}
    global $db;
    global $DATA_OBJ;
    $userId=$user->getUuid();
    $query="select expireDateAds from settings";
    $result=$db->readDBNoStoredProcedure($query);
    if($user->getRule()!="5150"&&checkRemainingAds($userId)==0){
        echo json_encode("need remaining ads");
        die;
}
    $timeToAddInDays=$result[0]->expireDateAds;
    $newTime= date('Y-m-d', strtotime($DATA_OBJ->params->expireDate. ' +'.(int)$timeToAddInDays.' days'));
    $query="update ads set expire_date='$newTime' where adID='{$DATA_OBJ->params->adID}'";
    $result=$db->readDBNoStoredProcedure($query);
    if($user->getRule()=="5150"){
        echo json_encode("expire changed");
        die;
    }
    //update the remaining ads for the user
    $query="update users set remaining_ads='remaining_ads-1' where uuid='{$userId}'";
    $result=$db->readDBNoStoredProcedure($query);
    echo json_encode("expire changed");
}
function updateRemainingAds($userId){
    //update remaining ads for user id
    global $db;
    $query="update users set remaining_ads='remaining_ads-1' where uuid='{$userId}'";
    $result=$db->readDBNoStoredProcedure($query);
 }
function checkRemainingAds($userId){
    //return remaining ads
    global $db;
    global $DATA_OBJ;
    $query="select remaining_ads from users where uuid='$userId'";
    $result=$db->readDBNoStoredProcedure($query);
    if($result==""||$result==[]||$result==false){
        return 0;
    }
    return $result[0]->remaining_ads;
}
function addItmeToHistory($adId){
    //add item to history on deep watch
     global $userType;
    global $user;
    global $db;
    global $DATA_OBJ;
if($userType!="registered"||($user->getRule()!="5150"&&$user->getRule()!="2001")){
    echo "not authorized";
    die;
}
    $userId=$user->getUuid();
    $historyId=uniqid();
    $time=time();
    $typeOfQuery=checkIfHistoryItemExist($adId,$userId);//false for insert
    if($typeOfQuery==false)
    $query="INSERT INTO history (history_id, userId, adId) VALUES ('$historyId','$userId','$adId')";
    else
    $query="UPDATE history SET create_time = '$time' WHERE adId = '{$adId}' and userId='$userId'";
    $result=$db->readDBNoStoredProcedure($query);
}
function deleteAdById(){
    //delete ad by adId we got at dataObj
    global $userType;
    global $user;
    global $db;
    global $DATA_OBJ;
if($userType!="registered"){
    echo "not authorized";
    die;
}
if(!($user->getRule()=="5150"||(isset($DATA_OBJ->params->deleteByUser)&&$DATA_OBJ->params->deleteByUser&&$user->getRule()!="2001"))){
echo "not authorized";
    die;
}
else{
    $query="UPDATE ads SET active = '0', approval_status = 'reject' WHERE adID = '{$DATA_OBJ->params->adID}'";
    $result=$db->readDBNoStoredProcedure($query);
    $ad=getAdByAdIdWithReturn($DATA_OBJ->params->adID);
    if($ad["ad"]["0"]->active==0){
     $db->createSystemMessage(" מודעה מספר" ."{$DATA_OBJ->params->adID}"." נמחקה ",$ad["ad"]["0"]->user_id,"adClosed","Notice");
     echo "deleted";
     die;
    }
}
}
if($DATA_OBJ->data_type=="getAdsCloseToday"){
    getAdsCloseToday();
}
else{
if($DATA_OBJ->data_type=="addMoreTimeToAd"){
    addMoreTimeToAd();
}
else{
if($DATA_OBJ->data_type=="getOpenAds"){
    getOpenAds();
}
else{
if($DATA_OBJ->data_type=="getAdsFromToday"){
    getAdsFromToday();
}
else{
if($DATA_OBJ->data_type=="getClosedAds"){
    getClosedAds();                     
}
else{
if($DATA_OBJ->data_type=="getAdByAdId"){
    getAdByAdId($DATA_OBJ->params->adId);
}
else{
    if($DATA_OBJ->data_type=="deleteAdById"){
        deleteAdById();
    }
    else{
        if($DATA_OBJ->data_type=="getAllOfMyAds"){
            getAllOfMyAds();
        }
        else{
            if($DATA_OBJ->data_type=="getAllOfMyActiveAds"){
                getAllOfMyActiveAds();
            }
            else{
                if($DATA_OBJ->data_type=="getAllOfMyNotActiveAds"){
                    getAllOfMyNotActiveAds();
                }
                else{
                    if($DATA_OBJ->data_type=="getAdsForMain"){
                        getAdsForMain();
                    }
                    else{
                        if($DATA_OBJ->data_type=="addItmeToHistory"){
                            addItmeToHistory($DATA_OBJ->params->adID);
                        }
                        else
                        {
                            if($DATA_OBJ->data_type=="showHistory"){
                            showHistory();
                        }
                        
                        else
                            getAllAdContentAndAdAndUsersForArrOfAds();
                        }
                    }
                }
            }
        }
    }
}
}
}
}}}
?>