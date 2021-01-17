import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User}from './user.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json',"Access-Control-Allow-Origin": "http://localhost:4200", 'Authorization': 'Bearer '+localStorage.getItem('token')})
  };
@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly apiURL='http://localhost:51118/api/Utilisateurs';
 
  selectedUser : User ;
  userList : User[];

  constructor(private http: HttpClient) { }

  getUserList(){
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer '+localStorage.getItem('token') })
    };

    return this.http.get(this.apiURL+'/ListUtilisateur',httpOptions);
   
  
 }

 getUserByID(id : number){
  let httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Bearer '+localStorage.getItem('token') })
  };
  return this.http.get(this.apiURL+'/InfoUtilisateur/'+id,httpOptions);
 }

 postUser(selectedUser: User){
  let httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Bearer '+localStorage.getItem('token') })
  };

  return this.http.post(this.apiURL+'/Ajouter',selectedUser,httpOptions);
  }

  putUser(id:number ,user : User){
   

  
    return this.http.put(this.apiURL+'/Update',user,httpOptions);
     
   }
  
   deleteUser(id : number){
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer '+localStorage.getItem('token') })
    };
    return this.http.delete(this.apiURL+'/Delete/'+id,httpOptions);
   }

}
