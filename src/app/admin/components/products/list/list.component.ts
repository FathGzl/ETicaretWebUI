import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator,} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { List_Product } from '../../../../contracts/product/list-product';
import { Response_List_Product } from '../../../../contracts/product/list-response-product';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from '../../../../services/admin/product.service';
import { AlertifyMessageType, AlertifyPositionType, AlertifyService } from '../../../../services/admin/alertify.service';
 import {HttpClient, HttpErrorResponse } from '@angular/common/http';

declare var $ : any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(spinner:NgxSpinnerService ,private productService:ProductService,private alertifyService:AlertifyService){
    super(spinner);
  }

  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updatedDate','edit','delete'];
  dataSource = new MatTableDataSource<List_Product>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getProducts() {
    this.showSpinner(SpinnerType.Timer);
    const allProducts = await this.productService.read(
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5,
      () => {
         this.hideSpinner(SpinnerType.Timer);
      },
      (errorMessage:any) => {
         this.alertifyService.message(errorMessage,{
           dismissOthers: true,
           messageType:AlertifyMessageType.Error,
           positionType: AlertifyPositionType.TopRight
         });
      });
    
    this.dataSource = new MatTableDataSource<List_Product>(
      allProducts.products
    );
    this.paginator.length = allProducts.totalCount;

  }


  // async getProducts() {
  //   this.showSpinner(SpinnerType.Timer);
  //   const allProducts = await this.productService.read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 20);
  //   console.log("allProducts",allProducts); 
  //    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
  //   // this.paginator.length = allProducts.totalCount;
  //   // this.dataSource.paginator = this.paginator;
  //  }

  //  delete(id,event){
  //    const img : HTMLImageElement = event.srcElement;
  //  }

  async pageChanged() {
    await this.getProducts();
  }
  
  async ngOnInit() {
    this.getProducts();
  }

  
}

