<?php
require_once('useDbs.php');
require_once('test.php');
$db = dbClass::GetInstance();
//$query = "CALL `getFirstNameLastName`('lidor','ben shimol');";

enum readQ: string{
    case getAllAds = "CALL `getAdsTable`();";
    case getAllUsers = "CALL `getUsersTable`();";
}

enum writeDB: string
{
    TEST
}

enum updateDB: string
{
}
$query = readQ::getAllUsers;
$data = $db->readDB($query, []);
if(is_array($data)){
    foreach($data as $row){
        print_r($row);
    }
}

?>