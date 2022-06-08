<?php
// get imaege file
$path = "../../../Images/";
$path = dirname(__FILE__) . DIRECTORY_SEPARATOR . $path;

$arr = []; //for global scope var
$arr['adId'] = $DATA_OBJ->params->adId;
$quert = "SELECT * FROM `pictures` WHERE `element_id` =:adId and `serial_number` = 1";
$foundImage = $db->readDBNoStoredProcedure($query, $arr)[0];

$type = pathinfo($path . $foundImage->picture_url, PATHINFO_EXTENSION);
$data = file_get_contents($path);
$base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
?>