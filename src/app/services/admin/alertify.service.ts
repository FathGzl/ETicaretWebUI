import { Injectable } from '@angular/core';
declare let alertify: any
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  constructor() { }

  message(message: string, options: Partial<AlertifyOptions>): void {
    alertify.set('notifier', 'position', options.positionType);
    alertify.set('notifier', 'delay', options.delay);

    const messageType = options.messageType != null ? options.messageType : AlertifyMessageType.Message;
    const msj = alertify[messageType](message);
    if (options.dismissOthers)
      msj.dismissOthers();
  }
  dismiss() {
      alertify.dismissAll();
  }
}

export class AlertifyOptions {
  messageType: AlertifyMessageType = AlertifyMessageType.Message;
  positionType: AlertifyPositionType = AlertifyPositionType.BottomLeft;
  delay: number = 3
  dismissOthers: boolean = false
};

export enum AlertifyMessageType {
  Error = "error", Message = "message", Notify = "notify", Success = "success", Warning = "warning"
}
export enum AlertifyPositionType {
  TopCenter = "top-center",
  TopRight = "top-right",
  TopLeft = "top-left",
  BottomRight = "bottom-right",
  BottomCenter = "bottom-center",
  BottomLeft = "bottom-left"
}