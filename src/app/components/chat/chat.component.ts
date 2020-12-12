import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Database } from 'src/app/database.service';
import { Chat } from 'src/app/interfaces/Chat';
import { User } from 'src/app/interfaces/User';
import { Worker } from 'src/app/interfaces/Worker';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messages: Chat[] = [];
  user: User;
  userId: string;
  workers: Worker[];
  selectedWorkerID: string;
  chatName: string;
  sendingMessage: string = '';

  constructor(
    private db: Database,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.userId = this.auth.getUserId;
    this.db.getUser(this.auth.getUserId).subscribe(u => this.user === u as User);
    this.db.getWorkers().subscribe(wl => this.workers = wl as Worker[]);
  }

  changeWorker() {
    this.db.getChatByWorker(this.selectedWorkerID).subscribe(messages => {
      this.chatName = this.workers.find(w => w.wID === this.selectedWorkerID).name;
      if(messages) {
        this.messages = messages['msg'] as Chat[];
      } else {
        this.messages = [];
      }
    });
  }

  sendMessage() {
    console.log(this.sendingMessage);
    this.sendingMessage = '';
  }

}
