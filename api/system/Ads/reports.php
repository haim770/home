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
      }
    }
  }
}
?>