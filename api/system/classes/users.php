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
    if (self::$obj == null)
      self::$obj = new users;
    return self::$obj;
  }
  public function getRemainingAds()
  {
    return $this->remaining_ads;
  }
  public function getPrivateSharedKey()
  {
    return $this->privateSharedKey;
  }
  public function getRefreshToken()
  {
    return $this->refreshToken;
  }
  public function getUuid()
  {
    return $this->uuid;
  }
  public function getRule()
  {
    return $this->rule;
  }
  public function getPrompt()
  {
    return $this->uuid;
  }
  public function getLast_name()
  {
    return $this->last_name;
  }
  public function getMail()
  {
    return $this->mail;
  }
  public function getFirst_name()
  {
    return $this->first_name;
  }
  public function getPhone()
  {
    return $this->phone;
  }
  public function getCreate_time()
  {
    return $this->approval_status;
  }
  public function getPassword()
  {
    return $this->password;
  }
  public function getViews()
  {
    return $this->views;
  }
  public function getLast_seen()
  {
    return $this->last_seen;
  }
}
