import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Stock } from './stock.model';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json',"Access-Control-Allow-Origin": "http://localhost:4200"})
  };
@Injectable({
  providedIn: 'root'
})
export class StockService {

  readonly apiURL='http://localhost:51118/api/Stocks';
 
  selectedStock: Stock ;
  stockList : Stock[];

  constructor(private http: HttpClient) { }

  getStockList(){
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer '+localStorage.getItem('token') })
    };

    return this.http.get(this.apiURL+'/ListStocks' ,httpOptions);
    //.toPromise().then(res=>this.customerList=res as Customer[]);
  
 }

 getStockByID(id : number){
  let httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Bearer '+localStorage.getItem('token') })
  };
  return this.http.get(this.apiURL+'/InfoStock/'+id,httpOptions);
 }
}
