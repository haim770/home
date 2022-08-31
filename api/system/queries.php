<?php
$queryArr=[];
$queryArr["insertPictures"]="INSERT INTO `pictures`(`pictureID`, `element_id`, `serial_number`, `picture_url`, `upload_time`, `alt`) VALUES (:uuid,:adUuid,:serial_number,:insertValuesSQL,:curDate,:alt)";

?>
