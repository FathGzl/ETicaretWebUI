import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator,} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { List_Product } from '../../../../contracts/product/list-product';
import { Response_List_Product } from '../../../../contracts/product/list-response-product';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from '../../../../services/admin/product.service';
import { AlertifyMessageType, AlertifyPositionType, AlertifyService } from '../../../../services/admin/alertify.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(spinner:NgxSpinnerService ,private productService:ProductService,private alertify:AlertifyService){
    super(spinner);
  }

  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updatedDate'];
  dataSource = new MatTableDataSource<List_Product>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getProducts() {
    this.showSpinner(SpinnerType.Timer);
    const allProducts : Response_List_Product= await this.productService.read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 20);
    
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length = allProducts.totalCount;
    this.dataSource.paginator = this.paginator;
   }

  async ngOnInit() {
    this.getProducts();
  }
}

