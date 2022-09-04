<?php
$userType="";//guest or registered
require_once(__DIR__.'/../queries.php');
global $DATA_OBJ;
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
function getMastersForAdsContentForTheTable()
{
    //get masters from adcontent table
    global $db;
    global $DATA_OBJ;
    global $arr;
    global $queryArr;
    global $user;
    global $userType;
     if($userType!="registered"||$user->getRule()!="5150"){
    echo "not authorized";
    die;
  }
  else{
    $userId= $user->getUuid();
    if($DATA_OBJ->params->selector=="getRentParams"){
  $query = $queryArr["getAdContentMastersForRent"];
    }
    else{
      if($DATA_OBJ->params->selector=="getBuyParams")
      {
  $query =$queryArr["getAdContentMastersForRent"]  ;
      }
      else{
        $query = $queryArr["getAllMasters"];
      }
    }
    $result=$db->readDBNoStoredProcedure($query);
    $resultForTheTable=[];
    $objForRow=[];
    if($result!=false){
    for ($i=0; $i <count($result) ; $i++) {
      //we split the msg content to report id and adId
      $typeOfVar=$result[$i]->max_value!=null||$result[$i]->min_value!=null?"מספר":"טקסט";
      $objForRow=array("id"=>$result[$i]->element_id,"category"=>$result[$i]->category,"min_value"=>$result[$i]->min_value,"max_value"=>$result[$i]->max_value,"required"=>$result[$i]->required,"category"=>$result[$i]->category,"name"=>$result[$i]->name,"display_type"=>$result[$i]->display_type,"typeOfVar"=>$typeOfVar);
      // $objForRow=json_encode($objForRow);
      $resultForTheTable[$i]=$objForRow;
    }}
    else{
      $resultForTheTable=[];
    }
    echo json_encode($resultForTheTable);
    die;
  }
}
function checkIfNameOfParamExist($paramName,$id,$category){
  //check if param name exist already return true if exist
  global $db;
    global $DATA_OBJ;
    global $arr;
    global $queryArr;
    $arr=[];
    $arr["name"]=$paramName;
    $arr["element_id"]=$id;
    $arr["category"]=$category;
    $query=$queryArr["checkIfAdContentMasterExist"];
    $result=$db->readDBNoStoredProcedure($query,$arr);
    
    $arr=[];
    if($result==false||$result==[]){
      return false;//not exist
    }
    return true;//exist


}
function generateQueryForEditParamAndPopulateArrWithMinMax(){
  global $DATA_OBJ;
  global $queryArr;
  global $arr;
  //if min+max
  if($DATA_OBJ->params->minValue!=""&&$DATA_OBJ->params->maxValue!=""){
      $arr["min_value"] =$DATA_OBJ->params->minValue;
      $arr["max_value"]=$DATA_OBJ->params->maxValue; 
      $query=$queryArr["updateParamWithMinAndMaxValue"];
    }

//only max value
  if($DATA_OBJ->params->minValue==""&&$DATA_OBJ->params->maxValue!=""){
     $arr["max_value"] =$DATA_OBJ->params->maxValue;
     $query=$queryArr["updateParamWithOnlyMaxValue"];
}
  //only min value
  if($DATA_OBJ->params->minValue!=""&&$DATA_OBJ->params->maxValue==""){
    $arr["min_value"]=$DATA_OBJ->params->minValue; 
    $query=$queryArr["updateParamWithOnlyMinValue"];
  }
  //no min/max value
  if($DATA_OBJ->params->minValue==""&&$DATA_OBJ->params->maxValue==""){
  $query=$queryArr["updateParamWithNoMinAndNoMaxValue"];
}
return $query;
}
function editParameterAds(){
  //edit parameter of ads
  global $db;
    global $DATA_OBJ;
    global $arr;
    $arr=[];
    global $queryArr;
    global $user;
    global $userType;
     if($userType!="registered"||$user->getRule()!="5150"){
    echo "not authorized";
    die;
  }
  if(checkIfNameOfParamExist($DATA_OBJ->params->paramName,$DATA_OBJ->params->element_id,$DATA_OBJ->params->category)){
    echo json_encode("param exist");
    die;
  }
  $arr["name"]=$DATA_OBJ->params->paramName;
  $arr["free_text"]=$DATA_OBJ->params->paramName;
  $arr["required"]=$DATA_OBJ->params->required;
  $arr["display_type"] =$DATA_OBJ->params->paramStyle;
  $arr["category"]=$DATA_OBJ->params->category;
  $arr["element_id"] = $DATA_OBJ->params->element_id;
  //min+max value
  $query=generateQueryForEditParamAndPopulateArrWithMinMax();
  $result=$db->readDBNoStoredProcedure($query,$arr);
  echo json_encode("edit was done");
  $arr=[];
  die;
}
function deleteParameter(){
  //delete parameter
   global $db;
    global $DATA_OBJ;
    global $arr;
    $arr=[];
    global $queryArr;
    global $user;
    global $userType;
     if($userType!="registered"||$user->getRule()!="5150"){
    echo "not authorized";
    die;
  }
  $arr["element_id"]=$DATA_OBJ->params->element_id;
  $query=$queryArr["deleteAdContentMasterByElementId"];
  $result=$db->readDBNoStoredProcedure($query,$arr);
  $arr=[];
  echo json_encode("delete was done");
  die;
}
function generateQueryForInsertMasterAndChangeGlobalArr(){
  //get the query for our insert data master
  global $DATA_OBJ;
  global $queryArr;
  global $arr;
  if(($DATA_OBJ->params->minValue==""&&$DATA_OBJ->params->maxValue=="")||$DATA_OBJ->params->paramType == "טקסט"){
      return $queryArr["insertAdContentMasterWithoutMinAndMax"];
    }
    //only min value
    if($DATA_OBJ->params->minValue!=""&&$DATA_OBJ->params->maxValue==""&&($DATA_OBJ->params->paramType== "מספר"||$DATA_OBJ->params->paramType == "INT")){
      $arr["min_value"]=$DATA_OBJ->params->minValue;
      return $queryArr["insertAdContentMasterWithMinNoMax"];
  }//only max
    if($DATA_OBJ->params->maxValue!=""&&$DATA_OBJ->params->minValue==""&&($DATA_OBJ->params->paramType== "מספר"||$DATA_OBJ->params->paramType == "INT")){ 
      $arr["max_value"]=$DATA_OBJ->params->maxValue;
      return $queryArr["insertAdContentMasterWithMaxNoMin"];
  }//max and min values
    if($DATA_OBJ->params->maxValue!=""&&$DATA_OBJ->params->minValue!=""&&($DATA_OBJ->params->paramType == "מספר"||$DATA_OBJ->params->paramType== "INT")){
    $arr["max_value"]=$DATA_OBJ->params->maxValue;
    $arr["min_value"]=$DATA_OBJ->params->minValue;
    return $queryArr["insertAdContentMasterWithMinAndMax"];
    }
    
}
function addNewMasterToAdContentTable()
{
    //add master parameter to adContent table its for manager only and will add new master
    //for adid 0
    global $db;
    global $DATA_OBJ;
    global $arr;
    global $user;
    global $queryArr;
    global $userType;
     if($userType!="registered"||$user->getRule()!="5150"){
    echo "not authorized";
    die;
  }
    $arr=[];
    $arr["element_id"] = uniqid();
    $arr["name"] = $DATA_OBJ->params->paramName;
    $arr["free_text"] = $DATA_OBJ->params->paramName;
    $arr["display_type"] = $DATA_OBJ->params->paramStyle;
    $arr["category"]=$DATA_OBJ->params->category;
    $arr["required"]=$DATA_OBJ->params->required;
    $query=generateQueryForInsertMasterAndChangeGlobalArr();
    $result = $db->readDBNoStoredProcedure($query,$arr);
    $arr = [];
    echo json_encode($result);
  }
if($DATA_OBJ->data_type=="getMastersForAdsContentForTheTable"){
getMastersForAdsContentForTheTable();
}
else{
  if($DATA_OBJ->data_type=="editParameterAds"){
    editParameterAds();
  }
  else{
    if($DATA_OBJ->data_type=="addNewMasterToAdContentTable"){
      addNewMasterToAdContentTable();
    }
    else{
      if($DATA_OBJ->data_type=="deleteParameter"){
      deleteParameter();
    }
    }
  }
}
?>