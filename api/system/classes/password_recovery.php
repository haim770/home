<?php
class password_recovery
{
  private int $id;
  private string $userMail;
  private string $token;
  private string $exp_date;
  protected function getId()
  {
    return $this->id;
  }
  protected function getUserMail()
  {
    return $this->userMail;
  }
  protected function getToken()
  {
    return $this->token;
  }
  protected function getExp_date()
  {
    return $this->exp_date;
  }
}
