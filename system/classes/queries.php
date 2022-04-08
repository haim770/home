<?php
require_once('useDbs.php');
$db = dbClass::GetInstance();
//$query = "CALL `getFirstNameLastName`('lidor','ben shimol');";

enum readDB: string{
    case getAllAds = "CALL `getAdsTable`();";
    case getAllUsers = "CALL `getUsersTable`();";
}

enum writeDB: string {

}

enum updateDB: string {

}
$query = readDB::getAllAds;
$data = $db->readDB($query, []);
if(is_array($data)){
    foreach($data as $row){
        print_r($row);
    }
}

?>