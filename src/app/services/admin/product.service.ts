import { Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { Create_Product } from '../../contracts/product/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import {Response_List_Product} from '../../contracts/product/list-response-product'
import { Observable, firstValueFrom } from 'rxjs';


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

  async read(
    page: number = 0,
    size: number = 5,
    successCallBack?: ()=> void, 
    errorCallBack?: (errorMessage:string) => void
  ): Promise<Response_List_Product> {
    const result = firstValueFrom(
      this.httpClient.get<Response_List_Product>({
        controller: 'products',
        queryString: `page=${page}&size=${size}`,
      })
    );

    result
      .then((d) => successCallBack?.())
      .catch((err: HttpErrorResponse) => errorCallBack?.(err.message));

    return await result;
  }


  async delete(id: string) {
    const deleteObservable: Observable<any> = this.httpClient.delete<any>({
      controller: "products"
    }, id);
    await firstValueFrom(deleteObservable);
  }
}
