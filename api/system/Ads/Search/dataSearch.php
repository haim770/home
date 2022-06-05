<?php

if($DATA_OBJ->params->selected == "city"){
    // get cities file
    $authPath = "./cities.xml";

    $xml = simplexml_load_file(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);
    $citysNames = array();
    $array = json_decode(json_encode((array)$xml), TRUE);
    foreach ($array as $key => $citys) {
        foreach($citys as $city) {
            $label = $city["en_city_name"];
            if(!is_array($city["en_city_name"]))
                $label = $city["city_name"];
            $obj = array(
                "label" => $city["city_name"] ?? "",
                "value" => $label,
            );
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
else if($DATA_OBJ->params->selected == "street") {
    $toSearch = $DATA_OBJ->params->cityName;
    // get cities file
    $authPath = "./streets.xml";
    $xml = simplexml_load_file(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);
    //Search query:
    $query = "//ROW[city_name='$toSearch']/street_name";
    //Get query results
    $result = $xml->xpath($query);

    $streetsNames = array();
    $array = json_decode(json_encode((array)$result), TRUE);

    foreach ($array as $key => $streets) {
        foreach ($streets as $street) {
            $obj = array(
                "label" => $street,
                "value" => $street,
            );
            array_push($streetsNames, $obj);
        }
    }

    echo json_encode(
        array(
            "message" => "streetList",
            "searchOption" => $streetsNames,
        )
    );
    die;
}

?>
