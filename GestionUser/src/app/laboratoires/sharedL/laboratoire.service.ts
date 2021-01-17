import { Injectable } from '@angular/core';
import { Laboratoire } from './laboratoire.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json',"Access-Control-Allow-Origin": "http://localhost:4200", 'Authorization': 'Bearer '+localStorage.getItem('token')})
  };

@Injectable({
  providedIn: 'root'
})
export class LaboratoireService {

  readonly apiURL='http://localhost:51118/api/Laboratoire';
 
  
  laboratoireList : Laboratoire[];
  selectedLaboratoire : Laboratoire ;

  constructor(private http: HttpClient) { }

  getLaboratoireList(){
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer '+localStorage.getItem('token') })
    };

    return this.http.get(this.apiURL+'/ListLaboratoire',httpOptions);
    //.toPromise().then(res=>this.customerList=res as Customer[]);
  
 }

 getLaboratoireByID(id : number){
  let httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Bearer '+localStorage.getItem('token') })
  };
  return this.http.get(this.apiURL+'/InfoLaboratoire/'+id,httpOptions);
 }

 postLaboratoire(selectedLaboratoire: Laboratoire){
  // return this.http.post(this.apiURL, cust);
  let httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Bearer '+localStorage.getItem('token') })
  };
  return this.http.post(this.apiURL+'/Ajouter',selectedLaboratoire,httpOptions);
  }

  putLaboratoire(id:number ,user : Laboratoire){
    return this.http.put(this.apiURL+'/Update',user,httpOptions);
     
   }
  
   deleteLaboratoire(id : number){
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer '+localStorage.getItem('token') })
    };
    return this.http.delete(this.apiURL+'/Delete/'+id,httpOptions);
   }
}
