<?php
global $DATA_OBJ;
$userType="";//guest or registered
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
function changeMessageToSeen($msgId,$seen){
  //change seen status for msgId
  global $user;
  global $userType;
  if($userType=="guest"){
    echo "not authorized";
    die;
  }
  if($user->getRule()!="5150"&&$user->getRule()!="2001"){
    //not registered
    echo "not authorized";
    die;
  }
    global $db;
    global $DATA_OBJ;
    $query="UPDATE system_messages SET seen = '$seen' WHERE msgId = '{$msgId}'";
    $result=$db->readDBNoStoredProcedure($query);
    echo json_encode($result);
}
function sendMsgReportToUser(){
    //send msg to user about a report
  global $userType;
  global $user;
  global $db;
  global $DATA_OBJ;
  if($userType!="registered"){
    die;
  }
  $msgId=uniqid();
  $elementId=$DATA_OBJ->params->elementId;
  $userId=$DATA_OBJ->params->userId;
  $reportId=$DATA_OBJ->params->reportId;
  $content=$reportId." ".$elementId;//we will contain the element id and the report id at the content
  $query="INSERT INTO system_messages (msgId,userId,message_content,msgType) VALUES ('$msgId','$userId','$content','report')";
  $result=$db->readDBNoStoredProcedure($query);
  echo json_encode($result);
  die;
}
function getAllReportsOnAdsForUserIdFromMassages(){
    //send msg to user about a report
  global $userType;
  global $user;
  global $db;
  global $DATA_OBJ;
  if($userType!="registered"){
    echo "not authorized";
    die;
  }
  else{
    $userId= $user->getUuid();
    $msgId=uniqid();
    //we will contain the element id and the report id at the content
    $query="select * from system_messages where userId = '$userId' and msgType= 'report'";
    $result=$db->readDBNoStoredProcedure($query);
    $resultForTheTable=[];
    $objForRow=[];
    for ($i=0; $i <count($result) ; $i++) {
      //we split the msg content to report id and adId
      $objForRow=array("id"=>$result[$i]->msgId,"reportId"=>explode(" ", $result[$i]->message_content)[0],"adId"=>explode(" ", $result[$i]->message_content)[1],"createTime"=>$result[$i]->create_time,"seen"=>$result[$i]->seen=="1"?"כן":"לא");
      // $objForRow=json_encode($objForRow);
      $resultForTheTable[$i]=$objForRow;
    }
    echo json_encode($resultForTheTable);
    die;
  }
}
 if($DATA_OBJ->data_type=="changeMessageToSeen"){
    changeMessageToSeen($DATA_OBJ->params->msgId,$DATA_OBJ->params->seen);
  }
?>