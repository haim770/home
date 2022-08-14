<?php
$userType="";//guest or registered
global $DATA_OBJ;
global $db;
if($DATA_OBJ->params->guest=="guest"){
    $userType="guest";
    }
else{
        //now we will populate the user object with the user that signed in
     $authPath = "../../Authentication/authTest.php";
     include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);
    $userType= "registered";
}
global $user;
function getAllWaitingAdsForAproval(){
  global $userType;
  global $user;
  if($userType!="registered"||$user->getRule()!="5150"){
     header('HTTP/1.1 401 Unauthorized');
    exit;
  }
  global $db;
  global $DATA_OBJ;
  $adsIdForAproval=getAllAdIdWaitForAproval();
   $result=[];
    // echo count($adIdsForTheSearch);
    $i=0;
    if(gettype($adsIdForAproval)!="array"&&gettype($adsIdForAproval)!="Array"&&gettype($adsIdForAproval)!="Object"){
        $arr=[];
        return;
    }
    else
    foreach ($adsIdForAproval as $key => $value) {
        $result[$i++]=getAdWithAdContentForAdIdAproval($value->adID,$value->user_id);
    }
   
    echo json_encode($result);
    $arr=[];
}
function getAllAdIdWaitForAproval(){
  global $userType;
  global $user;
  if($userType!="registered"||$user->getRule()!="5150"){
     header('HTTP/1.1 401 Unauthorized');
    exit;
  }
  global $db;
  global $DATA_OBJ;
  if(isset($DATA_OBJ->limitBy->start)&&isset($DATA_OBJ->limitBy->end)){
  $query="select  DISTINCT ads.adID,ads.user_id from ads where approval_status= 'pending' limit ".$DATA_OBJ->limitBy->end." OFFSET ".$DATA_OBJ->limitBy->start;
}
    else{
$query="select adID,user_id from ads where approval_status= 'pending'";
}
$result=$db->readDBNoStoredProcedure($query);
return $result;
}

function getUserForUserIdAproval($user_id){
    //return user record for param user_id
    global $userType;
  global $user;
  if($userType!="registered"||$user->getRule()!="5150"){
     header('HTTP/1.1 401 Unauthorized');
    exit;
  }
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
function getImagesForAdIdAproval($adId){
    //return the images for the adId
    global $userType;
  global $user;
  if($userType!="registered"||$user->getRule()!="5150"){
     header('HTTP/1.1 401 Unauthorized');
    exit;
  }
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
function getAdWithAdContentForAdIdAproval($adId,$user_id){
    //get adcontent+ad for adid
    global $userType;
  global $user;
  if($userType!="registered"||$user->getRule()!="5150"){
     header('HTTP/1.1 401 Unauthorized');
    exit;
  }
    global $db;
    global $DATA_OBJ;
    global $arr;
    $arr=[];
    $arr['adID'] = $adId; //the adid
    $query = "getAdById(:adID)";
    $resultAdTable = $db->readDb($query, $arr);
    $query = "getAdContentForAdId(:adID)";
    $resultAdContentTable = $db->readDb($query, $arr);
    $resultUserForTheAd=getUserForUserIdAproval($user_id);
    $resultImagesForAdId=getImagesForAdIdAproval($adId);
    $result = [];
    $result["ad"] = $resultAdTable;
    $result["adContent"] = $resultAdContentTable;
    $result["user"]=$resultUserForTheAd;
    $result["adImages"]=$resultImagesForAdId;
    $arr = [];
    return $result;
}
function declineAd(){
  global $userType;
  global $user;
  if($userType!="registered"||$user->getRule()!="5150"){
     header('HTTP/1.1 401 Unauthorized');
    exit;
  }
  global $db;
  global $DATA_OBJ;
  if(isset($DATA_OBJ->params->adID)){
    $query="UPDATE ads SET approval_status = 'declined', active= false WHERE adID = '{$DATA_OBJ->params->adID}'";
  $result=$db->readDBNoStoredProcedure($query);
  $db->createSystemMessage(" מודעה מספר "."{$DATA_OBJ->params->adID}"." לא אושרה ",$DATA_OBJ->params->userId,"declineAd", "Error");
  echo json_encode($result);}
  die;
}
function aproveAd(){
  //aprove ad by update ad to change approval status to aproved and active to true
  global $userType;
  global $user;
  if($userType!="registered"||$user->getRule()!="5150"){
     header('HTTP/1.1 401 Unauthorized');
    exit;
  }
 global $db;
  global $DATA_OBJ;
  if(isset($DATA_OBJ->params->adID)){
    $query="UPDATE ads SET approval_status = 'aproved', active= true WHERE adID = '{$DATA_OBJ->params->adID}'";
  $result=$db->readDBNoStoredProcedure($query);
   $db->createSystemMessage(" מודעה מספר "."{$DATA_OBJ->params->adID}"." אושרה ",$DATA_OBJ->params->userId,"aproveAd", "Success");
  echo json_encode($result);}
  die;
}
if($DATA_OBJ->data_type=="getAllWaitingAdsForAproval"){
  getAllWaitingAdsForAproval();
}
else{
  if($DATA_OBJ->data_type=="aproveAd"){
    aproveAd();
  }
  else{
  if($DATA_OBJ->data_type=="declineAd"){
    declineAd();
  }
}
}
?>