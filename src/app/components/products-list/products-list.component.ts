import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from "../../services/product.service";
import {Product} from "../../entities/Product";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.less']
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];
  totalProducts = 0;
  itemsPerPage = 20;
  paginationModel = {
    currentPage: 1
  }

  constructor(
    private productService: ProductService,
    private router: Router) {
  }

  ngOnInit() {


    this.productService.productsBS.subscribe((products: Product[]) => {
      if (!products.length) {
        return;
      }
      this.setPage(0, this.itemsPerPage)
      this.totalProducts = products.length;
    });

    this.productService.filteredProducts.subscribe((products: Product[]) => {
      this.setPage(0, this.itemsPerPage)
      this.totalProducts = products.length;
      this.products = products;
    });
  }

  goToProduct(asin) {
    this.router.navigate(['./products/' + asin]);
  }

  onPageChanged($paginationEvent) {
    const to = $paginationEvent.page * $paginationEvent.itemsPerPage;
    this.setPage(to - $paginationEvent.itemsPerPage, to)
  }

  private setPage(from: number, to: number) {
    this.products = this.productService.productsBS.value.slice(from, to);
  }


}
