import { Component, OnInit } from '@angular/core';
import { firestore } from 'firebase';
import { send } from 'process';
import { AuthService } from 'src/app/auth/auth.service';
import { Database } from 'src/app/database.service';
import { Chat, Message } from 'src/app/interfaces/Chat';
import { User } from 'src/app/interfaces/User';
import { Worker } from 'src/app/interfaces/Worker';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messages: Message[];
  currentChat: Chat;
  user: User;
  userId: string;
  users: User[];
  selectedUserID: string;
  chatName: string;
  sendingMessage: string = '';

  constructor(
    private db: Database,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.messages = [];
    this.sendingMessage = '';
    this.userId = this.auth.getUserId;
    this.db.getUser(this.auth.getUserId).subscribe(u => this.user === u as User);
    this.db.getUsers().subscribe(us => this.users = us.filter(u => u.id !== this.auth.getUserId) as User[]);
  }

  changeUser() {
    this.db.getChatByIDs(this.auth.getUserId, this.selectedUserID).subscribe(messages => {
      const resp = messages as Chat[];
      this.currentChat = resp.find(m => m.members.every(me => me === this.auth.getUserId || me === this.selectedUserID));
      if(this.currentChat) {
        this.messages = this.currentChat.msg;
      } else {
        this.messages = [];
      }
      this.chatName = this.users.find(w => w.id === this.selectedUserID).displayName;
    });
  }

  sendMessage() {
    const tempMsg = this.sendingMessage;
    this.sendingMessage = '';
    const sendData = {
      members: [
        this.auth.getUserId,
        this.selectedUserID
      ],
      msg: [
        {
          date: firestore.Timestamp.now(),
          message: tempMsg,
          sender: this.auth.getUserId
        }
      ]
    };
    if(!this.currentChat) {
      this.db.createNewChat(sendData);
    } else {
      sendData.msg = this.currentChat.msg.concat(sendData.msg);
      this.db.updateChat(this.currentChat.cID, sendData);
    }
  }

}
