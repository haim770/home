<?php
$userType="";//guest or registered
require_once(__DIR__.'/../queries.php');
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
  //get all ads that wait for approval
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
  //get all adiD THAT ARE WAIT TO BE APPROVED BY MANAGER RETURNS all relevant id's a array
  global $userType;
  global $user;
  if($userType!="registered"||$user->getRule()!="5150"){
     header('HTTP/1.1 401 Unauthorized');
    exit;
  }
  global $db;
  global $DATA_OBJ;
  if(isset($DATA_OBJ->limitBy->start)&&isset($DATA_OBJ->limitBy->end)){
  $query=queryForGetAdsWaitForApprovalByParams($DATA_OBJ->limitBy->end,$DATA_OBJ->limitBy->start);
  }
    else{

  $query=$queryArr["getAllAdsWaitForApproval"];
}
$result=$db->readDBNoStoredProcedure($query);
return $result;
}

function getUserForUserIdAproval($user_id){
    //return user record for param user_id for the ad that waits for approval
    global $userType;
    global $queryArr;
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
    $query = $queryArr["getUserById"];
    $result = $db->readDBNoStoredProcedure($query, $arr);
    $arr=[];
    return $result;
}
function getImagesForAdIdAproval($adId){
    //return the images for the adId that waits for approval
    global $userType;
    global $queryArr;
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
    $query = $queryArr["getPicsForElementId"];
    $result = $db->readDBNoStoredProcedure($query, $arr);
    $arr=[];
    return $result;
}
function getAdWithAdContentForAdIdAproval($adId,$user_id){
    //get adcontent+ad for adid and userId that are waiting for approval by manager
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
  //decline ad by manager
  global $userType;
  global $user;
  if($userType!="registered"||$user->getRule()!="5150"){
     header('HTTP/1.1 401 Unauthorized');
    exit;
  }
  global $db;
  global $DATA_OBJ;
   global $queryArr;
  global $arr;
  $arr=[];
  $arr["adID"]=$DATA_OBJ->params->adID;
  if(isset($DATA_OBJ->params->adID)){
    $query=$queryArr["declineAd"];
  $result=$db->readDBNoStoredProcedure($query,$arr);
  $db->createSystemMessage(" מודעה מספר "."{$DATA_OBJ->params->adID}"." לא אושרה ",$DATA_OBJ->params->userId,"declineAd", "Error");
  echo json_encode($result);}
  $arr=[];
  die;
}
function aproveAd(){
  //aprove ad by update ad to change approval status to aproved and active to true
  global $userType;
  global $user;
  global $queryArr;
  if($userType!="registered"||$user->getRule()!="5150"){
     header('HTTP/1.1 401 Unauthorized');
    exit;
  }
 global $db;
  global $DATA_OBJ;
  if(isset($DATA_OBJ->params->adID)){
    global $arr;
  $arr=[];
  $arr["adID"]=$DATA_OBJ->params->adID;
    $query=$queryArr["aproveAd"];
  $result=$db->readDBNoStoredProcedure($query,$arr);
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