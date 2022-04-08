<?php
class messages{
  private string $sender;
	private string $reciever;
	private string $message;
	private string $msgId;
	private string $dateMsg;
  private string $adId;
	private bool $seen;
	private bool $recieved;
	private string $files;
	private bool $delete_reciever;
	private bool $delete_sender;
	private bool $newUpdate;
	public function getNewUpdate(){
		return $this->newUpdate;
	}
  public function getAdId{
    return $this->adId;
  }
	public function getDeleteSender(){
		return $this->deleate_sender;
	}
	public function getDeletereciever(){
		return $this->deleate_reciever;
	}
	public function getSeen(){
		return $this->seen;
	}
	public function getFiles(){
		return $this->files;
	}
	public function getRecieved(){
		return $this->recieved;
	}

	
	public function getSender():int{
		return $this->idSender;
	}
	public function getdateMsg(){
		return $this->dateMsg;
	}
	public function getReciever():int{
		return $this->idRecieve;
	}
	public function getMsgId(){
		return $this->msgId;
		
	}
	public function getMessage(){
		return $this->message;
  }
}


?>