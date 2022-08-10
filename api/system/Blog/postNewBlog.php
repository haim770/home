<?php
// get authTest file
$authPath = "../../Authentication/authTest.php";
include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);

/**
 * Check if user is admin
 */
try {
    if ($user->getRule() == "5150") {
        $arr = []; //for global scope var
        $arr["blogId"] = uniqid(); // will be use for all our data storage
        // File upload configuration 
        $targetDir = "../../Images/";
        $allowTypes = array('jpg', 'png', 'jpeg', 'gif');
        if (isset($_FILES) && isset($_FILES['files']) && isset($_FILES['files']['name'])) {
            $fileNames = array_filter($_FILES['files']['name']);
        }
        $statusMsg = $errorMsg = $insertValuesSQL = $errorUpload = $errorUploadType = '';
        $coverImageURL = "";
        /**
         * STEP ONE
         * upload files to server
         */
        if (isset($fileNames)) {
            if (!empty($fileNames)) {
                $arr["serial_number"] = 1; // image counter
                foreach ($_FILES['files']['name'] as $key => $val) {
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
                    $arr["alt"] = $fileName;
                    // Check whether file type is valid 
                    $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);
                    if (in_array($fileType, $allowTypes)) {
                        // Upload file to server 
                        if (move_uploaded_file($_FILES["files"]["tmp_name"][$key], $targetFilePath)) {
                            // Image db insert sql 
                            $arr["insertValuesSQL"] = $token . $fileName;
                        } else {
                            $errorUpload .= $_FILES['files']['name'][$key] . ' | ';
                        }
                    } else {
                        $errorUploadType .= $_FILES['files']['name'][$key] . ' | ';
                    }
                    /**
                     * Save image to database
                     */
                    if (!empty($arr["insertValuesSQL"])) {
                        $arr["uuid"] = uniqid(); // image uniq id
                        $coverImageURL = $arr["insertValuesSQL"];
                        $query = "INSERT INTO `pictures`(`pictureID`, `element_id`, `serial_number`, `picture_url`, `upload_time`, `alt`) VALUES (:uuid,:blogId,:serial_number,:insertValuesSQL,:curDate,:alt)";
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
        
        $blogTitle = json_decode($DATA_OBJ["blogTitle"]);
        $blogBody = json_decode($DATA_OBJ["blogBody"]);
        $blogCategory = json_decode($DATA_OBJ["blogCategory"]);
        $blogSubCategory = json_decode($DATA_OBJ["blogSubCategory"]);
        $arr2 = [];
        $arr2["uuid"] = $arr["blogId"];

        $blogId = $arr["blogId"];
        $user_id = $user->getUuid();
        $query = "INSERT INTO `blogs`(`blog_id`, `title`, `userId`, `content`, `cover_image`, `category`, `subCategory`) VALUES ('$blogId','$blogTitle','$user_id','$blogBody','$coverImageURL','$blogCategory','$blogSubCategory')";
        $db->writeDBNotStoredProcedure($query, []);

        echo json_encode(
            "publish"
        );
        die;
    } else {
        echo json_encode("not auturized");
    }
} catch (Exception $e) {
    echo json_encode("error" + $e);
}
function decreaseAdValueBy1ToUser($userId)
{
    global $db;
    global $user;
    global $DATA_OBJ;
    $query = "UPDATE users SET remaining_ads = remaining_ads-1 WHERE uuid = '$userId'";
    $result = $db->writeDBNotStoredProcedure($query, []);
}
function getExpireDateFromSiteSettings()
{
    //gets num of days till expire from the settings
    global $db;
    global $user;
    global $DATA_OBJ;
    $query = "select expireDateAds from settings";
    $result = $db->readDBNoStoredProcedure($query, []);
    return $result[0]->expireDateAds;
}
