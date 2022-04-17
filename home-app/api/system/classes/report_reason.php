<?php
class report_reason
{
  private string $reason_id;
  private string $element_type;
  private string $reason_name;
  private string $create_time;
  private bool $active;
  protected function getReason_id()
  {
    return $this->reason_id;
  }
  protected function getElement_type()
  {
    return $this->packageId;
  }
  protected function getReason_name()
  {
    return $this->reason_name;
  }

  protected function getCreate_time()
  {
    return $this->purchase_time;
  }
  protected function getActive()
  {
    return $this->active;
  }
}
