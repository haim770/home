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
  $userId= $user->getUuid();
  $adID=$DATA_OBJ->params->elementId;
  $reportId=uniqid();
  $content=$DATA_OBJ->params->freeText;
  $title=$DATA_OBJ->params->title;
  $reportType=$DATA_OBJ->params->reportType;
  $query="INSERT INTO user_reports (report_id,element_id,userId,content,title,report_reason) VALUES ('$reportId','$adID','$userId','$content','$title','$reportType') ";
  $result=$db->readDBNoStoredProcedure($query);
  echo json_encode($result);
  die;
}
if($DATA_OBJ->data_type=="reportOnElement"){
createReportOnAd();
}
else{
  if($DATA_OBJ->data_type=="getAllReportReasons"){
    getAllReportReasons();
  }
}
?>