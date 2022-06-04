<?php
$arr = [];

// glue them together with ', '
$ads  = implode("', '", explode("::", $DATA_OBJ->params->myCookie));

//read data back from data base and display it on pur chat box
$query = "SELECT * FROM `ads` WHERE `adID` in ('$ads')";
$adsFounded = $db->readDBNoStoredProcedure($query, $arr);

print_r($adsFounded);
die;
?>