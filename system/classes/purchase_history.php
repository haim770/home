<?php
class purchase_history
{
  private string $purchase_id;
  private string $packageId;
  private string $userId;
  private string $purchase_time;
  private float $price;
  protected function getPurchase_id()
  {
    return $this->purchase_id;
  }
  protected function getPackageId()
  {
    return $this->packageId;
  }
  protected function getUserId()
  {
    return $this->userId;
  }
  protected function getPurchase_time()
  {
    return $this->purchase_time;
  }
  protected function getPrice()
  {
    return $this->price;
  }
}
