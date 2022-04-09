<?php
class package
{
  private string $packageId;
  private string $create_time;
  private string $user_id;
  private bool $is_active;
  private string  $title;
  private int $ad_value;
  private string $content;
  private string $life_cycle;
  private float $price;
  private string $update_time;
  protected function getTitle()
  {
    return $this->title;
  }
  protected function getIs_active()
  {
    return $this->is_active;
  }
  protected function getPackageId()
  {
    return $this->packageId;
  }
  protected function getLife_cycle()
  {
    return $this->life_cycle;
  }
  protected function getCreate_time()
  {
    return $this->create_time;
  }
  protected function getContent()
  {
    return $this->content;
  }
  protected function getUpdate_time()
  {
    return $this->update_time;
  }
  protected function getPrice()
  {
    return $this->price;
  }
  protected function getAd_link()
  {
    return $this->ad_link;
  }
  protected function getAd_value()
  {
    return $this->ad_value;
  }
}
