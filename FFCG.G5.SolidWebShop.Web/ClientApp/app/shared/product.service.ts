import { Injectable, Inject } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { ORIGIN_URL } from './constants/baseurl.constants';
import { IProduct } from '../models/Product';
import { TransferHttp } from '../../modules/transfer-http/transfer-http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {
  constructor(
    private transferHttp: TransferHttp, // Use only for GETS that you want re-used between Server render -> Client render
    private http: Http, // Use for everything else
    @Inject(ORIGIN_URL) private baseUrl: string) {

  }

  getProducts(): Observable<[IProduct]> {
    return Observable.of(this.getMockProducts());
  }

  private getMockProducts(): [IProduct] {
    return [
      {
        name: 'Cat',
        imageUrl: 'https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-4-57b30a939dff5__605.jpg',
        price: 200,
        description: 'This is a cute cat.'
      },
      {
        name: 'Cat',
        imageUrl: 'https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-4-57b30a939dff5__605.jpg',
        price: 200,
        description: 'This is a cute cat.'
      },
      {
        name: 'Cat',
        imageUrl: 'https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-4-57b30a939dff5__605.jpg',
        price: 200,
        description: 'This is a cute cat.'
      },
      {
        name: 'Cat',
        imageUrl: 'https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-4-57b30a939dff5__605.jpg',
        price: 200,
        description: 'This is a cute cat.'
      },
      {
        name: 'Cat',
        imageUrl: 'https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-4-57b30a939dff5__605.jpg',
        price: 200,
        description: 'This is a cute cat.'
      }
    ];
  }
}
