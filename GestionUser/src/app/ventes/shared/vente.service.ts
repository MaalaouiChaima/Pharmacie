import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Vente } from './vente.model';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json',"Access-Control-Allow-Origin": "http://localhost:4200", 'Authorization': 'Bearer '+localStorage.getItem('token')})
  };
@Injectable({
  providedIn: 'root'
})
export class VenteService {

  readonly apiURL='http://localhost:51118/api/Ventes';
 
  selectedVente : Vente ;
  VenteList : Vente[];

  constructor(private http: HttpClient) { }

  getVenteList(){
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer '+localStorage.getItem('token') })
    };
    return this.http.get(this.apiURL+'/ListVente',httpOptions);
    //.toPromise().then(res=>this.customerList=res as Customer[]);
  
 }

 getVenteByID(id : number){
  let httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Bearer '+localStorage.getItem('token') })
  };
  return this.http.get(this.apiURL+'/InfoVente/'+id,httpOptions);
 }

 postVente(selectedVente: Vente){
  let httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Bearer '+localStorage.getItem('token') })
  };
  // return this.http.post(this.apiURL, cust);
  return this.http.post(this.apiURL+'/Ajouter',selectedVente,httpOptions);
  }

  putVente(id:number ,vente : Vente){
    return this.http.put(this.apiURL+'/Update',vente,httpOptions);
     
   }
  
   deleteVente(id : number){
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer '+localStorage.getItem('token') })
    };
    return this.http.delete(this.apiURL+'/Delete/'+id,httpOptions);
   }

}
