<?php
function getContactCounter(){
  //get contact counter from db
   global $db;
    global $DATA_OBJ;
    global $arr;
    $arr=[];
    $query = "select contact_counter from ads where where adID ='{$DATA_OBJ->params->adID}'";
    $result = $db->readDBNoStoredProcedure($query);
    // print_r($result);
    if(isset($result[0].contact_counter)){
    return $result[0].contact_counter;}
    else{
      return false;
    }
}
function updateContacted(){
    global $db;
    global $DATA_OBJ;
    global $arr;
    $arr = [];
    $query = "update ads set contact_counter=contact_counter+1 where adID ='{$DATA_OBJ->params->adID}'";
    $result = $db->writeDBNotStoredProcedure($query);
    echo json_encode($result);
}
function updateWatch()
{

    global $db;
    global $DATA_OBJ;
    global $arr;
    $arr = [];

    $query = "update ads set watch=watch+1 where adID ='{$DATA_OBJ->params->adID}'";
    $result = $db->writeDBNotStoredProcedure($query);
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