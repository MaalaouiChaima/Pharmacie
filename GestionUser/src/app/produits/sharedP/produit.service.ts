import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Produit } from './produit.model';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json',"Access-Control-Allow-Origin": "http://localhost:4200", 'Authorization': 'Bearer '+localStorage.getItem('token')})
  };
@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  readonly apiURL='http://localhost:51118/api/Produits';
 
  selectedProduit : Produit ;
  produitList : Produit[];
  constructor(private http: HttpClient) { }

  getProduitList(){
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer '+localStorage.getItem('token') })
    };
    return this.http.get(this.apiURL+'/ListProduits',httpOptions);
   
  
 }

 getProduitByID(id : number){
  let httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Bearer '+localStorage.getItem('token') })
  };
  return this.http.get(this.apiURL+'/InfoProduit/'+id,httpOptions);
 }

 postProduit(selectedProduit: Produit){
  let httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Bearer '+localStorage.getItem('token') })
  };
 
  return this.http.post(this.apiURL+'/Ajouter',selectedProduit,httpOptions);
  }

  putProduit(id:number ,produit : Produit){
    return this.http.put(this.apiURL+'/Update',produit,httpOptions);
     
   }
  
   deleteProduit(id : number){
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer '+localStorage.getItem('token') })
    };
    return this.http.delete(this.apiURL+'/Delete/'+id,httpOptions);
   }

}
