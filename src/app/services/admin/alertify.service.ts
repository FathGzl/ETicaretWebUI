import { Injectable } from '@angular/core';
declare var alertify:any

@Injectable({
  providedIn: 'root'
})

export class AlertifyService {

  constructor() { }

  message(message: string,messageType:AlertifyMessageType= AlertifyMessageType.Message,options:Partial<AlertfiyOptions>) {
    alertify.set('notifier','delay',options.delay);
    alertify.set('notifier','position',options.positionType);
    const msj = alertify[messageType](message);
    if (options.dismissOthers) {
      msj.dismissOthers();      
    }
  }

  dismiss(){
    alertify.dismissAll();
  }
}

export class AlertfiyOptions{
  positionType:AlertifyPositionType = AlertifyPositionType.BottomLeft;
  delay:number = 2;
  dismissOthers:boolean = true;
}


export enum AlertifyMessageType
{
  Error = "error",
  Message = "message",
  Success = "success",
  Notify = "notify",
  Warning = "warning"

}

export enum AlertifyPositionType
{
  TopRight="top-right",
  TopCenter="top-center",
  TopLeft="top-left",
  BottomRight="bottom-right",
  BottomCenter="bottom-center",
  BottomLeft="bottom-left",
}