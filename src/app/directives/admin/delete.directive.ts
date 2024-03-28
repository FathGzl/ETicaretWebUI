import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, HostListener, Input, Output, Renderer2, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeleteDialogComponent, DeleteState } from '../../dialogs/delete-dialog/delete-dialog.component';
import { HttpClientService } from '../../services/common/http-client.service';
import { AlertifyMessageType, AlertifyPositionType, AlertifyService } from '../../services/admin/alertify.service';
import { SpinnerType } from '../../base/base.component';

declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef, private _renderer: Renderer2, private httpClientService: HttpClientService, private spinner: NgxSpinnerService, public dialog: MatDialog,private alertifyService:AlertifyService) {
    const img = this._renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/delete.png");
    img.setAttribute("style", "cursor: pointer");
    img.weigth = 25;
    img.width = 25;
    _renderer.appendChild(element.nativeElement, img)
  }
  @Input() id: string;
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();
  @HostListener("click")
  async onclick() {    
      this.spinner.show(SpinnerType.Timer)
      const td: HTMLTableCellElement = this.element.nativeElement;
      await this.httpClientService.delete({
        controller: this.controller
      }, this.id).subscribe(data => {
        $(td.parentElement)
          .animate({
            opacity: 0,
            left: "+=50",
            height: "toggle",
          }, 700, () => {
            this.callback.emit();
            this.alertifyService.message("Ürün silindi",{
              dismissOthers:true,
              messageType:AlertifyMessageType.Success,
              positionType:AlertifyPositionType.BottomRight
            })
          });
      },(errorResponse:HttpErrorResponse)=>{
        this.spinner.hide(SpinnerType.Timer);
        this.alertifyService.message("Ürün silinemedi",{
          dismissOthers:true,
          messageType:AlertifyMessageType.Error,
          positionType:AlertifyPositionType.BottomRight
        });
      });    
  }
}