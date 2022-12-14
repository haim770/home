<?php
// get authTest file
$authPath = "../../../Authentication/authTest.php";
include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);
require_once(__DIR__.'/../../queries.php');
deleteInputPics();

/**
 * Check if user got enoght ads to publish or user is admin, if user is admin he can publish as much as he want
 */
try {
if($user->getRule() == "5150"||$user->getRule()=="2001") {
$arr = []; //for global scope var
$arr["adUuid"] = $DATA_OBJ["adId"]; // will be use for all our data storage
// File upload configuration 
$targetDir = "../../../Images/";
$allowTypes = array('jpg', 'png', 'jpeg', 'gif');
if(isset($_FILES)&&isset($_FILES['files'])&&isset($_FILES['files']['name'])){
$fileNames = array_filter($_FILES['files']['name']);}
$statusMsg = $errorMsg = $insertValuesSQL = $errorUpload = $errorUploadType = '';
/**
 * STEP ONE
 * upload files to server
 */
// $query="delete from pictures where element_id='$arr[adUuid]'";
// $db->writeDBNotStoredProcedure($query,[]);
$query="";
if(!empty($fileNames)){
        $arr["serial_number"] = 1; // image counter
        if(isset($_FILES)&&isset($_FILES['files'])&&isset($_FILES['files']['name'])){
        foreach($_FILES['files']['name'] as $key=>$val){
            /**
             * Generate random string to save in the begining of the file name
             */
            $length = 8; // Adjust length to fit your new paranoia level. 16 is probably a sane default and the same length as md5 (if you are migrating from a method that uses it)
            // random_bytes — Generates cryptographically secure pseudo-random bytes.
            $token = bin2hex(random_bytes($length)); // bin2hex output is url safe.
            // File upload path 
            $fileName = basename($_FILES['files']['name'][$key]);
            $targetFilePath = dirname(__FILE__) . DIRECTORY_SEPARATOR . $targetDir . $token . $fileName; 
            $arr["curDate"] = date("Y-m-d H:i:s");
            $arr["alt"]= $fileName;
            // Check whether file type is valid 
            $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION); 
            if(in_array($fileType, $allowTypes)){ 
                // Upload file to server 
                if(move_uploaded_file($_FILES["files"]["tmp_name"][$key], $targetFilePath)){ 
                    // Image db insert sql 
                    $arr["insertValuesSQL"] = $token . $fileName;
                    
                }else{ 
                    $errorUpload .= $_FILES['files']['name'][$key].' | '; 
                } 
            }else{ 
                $errorUploadType .= $_FILES['files']['name'][$key].' | '; 
            }

            /**
             * Save image to database
             */
            if (!empty($arr["insertValuesSQL"])) {
                $arr["uuid"] = uniqid(); // image uniq id
                $query = $queryArr["insertPictures"];
                $db->writeDBNotStoredProcedure($query, $arr);
                $arr["serial_number"] = 1 + $arr["serial_number"]; // image counter
            } else {
                $statusMsg = "Upload failed! ";
            }
            unset($arr["insertValuesSQL"]);
        }
    }
}
/**
 * STEP TWO write all Ad data to server
 */
    $formData=json_decode($DATA_OBJ["formData"]);
    $arr2=[];
    $arr2["uuid"]= $arr["adUuid"];
    $expFormat = mktime(
        date("H"),
        date("i"),
        date("s"),
        date("m") + 30,
        date("d"),
        date("Y")
    );
    $expDate = date("Y-m-d H:i:s", $expFormat);
    $adID = $arr["adUuid"];
    $expire_date = $expDate;
    $street = isset($formData->street)?$formData->street:"";
    $building_number = isset($formData->appartmentNumber)?$formData->appartmentNumber:"";
    $entry = isset($formData->appartmentEntrance)?$formData->appartmentEntrance:"";
    $adType = "השכרה";
    if($formData->assetOption=="buy")
        $adType = "קנייה";
    $city= isset($formData->city)?$formData->city:"";
    $floor = isset($formData->floor)?$formData->floor:"";
    $propertyTaxes = isset($formData->houseTax)?$formData->houseTax:"";
    $houseCommittee = isset($formData->localTax)?$formData->localTax:"";
    $floor=isset($formData->floor)?$formData->floor:"";
    $maxFloor = isset($formData->maxFloor)?$formData->maxFloor:"";
    $price = isset($formData->price)?$formData->price:"";
    $rooms= isset($formData->numberOfRooms)?$formData->numberOfRooms:"";
    $area=isset($formData->area)?$formData->area:"";
    $property_type=isset($formData->assetType)?$formData->assetType:"";
    if(isset($formData->assetEntry)&&$formData->assetEntry=="עתידי"){
        if(!isset($formData->entryDate)||$formData->entryDate!="")
            $entryDate=$formData->entryDate;
    }
    else{
        $entryDate=isset($formData->assetEntry)?$formData->assetEntry:"";
    }
    $query=queryForUpdateAdPardOfTheAd($city,$street,$propertyTaxes,$houseCommittee,$floor,$maxFloor,$price,$rooms,$adType,$entry,$building_number,$expire_date,$area,$property_type,$entryDate,$adID);
    $db->writeDBNotStoredProcedure($query,[]);

/**
 * Step 3 - ad contact
 */
    $arr3=[];
    $arr3["adID"]=$adID;
    $formDataStepThree = json_decode($DATA_OBJ["formDataStepThree"]);
    $category=$formData->assetOption=="buy"?"קנייה":"השכרה";
    $query=$queryArr["deleteAdContentForAdId"];
    $db->writeDBNotStoredProcedure($query,$arr3);
    $arr3=[];
    foreach ($formDataStepThree as $key => $value) {
      if($value!=""&&$value!=false){
        // create new element id
        $arr3["elementUuid"] = uniqid();
        $arr3["valuee"]=$value;
        // get master element data
        $elementid = uniqid();
        // $query = "SELECT * FROM `ad_content` WHERE `element_id` =:elementid";
        // $elementData = $db->readDBNoStoredProcedure($query, $arr4)[0];
        $query = "INSERT INTO ad_content(element_id, adID, category, free_text, name, value) VALUES ('$elementid','$adID','$category','$key','$key','$value')";
        $db->writeDBNotStoredProcedure($query,[]);}
    }
echo json_encode("publish");
die;
}
else{
    echo json_encode("not autorized");
}
} catch (Exception $e) {
    echo json_encode("error");
}
function deleteSpesificPic($picUrl,$adId){
    //delete pic by adId and url of pic
    global $DATA_OBJ;
    global $db;
    $query="Delete from pictures where element_id='$adId' and picture_url='$picUrl'";
    $db->writeDBNotStoredProcedure($query,[]);
}
function deleteInputPics(){
    //delete the pics that came from the formData for delete
    global $DATA_OBJ;
    global $db;
    $adId= $DATA_OBJ["adId"];
    $imagesDelete=json_decode($DATA_OBJ["picsDelete"]);
    for ($i=0; $i <count($imagesDelete) ; $i++) { 
         deleteSpesificPic($imagesDelete[$i]->picture_url,$adId);
    }
}
?>