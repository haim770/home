<?php
class ads
{
  private string $adId;
  private string $create_time;
  private string $user_id;
  private bool $active;
  private int $contact_counter;
  private int $views;
  private string $close_reason;
  private string $expire_date;
  private string $approval_status;
  private string $ad_link;
  protected function getActive()
  {
    return $this->active;
  }
  protected function getAdId()
  {
    return $this->adId;
  }
  protected function getCreate_time()
  {
    return $this->create_time;
  }
  protected function getUser_id()
  {
    return $this->User_id;
  }
  protected function getClose_reason()
  {
    return $this->close_reason;
  }
  protected function getExpire_date()
  {
    return $this->expire_date;
  }
  protected function getApproval_status()
  {
    return $this->approval_status;
  }
  protected function getAd_link()
  {
    return $this->ad_link;
  }
  protected function getViews()
  {
    return $this->views;
  }
  protected function getContact_counter()
  {
    return $this->contact_counter;
  }
}
