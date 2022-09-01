<?php
 require_once(__DIR__.'/../queries.php');
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
  global $arr;
  global $queryArr;
  $arr=[];
  if(isset($DATA_OBJ->params->elementType)){
  $arr["element_type"]=$DATA_OBJ->params->elementType;
  $query=$queryArr["getAllReportReasonsForElementType"];
  }
  else{
    $query=$queryArr["getAllReportReasons"]; 
  }
  $result=$db->readDBNoStoredProcedure($query,$arr);
  $arr=[];
  echo json_encode($result);
}

function createReportOnAd(){
  //open report on ad (complain)
  global $userType;
  global $user;
  global $arr;
  $arr=[];
  global $queryArr;
  global $db;
  global $DATA_OBJ;
  if($userType=="registered")
    $userId= $user->getUuid();
  else{
    $userId="guest";
  }
  $arr["userId"]=$userId;
  $arr["element_type"]=$DATA_OBJ->params->element_type;
  $arr["element_id"]=$DATA_OBJ->params->elementId;
  $arr["id"]=uniqid();
  $arr["content"]=$DATA_OBJ->params->freeText;
  $arr["title"]=$DATA_OBJ->params->title;
  $arr["report_reason"]=$DATA_OBJ->params->reportType;
  $query=$queryArr["createReportOnElement"];
  $result=$db->readDBNoStoredProcedure($query,$arr);
  $arr=[];
  echo json_encode($result);
  die;
}
function ToggleActiveReportReason(){
  //toggle active report reason
  global $userType;
  global $user;
  global $db;
  global $arr;
  $arr=[];
  global $queryArr;
  global $DATA_OBJ;
  if($userType!="registered"||$user->getRule()!="5150"){
    echo "not authorized";
    die;
  }
  $arr["reason_id"]= $DATA_OBJ->params->reasonId;
  $arr["active"]=$DATA_OBJ->params->active=='1'?0:1;
  $query=$queryArr["updateActiveStatusOfReport"];
  $result=$db->readDBNoStoredProcedure($query);
  $arr=[];
  echo json_encode(checkIfReasonExist($reasonId,"checkById"));
  die;

}
function editReportReason(){
  //edit report reason
   global $userType;
  global $user;
  global $db;
  global $arr;
  $arr=[];
  global $queryArr;
  global $DATA_OBJ;
  if($userType!="registered"||$user->getRule()!="5150"){
    echo "not authorized";
    die;
  }
    $arr["reason_id"]= $DATA_OBJ->params->reasonId;
    $arr["element_type"]=$DATA_OBJ->params->category;
    $arr["reason_name"]=$DATA_OBJ->params->reasonName;
    $query=$queryArr["editReportReason"];
    $result=$db->readDBNoStoredProcedure($query);
    echo json_encode(checkIfReasonExist($reasonName,$category));
    die;
}
function addNewReportReason(){
  //insert new report reason
   global $userType;
  global $user;
  global $db;
  global $arr;
  $arr=[];
  global $queryArr;
  global $DATA_OBJ;
  if($userType!="registered"||$user->getRule()!="5150"){
    echo "not authorized";
    die;
  }
  else{
    $arr["reason_id"]= uniqid();
    $arr["element_type"]=$DATA_OBJ->params->category;
    $arr["reason_name"]=$DATA_OBJ->params->reasonName;
    $query=$queryArr["insertNewReportReason"];
    $result=$db->readDBNoStoredProcedure($query);
    echo json_encode(checkIfReasonExist($reasonName,$category));
    die;
  }
}
function checkIfReasonExist($reasonName,$category){
  //check if reason exist
  global $db;
  global $arr;
  global $queryArr;
  if($category=="checkById"){
    $arr["reason_id"]=$reasonName;
    $query=$queryArr["getReportByActiveAndById"];
  }
  else{
    $arr["reason_name"]=$reasonName;
    $arr["element_type"]=$category;
  $query=$queryArr["getReportByActiveReaonNameAndElementType"];
}
  $result=$db->readDBNoStoredProcedure($query);
  if($result==[]||$result==false||$result==""){
    return false;
  }
  return true;
}
function requestChangeMail(){
  //request from user to manager to change his mail
  global $userType;
  global $user;
  global $db;
  global $DATA_OBJ;
  global $arr;
  $arr=[];
  global $queryArr;
  if($userType=="registered")
    $userId= $user->getUuid();
  else{
    $userId="guest";
    echo "not authorized";
    die;
  }
  $arr["element_id"]=$user->getUuid();
  $arr["userId"]=$user->getUuid();
  $arr["element_type"]=$DATA_OBJ->params->element_type;
  $arr["id"]=uniqid();
  $arr["content"]=$DATA_OBJ->params->freeText;
  $arr["title"]=$DATA_OBJ->params->title;
  $arr["report_reason"]=$DATA_OBJ->params->reportType;
  $query=$queryArr["insertUserReport"];
  $result=$db->readDBNoStoredProcedure($query,$arr);
  $arr=[];
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
    global $queryArr;
    $query=$queryArr["getAllReports"];
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
    global $arr;
    $arr=[];
    global $queryArr;
    $arr["id"]=$DATA_OBJ->params->id;
    $arr["active"]=$DATA_OBJ->params->active;
    $arr["manager_feedback"]=$DATA_OBJ->params->manager_feedback;
    $query=$queryArr["updateReportStatus"];
    $result=$db->readDBNoStoredProcedure($query,$arr);
    $arr=[];
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
    global $arr;
    global $queryArr;
    global $DATA_OBJ;
    $arr["id"]=$DATA_OBJ->params->id;
    $arr["manager_feedback"]=$DATA_OBJ->params->manager_feedback;
    $query=$queryArr["updateManagerFeedback"];
    $result=$db->readDBNoStoredProcedure($query,$arr);
    $arr=[];
    echo json_encode($result);
    die;
  }

}
function  getNewReports(){
  //get new reports for manager
  global $user;
  global $queryArr;
  if($user->getRule()!="5150"){
    //not manager
    echo "not authorized";
    die;
  }
  else{
    global $db;
    global $DATA_OBJ;
    $query=$queryArr["getActiveReports"];
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
    global $queryArr;
    $query=$queryArr["getNotActiveReports"];
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
  $arr["msgId"]=uniqid();
  $elementId=$DATA_OBJ->params->elementId;
  $arr["userId"]=$DATA_OBJ->params->userId;
  $reportId=$DATA_OBJ->params->reportId;
  $arr["message_content"]=$reportId." ".$elementId;//we will contain the element id and the report id at the content
  $arr["msgType"]="report"
  $query=$queryArr["sendReportToSystemMsg"];
  $result=$db->readDBNoStoredProcedure($query);
  $arr=[];
  echo json_encode($result);
  die;
}
function getReportsOnAdsForUserIdByParam($seenStatus){
  //get all report that apply to the seen status param
  global $userType;
  global $user;
  global $arr;
  global $queryArr;
  $arr=[];
  global $db;
  global $DATA_OBJ;
  if($userType!="registered"){
    echo "not authorized";
    die;
  }
  else{
    $arr["userId"]= $user->getUuid();
    $arr["msgType"]="report";
    $arr["seen"]=$seenStatus;
    $msgId=uniqid();
    //we will contain the element id and the report id at the content
    $query=$queryArr["getSystemMsgBySeenStatus"];
    $result=$db->readDBNoStoredProcedure($query,$arr);
    $arr=[];
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
  global $queryArr;
  global $arr;
  $arr=[];
  global $DATA_OBJ;
  if($userType!="registered"){
    echo "not authorized";
    die;
  }
  else{
    $arr["userId"]= $user->getUuid();
    $msgId=uniqid();
    $arr["msgType"]="report";
    //we will contain the element id and the report id at the content
    $query=$queryArr["getSystemMessagesByUserIdAndTypeOfReport"];
    $result=$db->readDBNoStoredProcedure($query,$arr);
    $arr=[];
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
    $arr["seen"]="1";
    $arr["userId"]=$user->getUuid();
    $query=$queryArr["updateReportSeenByUserId"];
    $result=$db->readDBNoStoredProcedure($query,$arr);
    echo json_encode($resultForTheTable);
    $arr=[];
    die;
}
}
function getReportById($elementId){
  //return a report from the user_reports table by its id
  global $userType;
  global $user;
  global $db;
  global $DATA_OBJ;
  global $queryArr;
  global $arr;
  $arr=[];
  $arr["id"]=$elementId;
  $query=$queryArr["getUser_reportById"];
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
                  else{
                    if($DATA_OBJ->data_type=="addNewReportReason"){
                      addNewReportReason();
                    }
                    else{
                      if($DATA_OBJ->data_type=="editReportReason"){
                        editReportReason();
                      }
                      else{
                        if($DATA_OBJ->data_type=="toggleReportReasons"){
                          ToggleActiveReportReason();
                        }
                        else{
                          if($DATA_OBJ->data_type=="requestChangeMail"){
                            requestChangeMail();
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
    }
  }
}
}
?>