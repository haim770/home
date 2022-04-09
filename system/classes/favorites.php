<?php
class favorites
{
  private string $favorite_id;
  private string $create_time;
  private string $user_id;
  private string $AdId;

  protected function getFavorite_id()
  {
    return $this->favorite_id;
  }
  protected function getCreate_time()
  {
    return $this->create_time;
  }
  protected function getUser_id()
  {
    return $this->User_id;
  }
  protected function getAdId()
  {
    return $this->AdId;
  }
}
