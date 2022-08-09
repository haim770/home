<?php
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
function getAllReportReasons(){
    //get all reasons for report on element from a kind blog/ad
  global $DATA_OBJ;
  global $db;
  $elementType=$DATA_OBJ->params->elementType;
  $query="select * from report_reason where element_type = '$elementType'";
  $result=$db->readDBNoStoredProcedure($query);
  echo json_encode($result);
}
function createReportOnAd(){
  //open report on ad (complain)
  global $userType;
  global $user;
  global $db;
  global $DATA_OBJ;
  if($userType=="registered")
    $userId= $user->getUuid();
  else{
    $userId="guest";
  }
  $element_type=$DATA_OBJ->params->element_type;
  $adID=$DATA_OBJ->params->elementId;
  $reportId=uniqid();
  $content=$DATA_OBJ->params->freeText;
  $title=$DATA_OBJ->params->title;
  $reportType=$DATA_OBJ->params->reportType;
  $query="INSERT INTO user_reports (id,element_id,userId,content,title,report_reason,element_type) VALUES ('$reportId','$adID','$userId','$content','$title','$reportType','$element_type') ";
  $result=$db->readDBNoStoredProcedure($query);
  echo json_encode($result);
  die;
}
function getAllReports(){
  //get all reports
  global $user;
  if($user->getRule()!="5150"){
    //not manager
    echo "not authorized";
    die;
  }
  else{
    global $db;
    global $DATA_OBJ;
    $query="select * from user_reports";
    $result=$db->readDBNoStoredProcedure($query);
    echo json_encode($result);
    die;
  }
}
function changeReportStatus(){
  //get report active field by what we got at dataObj object
  global $user;
  if($user->getRule()!="5150"){
    //not manager
    echo "not authorized";
    die;
  }
  else{
    global $db;
    global $DATA_OBJ;
    $active=$DATA_OBJ->params->active;
    $query="UPDATE user_reports SET active = '$active' WHERE id = '{$DATA_OBJ->params->id}'";
    $result=$db->readDBNoStoredProcedure($query);
    echo json_encode($result);
    die;
  }
}
function changeReportManagerFeedback(){
    //update manager feedback for report we got at dataObj
  global $user;
  if($user->getRule()!="5150"){
    //not manager
    echo "not authorized";
    die;
  }
  else{
    global $db;
    global $DATA_OBJ;
    $manager_feedback=$DATA_OBJ->params->manager_feedback;
    $query="UPDATE user_reports SET manage_feedback = '$manager_feedback' WHERE id = '{$DATA_OBJ->params->id}'";
    $result=$db->readDBNoStoredProcedure($query);
    echo json_encode($result);
    die;
  }

}
function  getNewReports(){
  //get new reports
  global $user;
  if($user->getRule()!="5150"){
    //not manager
    echo "not authorized";
    die;
  }
  else{
    global $db;
    global $DATA_OBJ;
    $query="select * from user_reports where active = '1'";
    $result=$db->readDBNoStoredProcedure($query);
    echo json_encode($result);
    die;
  }
}
function getReportsThatAreNotActive(){
  //get all reports that have been tempered
  global $user;
  if($user->getRule()!="5150"){
    //not manager
    echo "not authorized";
    die;
  }
  else{
    global $db;
    global $DATA_OBJ;
    $query="select * from user_reports where active = '0'";
    $result=$db->readDBNoStoredProcedure($query);
    echo json_encode($result);
    die;
  }
}
function sendReportToUser(){
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
function getReportsOnAdsForUserIdByParam($seenStatus){
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
    $query="select * from system_messages where userId = '$userId' and msgType= 'report' and seen='$seenStatus'";
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
function getAllReportsOnAdsForUserId(){
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
    if($result!=false){
    for ($i=0; $i <count($result) ; $i++) {
      //we split the msg content to report id and adId
      $objForRow=array("id"=>$result[$i]->msgId,"reportId"=>explode(" ", $result[$i]->message_content)[0],"adId"=>explode(" ", $result[$i]->message_content)[1],"createTime"=>$result[$i]->create_time,"seen"=>$result[$i]->seen=="1"?"כן":"לא");
      // $objForRow=json_encode($objForRow);
      $resultForTheTable[$i]=$objForRow;
    }
  }
    else{
      $reusut=[];
    }
    echo json_encode($resultForTheTable);
    die;
}
}
function getReportById($elementId){
  //return a report from the user_reports table by its id
  global $userType;
  global $user;
  global $db;
  global $DATA_OBJ;
  $query="select * from user_reports where id='$elementId'";
  $result=$db->readDBNoStoredProcedure($query);
  return $result;
}
function getSelectedAdWithReportFeedback(){
  //get feedback and the ad
  global $userType;
  global $user;
  global $db;
  global $DATA_OBJ;
require_once('searchAds.php');//to have the functions that find ad by id
 $ad=getAdByAdIdForParams($DATA_OBJ->params->adId);
 $report=getReportById($DATA_OBJ->params->reportId);
 $result["ad"]=$ad;
 $result["report"]=$report;
echo json_encode($result);
}
if($DATA_OBJ->data_type=="reportOnElement"){
createReportOnAd();
}
else{
  if($DATA_OBJ->data_type=="getAllReportReasons"){
    getAllReportReasons();
  }
  else{
    if($DATA_OBJ->data_type=="getAllReports"){
      getAllReports();
    }
    else{
      if($DATA_OBJ->data_type=="changeReportStatus"){
        changeReportStatus();
      }
      else{
        if($DATA_OBJ->data_type=="changeReportManagerFeedback"){
          changeReportManagerFeedback();
        }
        else{
          if($DATA_OBJ->data_type=="getReportsThatAreNotActive"){
            getReportsThatAreNotActive();
          }
          else{
            if($DATA_OBJ->data_type=="getNewReports"){
              getNewReports();
            }
            else{
              if($DATA_OBJ->data_type=="sendReportToUser"){
                sendReportToUser();
              }
              else{
                if($DATA_OBJ->data_type=="getAllReportsOnAdsForUserId"){
                  getAllReportsOnAdsForUserId();
                }
                else{
                  if($DATA_OBJ->data_type=="getReportsOnAdsForUserIdByParam"){
                    if($DATA_OBJ->params->seenStatus!="1"&&$DATA_OBJ->params->seenStatus!="0"){
                     getAllReportsOnAdsForUserId();
                    }
                     else{
                      
                        getReportsOnAdsForUserIdByParam($DATA_OBJ->params->seenStatus);
                      }
                    }
                  else{
                  if($DATA_OBJ->data_type=="getSelectedAdWithReportFeedback"){
                    getSelectedAdWithReportFeedback();
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
}
?>