<?php
class purchase_history{
  private string $purchase_id  ;
private string $packageId ;
private string $userId ;
private string $purchase_time;
private double $price;
protected function int getPurchase_id (){
  return $this->purchase_id ;
}	
protected function string getPackageId (){
  return $this->packageId ;
}	
protected function string getUserId (){
  return $this->userId;
}	
protected function string getPurchase_time(){
  return $this->purchase_time;
}	
protected function double getPrice(){
  return $this->price;
}	


}

?>