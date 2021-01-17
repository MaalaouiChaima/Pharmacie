import { Injectable } from '@angular/core';
import { Commande } from './commande.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json',"Access-Control-Allow-Origin": "http://localhost:4200", 'Authorization': 'Bearer '+localStorage.getItem('token')})
  };

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  readonly apiURL='http://localhost:51118/api/Commandes';
  selectedCommande : Commande ;
  commandeList : Commande[];
  constructor(private http: HttpClient) { }


  getCommandeList(){
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer '+localStorage.getItem('token') })
    };

    return this.http.get(this.apiURL+'/ListCommande',httpOptions);
    //.toPromise().then(res=>this.customerList=res as Customer[]);
  
 }

 getCommandeByID(id : number){
  let httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Bearer '+localStorage.getItem('token') })
  };
  return this.http.get(this.apiURL+'/InfoCommande/'+id,httpOptions);
 }

 postCommande(selectedCommande: Commande){
  let httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Bearer '+localStorage.getItem('token') })
  };
  // return this.http.post(this.apiURL, cust);
  return this.http.post(this.apiURL+'/Ajouter',selectedCommande,httpOptions);
  }

  putCommande(id:number ,commande : Commande){
    return this.http.put(this.apiURL+'/Update',commande,httpOptions);
     
   }
  
   deleteCommande(id : number){
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer '+localStorage.getItem('token') })
    };
    return this.http.delete(this.apiURL+'/Delete/'+id,httpOptions);
   }
}
