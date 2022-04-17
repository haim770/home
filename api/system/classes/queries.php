<?php
require_once('useDbs.php');
$db = dbClass::GetInstance();
//$query = "CALL `getFirstNameLastName`('lidor','ben shimol');";+

$readDB = array();
$readDB = [
    "GetAllUsers"=> "CALL `getUsersTable`();",
    "GetAllAds"=> "CALL `getAdsTable`();"
];

function _r($read){
    global $readDB;
    return $readDB[$read];
}
$query = _r("GetAllUsers");


$data = $db->readDB($query, []);
if(is_array($data)){
    foreach($data as $row){
        print_r($row);
    }
}

?>