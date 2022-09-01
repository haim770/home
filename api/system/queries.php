<?php
$queryArr=[];
//select queries
$queryArr["getExpireDateFromSettings"]="select expireDateAds from settings";
$queryArr["getAllAdsWaitForApproval"]="select adID,user_id from ads where approval_status= 'pending' and active= '0'";
$queryArr["getFavoritesTouserId"]="select * from favorites where userId = :userId";
$queryArr["getUserById"]="select * from users where uuid =:uuid";
$queryArr["getPicsForElementId"]="select * from pictures where element_id =:element_id order by serial_number";
$queryArr["getImgesForAd"]="select * from pictures where element_id =:element_id order by serial_number";
$queryArr["getUserByID"]="select * from users where uuid =:uuid";
//insert queries
$queryArr["insertFavoriteAd"]="INSERT INTO favorites (favorite_id,userId,AdId) VALUES (:favorite_id, :userId, :adID)";
$queryArr["insertPictures"]="INSERT INTO `pictures`(`pictureID`, `element_id`, `serial_number`, `picture_url`, `upload_time`, `alt`) VALUES (:uuid,:adUuid,:serial_number,:insertValuesSQL,:curDate,:alt)";
//update queries
$queryArr["decreaseRemainingAdsByOne"]="UPDATE users SET remaining_ads = remaining_ads-1 WHERE uuid =:uuid";
$queryArr["declineAd"]="UPDATE ads SET approval_status = 'declined', active= false WHERE adID = :adID";
$queryArr["aproveAd"]="UPDATE ads SET approval_status = 'aproved', active= true WHERE adID = :adID";
//delete queries
$queryArr["deleteAdFromFavorites"]="DELETE from favorites where userId=:userId and AdId=:adID";
$queryArr["deleteAdContentForAdId"]="Delete from ad_content where adID=:adID";
function queryForGetAdsWaitForApprovalByParams($end,$start){
  //get query for ads wait for approval by start and end values
  return "select  DISTINCT ads.adID,ads.user_id from ads where approval_status= 'pending' and active='0' limit ".$end." OFFSET ".$start;
}
function queryForUpdateAdPardOfTheAd($city,$street,$propertyTaxes,$houseCommittee,$floor,$maxFloor,$price,$rooms,$adType,$entry,$building_number,$expire_date,$area,$property_type,$entryDate,$adID){
  //returns query for updating the ads part of ad
  return "UPDATE ads SET city = '$city', street = '$street',propertyTaxes ='$propertyTaxes', houseCommittee ='$houseCommittee',floor ='$floor',maxFloor ='$maxFloor',price='$price',rooms='$rooms',adType='$adType',entry='$entry',building_number='$building_number',expire_date='$expire_date',area= '$area',property_type='$property_type',entry_date='$entryDate',active ='0' ,approval_status ='pending' WHERE adID = '$adID'";
}
function queryForInsertAdPardOfTheAd($city,$street,$propertyTaxes,$houseCommittee,$floor,$maxFloor,$price,$rooms,$adType,$entry,$building_number,$expire_date,$area,$property_type,$entryDate,$adID,$user_id){
  //returns query for inserting the ads part of ad
  return "INSERT INTO ads (adID,user_id,city,street,propertyTaxes,houseCommittee,floor,maxFloor,price,rooms,adType,entry,building_number,expire_date,area,entry_date,property_type,ad_link) VALUES('$adID','$user_id','$city','$street','$propertyTaxes','$houseCommittee','$floor','$maxFloor','$price','$rooms','$adType','$entry','$building_number','$expire_date','$area','$entryDate','$property_type','$adID')";
}
?>
