import { Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { Create_Product } from '../../contracts/product/create_product';
import { HttpErrorResponse } from '@angular/common/http';
// import {} from '../../contracts/product/';
import {Response_List_Product} from '../../contracts/product/list-response-product'


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClientService) { }

  createProduct(product: Create_Product, successCallBack?: ()=> void, errorCallback?: (errorMessage:string) => void) {
      this.httpClient.post({
        controller: "products"
      }, product).subscribe(result => {
        successCallBack?.();
      }, (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
        let message = "";
        _error.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}<br>`;
          });
        });
        errorCallback?.(message);
      });
  }

  //eksik çalışıyor bakılacak https://www.youtube.com/watch?v=Nj2EUE5sn_4&list=PLQVXoXFVVtp1DFmoTL4cPTWEWiqndKexZ&index=21
  async read(page: number = 0, size: number = 5,successCallBack?:()=>void,errorCallback?: (errorMessage: string) => void):Promise<any> {
    const promiseData: Promise<any> = this.httpClient.get<Response_List_Product>({
      controller: "products",
      queryString: `page=${page}&size=${size}`
    }).toPromise();
    console.log("promiseData",promiseData);
    return await promiseData;
  }
}
