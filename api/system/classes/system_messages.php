<?php
class system_messages
{
  private string $msgId;
  private string $message_content;
  private string $userId;
  private string $create_time;
  private int $seen;

  protected function getMsgId()
  {
    return $this->msgId;
  }
  protected function getMessage_content()
  {
    return $this->message_content;
  }
  protected function getUserId()
  {
    return $this->userId;
  }
  protected function getCreate_time()
  {
    return $this->create_time;
  }
  protected function getSeen()
  {
    return $this->seen;
  }
}
