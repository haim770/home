<?php
// get authTest file
$authPath = "../../../Authentication/authTest.php";
include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);

/**
 * Check if user got enoght ads to publish or user is admin, if user is admin he can publish as much as he want
 */
if($user->getRemainingAds()>0 || $user->getRule() == "5150") {
$arr = []; //for global scope var
$arr["adUuid"] = uniqid(); // will be use for all our data storage
// File upload configuration 
$targetDir = "../../../Images/";
$allowTypes = array('jpg', 'png', 'jpeg', 'gif');

$fileNames = array_filter($_FILES['files']['name']);
$statusMsg = $errorMsg = $insertValuesSQL = $errorUpload = $errorUploadType = '';

/**
 * STEP ONE
 * upload files to server
 */
if(!empty($fileNames)){
        $arr["serial_number"] = 1; // image counter
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
                $query = "INSERT INTO `pictures`(`pictureID`, `element_id`, `serial_number`, `picture_url`, `upload_time`, `alt`) VALUES (:uuid,:adUuid,:serial_number,:insertValuesSQL,:curDate,:alt)";
                $db->writeDBNotStoredProcedure($query, $arr);
                $arr["serial_number"] = 1 + $arr["serial_number"]; // image counter
            } else {
                $statusMsg = "Upload failed! ";
            }
            unset($arr["insertValuesSQL"]);
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
    $arr2["uuid"] = $arr["adUuid"];
    $arr2["expire_date"] = $expDate;
    $arr2["city"] = $expDate;
    $arr2["street"] = $expDate;
    $arr2["appartmentEntrance"]= $formData->appartmentEntrance;
    $arr2["appartmentNumber"] = $formData->appartmentNumber;
    $arr2["area"] = $formData->area;
    $arr2["assetEntry"] = $formData->assetEntry;
    $arr2["assetOption"] = $formData->assetOption;
    $arr2["assetOption"] = "השכרה";
    if($formData->assetOption=="buy")
        $arr2["assetOption"] = "קנייה";
    $arr2["city"] = $formData->city;
    $arr2["housefloor"] = $formData->floor;
    $arr2["houseTax"] = $formData->houseTax;
    $arr2["localTax"] = $formData->localTax;
    $arr2["maxFloor"] = $formData->maxFloor;
    $arr2["price"] = $formData->price;
    $arr2["street"] = $formData->street;
    $arr2["userId"] = $user->getUuid();
    $arr2["numberOfRooms"]= $formData->numberOfRooms;
$query = "INSERT INTO `ads`(`adID`, `user_id`, `expire_date`, `city`, `street`, `building_number`, `entry`,`apartment`, `zip_code`,`price`, `rooms`, `adType`, `floor`, `maxFloor`, `enteringDate`, `propertyTaxes`, `houseCommittee`) 
                    VALUES (:uuid,:userId,:expire_date,:city,:street,:appartmentNumber,:appartmentEntrance,:numberOfRooms,:numberOfRooms,:price,:numberOfRooms,:assetOption,:housefloor,:maxFloor,:assetEntry,:localTax,:houseTax)";
    $db->writeDBNotStoredProcedure($query, $arr2);


echo json_encode(
    array(
        "message" => "addNewForm",       
        "formData" => json_decode($DATA_OBJ["formData"]),
        "formDataStepThree" => $DATA_OBJ["formDataStepThree"],
    )
);
die;
}
else{
    echo json_encode(
        array(
            "message" => "zero ads to publish remain",
        )
    );
}