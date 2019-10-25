import { Component } from '@angular/core';
import { isNullOrUndefined } from 'util';

import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/components/common/messageservice';

import { DeviceControllerService } from './services/devicecontroller/devicecontroller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  private MonsterBox_Hostname_Cookie: string = "MonsterBox_Hostname";
  MonsterBox_IsConnected: boolean = false;
  delaytimelow: number = 50;
  delaytimehigh: number = 200;
  repetitionslow: number = 5;
  repetitionshigh: number = 10;
  deviceControllerHostName: string;
  deviceEndPoint: string;

  constructor(
    private cookieService: CookieService,
    private messageService: MessageService,
    private deviceControllerService: DeviceControllerService) {
    var cookie = this.cookieService.get(this.MonsterBox_Hostname_Cookie);
    if (!isNullOrUndefined(cookie)) {
      this.deviceControllerHostName = cookie;
    }
  }

  clickedConnect() {
    this.deviceControllerService.SetEndPoint(this.deviceControllerHostName).subscribe(q => {
      this.deviceEndPoint = q;
      this.MonsterBox_IsConnected = true;
      this.cookieService.set(this.MonsterBox_Hostname_Cookie, this.deviceControllerHostName);

    });
  }

  clickedStart() {
    this.deviceControllerService.Start().subscribe(response => {
      if (response == true) {
        this.messageService.add({ key: 'deviceresponse', severity: 'success', summary: 'Start: Accepted' });
      }
      else {
        this.messageService.add({ key: 'deviceresponse', severity: 'error', summary: 'Start: Invalid Response' })
      }
    });
  }

  clickedStop() {
    this.deviceControllerService.Stop().subscribe(response => {
      if (response == true) {
        this.messageService.add({ key: 'deviceresponse', severity: 'success', summary: 'Stop: Accepted' });
      }
      else {
        this.messageService.add({ key: 'deviceresponse', severity: 'error', summary: 'Stop: Invalid Response' })
      }
    });
  }

  changeDelayTimeLow(value) {
    this.deviceControllerService.SetDelayTimeLow(value).subscribe(response => {
      if (response == true) {
        this.messageService.add({ key: 'deviceresponse', severity: 'success', summary: `DelayTimeLow ${value}: Accepted` });
      }
      else {
        this.messageService.add({ key: 'deviceresponse', severity: 'error', summary: 'DelayTimeLow: Invalid Response' })
      }
    });
  }

  changeDelayTimeHigh(value) {
    this.deviceControllerService.SetDelayTimeHigh(value).subscribe(response => {
      if (response == true) {
        this.messageService.add({ key: 'deviceresponse', severity: 'success', summary: `DelayTimeHigh ${value}: Accepted` });
      }
      else {
        this.messageService.add({ key: 'deviceresponse', severity: 'error', summary: 'DelayTimeHigh: Invalid Response' })
      }
    });
  }

  changeRepetitionsLow(value) {
    this.deviceControllerService.SetRepetitionsLow(value).subscribe(response => {
      if (response == true) {
        this.messageService.add({ key: 'deviceresponse', severity: 'success', summary: `RepetitionsLow ${value}: Accepted` });
      }
      else {
        this.messageService.add({ key: 'deviceresponse', severity: 'error', summary: 'RepetitionsLow: Invalid Response' })
      }
    });
  }

  changeRepetitionsHigh(value) {
    this.deviceControllerService.SetRepetitionsHigh(value).subscribe(response => {
      if (response == true) {
        this.messageService.add({ key: 'deviceresponse', severity: 'success', summary: `RepetitionsHigh ${value}: Accepted` });
      }
      else {
        this.messageService.add({ key: 'deviceresponse', severity: 'error', summary: 'RepetitionsHigh: Invalid Response' })
      }
    });
  }

}