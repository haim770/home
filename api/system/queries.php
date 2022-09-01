<?php
$queryArr=[];
$queryArr["insertPictures"]="INSERT INTO `pictures`(`pictureID`, `element_id`, `serial_number`, `picture_url`, `upload_time`, `alt`) VALUES (:uuid,:adUuid,:serial_number,:insertValuesSQL,:curDate,:alt)";
$queryArr["getAllAdsWaitForApproval"]="select adID,user_id from ads where approval_status= 'pending' and active= '0'";
$queryArr["getUserById"]="select * from users where uuid =:uuid";
$queryArr["getPicsForElementId"]="select * from pictures where element_id =:element_id order by serial_number";
$queryArr["declineAd"]="UPDATE ads SET approval_status = 'declined', active= false WHERE adID = :adID";
$queryArr["aproveAd"]="UPDATE ads SET approval_status = 'aproved', active= true WHERE adID = :adID";
function queryForGetAdsWaitForApprovalByParams($end,$start){
  //get query for ads wait for approval by start and end values
  return "select  DISTINCT ads.adID,ads.user_id from ads where approval_status= 'pending' and active='0' limit ".$end." OFFSET ".$start;
}
?>
