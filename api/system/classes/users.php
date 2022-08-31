<?php
class users
{
  private string $uuid = "";
  private string $first_name = "";
  private string $last_name = "";
  private string $phone = "";
  private string $mail = "";
  private string $create_time = "";
  private string $password = "";
  private string $last_seen = "";
  private string $prompt = "";
  private string $rule = "";
  private string $refreshToken = "";
  private string $remaining_ads = "";
  private string $privateSharedKey = "";
  private static $obj;
  /**
   * Return instance of the database.
   */
  public static function GetInstance(): users
  {
  //get the instance 
    if (self::$obj == null)
      self::$obj = new users;
    return self::$obj;
  }
  public function getRemainingAds()
  {//get remaining ads
    return $this->remaining_ads;
  }
  public function getPrivateSharedKey()
  {//get private shared kye
    return $this->privateSharedKey;
  }
  public function getRefreshToken()
  {//get refresh token
    return $this->refreshToken;
  }
  public function getUuid()
  {//get uuid
    return $this->uuid;
  }
  public function getRule()
  {//get user rule
    return $this->rule;
  }
  public function getPrompt()
  {//get user prompt
    return $this->uuid;
  }
  public function getLast_name()
  {//get last name
    return $this->last_name;
  }
  public function getMail()
  {//get mail
    return $this->mail;
  }
  public function getFirst_name()
  {//get first name
    return $this->first_name;
  }
  public function getPhone()
  {//get phone
    return $this->phone;
  }
  public function getCreate_time()
  {//get creation time
    return $this->approval_status;
  }
  public function getPassword()
  {//get password
    return $this->password;
  }
  public function getViews()
  {//get vies
    return $this->views;
  }
  public function getLast_seen()
  {//get last seen
    return $this->last_seen;
  }
}
