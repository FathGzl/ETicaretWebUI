import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { ProductService } from '../../../../services/admin/product.service';
import { Create_Product } from '../../../../contracts/product/create_product';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyMessageType, AlertifyPositionType, AlertifyService } from '../../../../services/admin/alertify.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService,private productService:ProductService,private alertify:AlertifyService ) { 
    super(spinner);
  }

  ngOnInit(): void {

  } 

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerType.Timer)
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);
  
    this.productService.createProduct(create_product, () => {
      this.hideSpinner(SpinnerType.Timer);
      this.alertify.message("Ürün başarıyla eklendi",AlertifyMessageType.Success, {
        dismissOthers: true,
        positionType: AlertifyPositionType.TopRight
      });
    },(errorMessage:any) => {
      this.alertify.message(errorMessage,AlertifyMessageType.Error, {
        dismissOthers: true,
        positionType: AlertifyPositionType.TopRight
      });
    });
  }
}