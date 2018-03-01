import { Component } from '@angular/core';
import { ShoppingcartService } from '../../shared/shoppingcart.service'

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})

export class NavMenuComponent {
    collapse: string = "collapse"
    public numberOfProductsAdded: number

  constructor(shoppingcartService: ShoppingcartService) {
    shoppingcartService.cartChanged$.subscribe(
      numberOfProducts => {
        this.numberOfProductsAdded = numberOfProducts
      }
    )
  }

    collapseNavbar(): void {
        if (this.collapse.length > 1) {
            this.collapse = ""
        } else {
            this.collapse = "collapse"
        }
    }

    collapseMenu() {
        this.collapse = "collapse"
    }
}
