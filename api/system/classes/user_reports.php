
<?php
class user_reports
{
  private string $element_id;
  private string $create_time;
  private string $user_id;
  private bool $active;
  private string $report_id;
  private string $report_reason;
  private string $manage_feedback;
  private string $title;
  private string $content;
  
  protected function getActive()
  {
    return $this->active;
  }
  protected function getElement_id()
  {
    return $this->element_id;
  }
  protected function getCreate_time()
  {
    return $this->create_time;
  }
  protected function getUser_id()
  {
    return $this->User_id;
  }
  protected function getManage_feedback()
  {
    return $this->manage_feedback;
  }
  protected function getTitle()
  {
    return $this->title;
  }
  protected function getContent()
  {
    return $this->content;
  }
  protected function getReport_reason()
  {
    return $this->report_reason;
  }
  protected function getReport_id()
  {
    return $this->report_id;
  }
}
?>