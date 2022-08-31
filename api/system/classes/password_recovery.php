<?php
class password_recovery
{
  private int $id;
  private string $userMail;
  private string $token;
  private string $exp_date;
  protected function getId()
  {
  //get id
    return $this->id;
  }
  protected function getUserMail()
  {
  //get userMail
    return $this->userMail;
  }
  protected function getToken()
  {
  //getToken
    return $this->token;
  }
  protected function getExp_date()
  {
  //get EXPIRE DATE
    return $this->exp_date;
  }
}
