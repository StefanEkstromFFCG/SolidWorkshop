import { Component } from '@angular/core'
import { IProduct } from '../../models/product'
import { ProductService } from '../../shared/product.service'
import { ShoppingcartService } from '../../shared/shoppingcart.service'

@Component({
    selector: 'tech',
    templateUrl: './tech.component.html',
    styleUrls: ['./tech.component.css']
})
export class TechComponent {
  public helloString = "Hej";

  public products: [IProduct];

  constructor(private productService: ProductService, private shoppingCartService: ShoppingcartService) {
    productService.getProducts().subscribe(products => {
      this.products = products;
    })
  }

  addToCart(product: IProduct) {
    this.shoppingCartService.addToCart(product)
  }
}
