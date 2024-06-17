import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/interfaces/products-interface';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  variantForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private fb: FormBuilder
  ) {
    this.variantForm = this.fb.group({
      variants: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe((product) => {
      console.log(product);
      this.product = product;
      this.setVariants(product);
    });
  }

  get variants() {
    return this.variantForm.get('variants') as FormArray;
  }

  setVariants(product: Product) {
    if (product.variants) {
      product.variants.forEach((variant) => {
        this.variants.push(
          this.fb.group({
            size: [variant.size, Validators.required],
            color: [variant.color, Validators.required],
            quantity: [
              1,
              [
                Validators.required,
                Validators.min(1),
                Validators.max(variant.stock),
              ],
            ],
          })
        );
      });
    }
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product, this.variantForm.value.variants);
      alert('Product has been added');
    }
  }
}
