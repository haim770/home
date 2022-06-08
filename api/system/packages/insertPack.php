<?php
function insertPack(){
    //insert package
    global $db;
    global $DATA_OBJ;
    global $arr;
    if(checkIfTitleOfPackExist($DATA_OBJ->params->title)!=0){
        echo  "false";
        return;
    }
    $arr['packageId'] = uniqid();
    generateArrayParamsFromPost();
    $query = "insertPackage(:packageId,:price,:title,:content,:ad_value)";
    $result = $db->writeDb($query, $arr);
    echo json_encode($result);
    $arr=[];
}
function checkIfTitleOfPackExist($title){
global $db;
$query="SELECT COUNT(1) FROM package WHERE title = '$title' and is_active = '1'";
$result=$db->readDBNoStoredProcedure($query,[]);
return $result;
}
?>