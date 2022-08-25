<?php 
// get authTest file
$authPath = "../../Authentication/authTest.php";
include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);
global $user;
global $db;
function getNewItemsCountForDashboardForUser(){
  //get the number of new items need to be seen as notifications
  global $db;
  global $DATA_OBJ;
  global $arr;
  global $user;
  $userId=$user->getUuid();
  $arr=[];
  $query="SELECT COUNT(msgid) as total FROM messages where receiver='$userId' and seen='0'";
  $NewMessagesCount=$db->readDBNoStoredProcedure($query);
  $query="SELECT COUNT(msgId) as total FROM system_messages where userId='$userId' and seen='0'";
  $newNotificationCount=$db->readDBNoStoredProcedure($query);
  $query="SELECT COUNT(id) as total FROM user_reports where seen='0' and element_id in (select adID as element_id from ads where user_id='$userId')";
  $newReportForTheUser=$db->readDBNoStoredProcedure($query);
  $result["newNotificationCount"]=$newNotificationCount;
  $result["NewMessagesCount"]=$NewMessagesCount;
  $result["newReportForTheUser"]=$newReportForTheUser;
  $result["newReportForManager"][0]["total"]=0;
  $result["newAdsWaitForAproval"][0]["total"]=0;
  foreach($result as $key=>$value){
    if($value==""||$value==false||$value==[]){
     $result[$key]["total"]=0;
    }
  }
  echo json_encode($result);
}
function getNewItemsCountForDashboardForManager(){
  //get new counts for the manager
  global $db;
  global $DATA_OBJ;
  global $arr;
  global $user;
  $userId=$user->getUuid();
  $arr=[];
  $query="SELECT COUNT(msgid) as total FROM messages where receiver='$userId' and seen='0'";
  $NewMessagesCount=$db->readDBNoStoredProcedure($query);
  $query="SELECT COUNT(msgId) as total FROM system_messages where userId='$userId' and seen='0'";
  $new=$db->readDBNoStoredProcedure($query);
  $query="SELECT COUNT(adID) as total FROM ads where active='0' and approval_status='pending'";
  $newAdsWaitForAproval=$db->readDBNoStoredProcedure($query);
  $query="SELECT COUNT(id) as total FROM user_reports where active='0'";
  $newReportForManager=$db->readDBNoStoredProcedure($query);
  $query="SELECT COUNT(id) as total FROM user_reports where element_id in (select adID from ads where user_id='$userId') and seen='0'";
  $newReportForTheUser=$db->readDBNoStoredProcedure($query);
  $result["newAdsWaitForAproval"]=$newAdsWaitForAproval;
  $result["newNotificationCount"]=$newNotificationCount;
  $result["NewMessagesCount"]=$NewMessagesCount;
  $result["newReportForTheUser"]=$newReportForTheUser;
  $result["newReportForManager"]=$newReportForManager;
  foreach($result as $key=>$value){
    if($value==""||$value==false||$value==[]){
     $result[$key]["total"]=0;
    }
  }
  echo json_encode($result);
}
if($DATA_OBJ->data_type=="getNewItemsCountForDashboard"){
  global $user;
  if($user->getRule()=="5150")
    getNewItemsCountForDashboardForManager();
  else{
    getNewItemsCountForDashboardForUser();
  }
}
?>