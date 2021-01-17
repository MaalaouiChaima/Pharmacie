import { Component, OnInit } from '@angular/core';
import { StockService } from '../sharedS/stock.service';
import { Router } from '@angular/router';
import { Stock } from '../sharedS/stock.model';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  Stocks: any = [];
  searchText;
  config: any;
  currentUser: string;
  admin:boolean;
  pharmacien:boolean;
  constructor(private stockService:StockService , private router: Router) { 
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.Stocks.count
    };
  }

  ngOnInit() {
    this.stockService.getStockList().subscribe(res=>{
      console.log("test => ",res);
     
      this.Stocks = res;
   });
   this.currentUser=localStorage.getItem('role');
   if(this.currentUser=="Administrator")
   {this.admin=true;}
   else if(this.currentUser=="Pharmacien")
   {this.pharmacien=true;}
    console.log("je suis",this.currentUser);
   
  }

   pageChanged(event){
    this.config.currentPage = event;
  }

   populateForm(us: Stock) {
    this.stockService.selectedStock = Object.assign({}, us);
  }

}
