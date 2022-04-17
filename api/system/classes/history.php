<?php
class history
{
  private string $history_id;
  private string $create_time;
  private string $user_id;
  private string $AdId;

  protected function getHistory_id()
  {
    return $this->history_id;
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
