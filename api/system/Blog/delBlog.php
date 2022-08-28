<?php
// get authTest file
$authPath = "../../Authentication/authTest.php";
include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);

/**
 * Check if user is admin
 */
if ($user->getRule() == "5150") {
    $arr = []; //for global scope var
    $arr["blogId"] = $DATA_OBJ->params->blogId;

    $query = "DELETE FROM `blogs` WHERE `blog_id`=:blogId";
    $db->writeDBNotStoredProcedure($query, $arr);

    echo json_encode(
        "closed"
    );
    die;
} else {
    echo json_encode("not auturized");
}
