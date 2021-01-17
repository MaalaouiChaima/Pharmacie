import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders,HttpParams, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';    
import { getToken } from '@angular/router/src/utils/preactivation';
import { Observable } from 'rxjs';
import { Router } from "@angular/router"; 
@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  constructor(private http: HttpClient) { }
public isAuthenticated():boolean{

  return this.getToken()!==null ;
}

getToken(){
  return localStorage.getItem("token");
}

removeToken(){
  return localStorage.removeItem("token");
}


  postData(data): any {      
    const body = new HttpParams()          
    .set('grant_type', data.grant_type)          
    .set('username', data.username)    
    .set('password', data.password) 
      
    return this.http.post('http://localhost:51118/token', body.toString(), {observe: 'response',    
      headers: { 'Content-Type': 'application/x-www-form-urlencoded','No-Auth':'True'},    
    });  
    
  
  }  
  //store token in local storage
  storeToken(token: string,role: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    
    }


}
