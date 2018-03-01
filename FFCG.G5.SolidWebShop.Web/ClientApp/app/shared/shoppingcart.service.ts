import { Component } from '@angular/core'
import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { IProduct } from '../models/product'
import { Subject } from 'rxjs/Subject'

@Injectable()
export class ShoppingcartService {
  private products: IProduct[]

  private cartChangedSource = new Subject<number>()
  cartChanged$ = this.cartChangedSource.asObservable()

  constructor() {
    this.products = []
  }

  getProducts(): IProduct[] {
    return this.products
  }

  addToCart(product: IProduct) {
    this.products.push(product)
    this.notifyThatCartChanged()
  }

  removeFromCart(product: IProduct) {
    this.products.splice(this.products.indexOf(product), 1)
    this.notifyThatCartChanged()
  }

  private notifyThatCartChanged(): void {
    this.cartChangedSource.next(this.products.length)
  }
}
