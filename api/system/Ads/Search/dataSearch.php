<?php

if($DATA_OBJ->params->selected == "city"){
    // get authTest file
    $authPath = "./cities.xml";

    $xml = simplexml_load_file(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);
    /**
     * Create annonimios object
     */
    $citysNames = array();
    $array = json_decode(json_encode((array)$xml), TRUE);
    foreach ($array as $key => $citys) {
        foreach($citys as $city) {
            $label = $city["city_name"];
            if(!is_array($city["en_city_name"]))
                $label = $city["en_city_name"];
            $obj = array(
                "value" => $city["city_name"] ?? "",
                "label" => $label,
            );
            //$obj->value = $citys->city_name ?? "";
            //$obj->label = $citys->en_city_name ?? "";
            array_push($citysNames, $obj);
        }

    }
    
   echo json_encode(
        array(
            "message" => "cityList",
            "searchOption" => $citysNames,)
    );
    die;
}

?>
