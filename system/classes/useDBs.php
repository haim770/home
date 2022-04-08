<?php
class dbClass
{
    private static $host;
    private static $db;
    private static $charset;
    private static $user;
    private static $pass;
    private static $opt = array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    );
    private static $connection;
    private static $obj;

    private function __construct(
        string $host = "localhost",
        string $db = "homedb",
        string $charset = "utf8",
        string $user = "root",
        string $pass = ""
    ) {
        self::$host = $host;
        self::$db = $db;
        self::$charset = $charset;
        self::$user = $user;
        self::$pass = $pass;
    }

    /**
     * Return instance of the database.
     */
    public static function GetInstance(): dbClass
    {
        if (self::$obj == null)
            self::$obj = new dbClass;
        return self::$obj;
    }

    /**
     * Method connect,
     * establish connection with db
     *     
     */
    private function connect()
    {
        $dns = "mysql:host=" . self::$host . ";dbname=" . self::$db . ";charset=" . self::$charset;
        try {
            self::$connection = new PDO($dns, self::$user, self::$pass, self::$opt);
        } catch (PDOException $e) {
            $e->getMessage();
            die;
        }
    }

    /**
     * method to disconnect from the DB
     */
    public function disconnect()
    {
        self::$connection = null;
    }

    /**
     * Method write data to our database.
     * 
     */

    public function writeDB($query, $query_data_array = [])
    {
        self::connect();
        $statement = self::$connection->prepare($query);
        $check = $statement->execute($query_data_array);
        self::disconnect();
        return $check;
    }

    /**
     * Method readDB
     * Read from db params are the query and array of params for query and obj to return.
     * Will parse the data to object.
     */
    public function readDBObj($query, $data_array = [], $obj)
    {
        self::connect();
        $statement = self::$connection->prepare($query);
        $check = $statement->execute($data_array);

        if ($check) {
            /**
             * PDO::FETCH_CLASS: returns a new instance of the requested class, mapping the columns of the 
             * result set to named properties in the class, and calling the constructor afterwards, unless 
             * PDO::FETCH_PROPS_LATE is also given. If mode includes PDO::FETCH_CLASSTYPE (e.g. 
             * PDO::FETCH_CLASS | PDO::FETCH_CLASSTYPE) then the name of the class is determined from a value 
             * of the first column.
             */
            $result = $statement->fetchAll(PDO::FETCH_CLASS, $obj);
            self::disconnect();
            if (is_array($result) && count($result) > 0) {
                return $result;
            }
            return false;
        }
        self::disconnect();
        return false;
    }


    /**
     * Method readDB
     * Read from db params are the query and array of params for query and obj to return.
     * Will parse the data to object.
     */
    public function readDB($query, $data_array = [])
    {
        self::connect();
        $statement = self::$connection->prepare($query);
        $check = $statement->execute($data_array);

        if ($check) {
            /**
             * PDO::FETCH_OBJ : returns an anonymous object with property names that correspond 
             * to the column names returned in your result
             */
            $result = $statement->fetchAll(PDO::FETCH_OBJ);
            self::disconnect();
            if (is_array($result) && count($result) > 0) {
                return $result;
            }
            return false;
        }
        self::disconnect();
        return false;
    }

}
