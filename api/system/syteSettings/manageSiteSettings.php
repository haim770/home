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

function getAllSiteSettings(){
global $user;
global $DATA_OBJ;
global $db;
  if($user->getRule()!="5150"){
    //not manager
    echo "not authorized";
    die;
  }
  $query="select * from settings";
    $result=$db->readDBNoStoredProcedure($query);
    echo json_encode($result);
    die;
}
function getNumOfAdsGift(){
  //return adsGift field value
  global $DATA_OBJ;
global $db;
  $query="select adsGift from settings";
  $result=$db->readDBNoStoredProcedure($query);
  return $result;
}
function updateSiteSettings(){
global $user;
global $DATA_OBJ;
global $db;
  if($user->getRule()!="5150"){
    //not manager
    echo "not authorized";
    die;
  }
  $query="UPDATE settings SET adsGift = '{$DATA_OBJ->params->ad_value}'";
  $result=$db->readDBNoStoredProcedure($query);
  if(getNumOfAdsGift()[0]->adsGift==$DATA_OBJ->params->ad_value){
    echo json_encode("update good");
    die;
  }
  echo json_encode("update bad");
  die;

    
    
}
if($DATA_OBJ->data_type=="getAllSiteSettings"){
  getAllSiteSettings();
}
else{
  if($DATA_OBJ->data_type=="updateSiteSettings"){
    updateSiteSettings();
  }
}
?>