<?php
function getUserIdContactSetter(){
  global $DATA_OBJ;
  global $db;
  $query="select userIdContactSet from ads where adID ='{$DATA_OBJ->params->adID}'";
  $result = $db->readDBNoStoredProcedure($query);
  return $result[0]->userIdContactSet;
}
function getUserIdWatch(){
  global $DATA_OBJ;
  global $db;
  $query="select userIdWatchSet from ads where adID ='{$DATA_OBJ->params->adID}'";
  $result = $db->readDBNoStoredProcedure($query);
  return $result[0]->userIdWatchSet;
}

function setUserIdWatchSetter($tmpForWatch){
  //set user to make the ++ for the watch to avoid collisions
  global $DATA_OBJ;
  global $db;
  $query="update ads set userIdWatchSet= '$tmpForWatch'  where adID ='{$DATA_OBJ->params->adID}'";
  $result = $db->readDBNoStoredProcedure($query);
}
function setUserIdContactSetter($tmpForContact){
  //set user to make the ++ for the contact to avoid collisions
  global $DATA_OBJ;
  global $db;
  $query="update ads set userIdContactSet= '$tmpForContact'  where adID ='{$DATA_OBJ->params->adID}'";
  $result = $db->readDBNoStoredProcedure($query);
}
function getContactCounter(){
  //get contact counter from db
   global $db;
    global $DATA_OBJ;
    global $arr;
    $arr=[];
    $query = "select contact_counter from ads where adID ='{$DATA_OBJ->params->adID}'";
    $result = $db->readDBNoStoredProcedure($query);
    // print_r($result);
    if($result[0].contact_counter!=null){
    return $result[0].contact_counter;}
    else{
      return false;
    }
}
function updateContacted(){
    global $db;
    global $DATA_OBJ;
    global $arr;
    $tmpForContact=uniqid();
    $arr = [];
    $count=0;
    do{
    while(getUserIdContactSetter()!=""&&getUserIdContactSetter()!=$tmpForContact&&$count<10);
    //only if userId is equale to "" or to our key we will be able to keep forward
    setUserIdContactSetter($tmpForContact);
  $count++;}
    while(getUserIdContactSetter()!=$tmpForContact);
    $query = "update ads set contact_counter=contact_counter+1 where adID ='{$DATA_OBJ->params->adID}'";
    $result = $db->writeDBNotStoredProcedure($query);
    setUserIdContactSetter("");
    echo json_encode($result);
}
function updateWatch()
{

    global $db;
    global $DATA_OBJ;
    global $arr;
    $arr = [];
    $tmpForWatch=uniqid();
    $arr = [];
    $count=0;
    do{
      $tmp=getUserIdWatch();
    while($tmp!=""&&$tmp!=$tmpForWatch&&$count<2){
        $tmp=getUserIdWatch(); 
        $count=$count+1; 
    }
    //only if userId is equale to "" or to our key we will be able to keep forward
    setUserIdWatchSetter($tmpForWatch);}
    while(getUserIdContactSetter()!=$tmpForWatch&&$count<2);
    $query = "update ads set watch=watch+1 where adID ='{$DATA_OBJ->params->adID}'";
    $result = $db->writeDBNotStoredProcedure($query);
    setUserIdWatchSetter("");
    echo json_encode($result);
}
if($DATA_OBJ->data_type=="updateWatch"){
  updateWatch();
}
else{
  if($DATA_OBJ->data_type=="updateContacted"){
    updateContacted();
  }
}

?>