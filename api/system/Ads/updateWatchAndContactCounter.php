<?php
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