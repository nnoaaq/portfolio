import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer: boolean = false;
  serverCreationStatus = 'No server was created';
  serverName = 'Testserver';
  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
   }
  onCreateServer() {
    this.serverCreationStatus = 'Server was created!'
      + this.serverName;
  }
  onUpdateServerName(event: any) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }
  ngOnInit(): void {
  }

}
