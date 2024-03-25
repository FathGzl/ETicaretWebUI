import { Injectable } from '@angular/core';
declare var alertify:any

@Injectable({
  providedIn: 'root'
})

export class AlertifyService {

  constructor() { }

  message(message:string,messageType:MessageType,positionType:PositionType,delay:number=3,dismissOthhers:boolean=false){
    alertify.set("notifier","delay",delay);
    alertify.set("notifier","position",positionType);
    const msj=alertify[messageType](message);
    if(dismissOthhers)
      msj.dismissOthhers();
  }

  dismiss(){
    alertify.dismissAll();
  }
}


export enum MessageType
{
  Error="error",
  Message="message",
  Notify="notify",
  Success="success",
  Warning="warning"

}

export enum PositionType
{
  TopRight="top-right",
  TopCenter="top-center",
  TopLeft="top-left",
  BottomRight="bottom-right",
  BottomCenter="bottom-center",
  BottomLeft="bottom-left",


}