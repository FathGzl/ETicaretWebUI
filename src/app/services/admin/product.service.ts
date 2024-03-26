import { Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { Create_Product } from '../../contracts/product/create_product';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClientService) { }

  createProduct(product: Create_Product, successCallBack?: any, errorCallback?: any) {
      this.httpClient.post({
        controller: "products"
      }, product).subscribe(result => {
        successCallBack();
      }, (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
        let message = "";
        _error.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}<br>`;
          });
        });
        errorCallback(message);
      });
  }
}
