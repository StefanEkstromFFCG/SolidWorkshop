import { Component } from '@angular/core';

@Component({
    selector: 'tech',
    templateUrl: './tech.component.html',
    styleUrls: ['./tech.component.css']
})
export class TechComponent {
  public helloString = "Hej";

  public products: [IProduct];

  constructor() {
    this.products = [
      {
        name: 'Cat',
        imageUrl: 'https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-4-57b30a939dff5__605.jpg',
        price: 100,
        description: 'This is a cute cat.'
      },
      {
        name: 'Cat',
        imageUrl: 'https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-4-57b30a939dff5__605.jpg',
        price: 100,
        description: 'This is a cute cat.'
      },
      {
        name: 'Cat',
        imageUrl: 'https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-4-57b30a939dff5__605.jpg',
        price: 100,
        description: 'This is a cute cat.'
      },
      {
        name: 'Cat',
        imageUrl: 'https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-4-57b30a939dff5__605.jpg',
        price: 100,
        description: 'This is a cute cat.'
      },
      {
        name: 'Cat',
        imageUrl: 'https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-4-57b30a939dff5__605.jpg',
        price: 100,
        description: 'This is a cute cat.'
      }
    ]
  }

  addToCart(product: IProduct) {
    console.log('Added ' + product.name + ' to cart.')
  }
}

interface IProduct {
  name: String;
  price: Number;
  description: String;
  imageUrl: String;
}
