import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/products-interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  sortAscending: boolean = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      console.log(products);
      this.products = products;
    });
  }

  sortByPrice(): void {
    this.products.sort((a, b) =>
      this.sortAscending ? a.price - b.price : b.price - a.price
    );
    this.sortAscending = !this.sortAscending;
  }
}
