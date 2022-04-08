<?php
require_once('useDbs.php');
$db = dbClass::GetInstance();
$query = "CALL `getFirstNameLastName`('lidor','ben shimol');";
$data = $db->readDB($query,[]);

if(is_array($data)){
    foreach($data as $row){
        print_r($row);
    }
}

?>