
<?php
 class user_reports{
    private string $element_id;
    private string $create_time;
    private string $user_id;
    private bool $active;
    private string  $report_id;
    private string $report_reason;
    private string $manage_feedback;
    private string $title;
    private string $content;


    protected function getActive(){
      return $this->active;
    }
    protected function string getElement_id(){
      return $this->element_id;
    }
    protected function string getCreate_time(){
      return $this->create_time;
    }
    protected function string getUser_id (){
      return $this->User_id;
    }
    protected function string getManage_feedback(){
      return $this->manage_feedback;
    }
    protected function string getTitle(){
      return $this->title;
    }
    protected function string getContent(){
      return $this->content;
    } 
    protected function int getReport_reason (){
      return $this->vreport_reason iews;
    }
    protected function string getReport_id(){
      return $this->report_id;
    }
}
?>