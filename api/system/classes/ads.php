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
  {//get active
    return $this->active;
  }
  protected function getAdId()
  {//get id
    return $this->adId;
  }
  protected function getCreate_time()
  {//get creation time
    return $this->create_time;
  }
  protected function getUser_id()
  {//get user id
    return $this->User_id;
  }
  protected function getClose_reason()
  {//get close reason
    return $this->close_reason;
  }
  protected function getExpire_date()
  {//get expire date
    return $this->expire_date;
  }
  protected function getApproval_status()
  {//get approval status
    return $this->approval_status;
  }
  protected function getAd_link()
  {//get ad link
    return $this->ad_link;
  }
  protected function getViews()
  {//get views
    return $this->views;
  }
  protected function getContact_counter()
  {//get contact counter
    return $this->contact_counter;
  }
}
