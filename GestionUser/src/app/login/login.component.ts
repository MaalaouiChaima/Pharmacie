import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';  
import { MyserviceService } from './myservice.service'  
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;  
  successmsg: any;  
  errmsg: any;  
  constructor(private Userservice : MyserviceService,private route:Router) { }  
  ngOnInit() {  
    this.form = new FormGroup({  
      username: new FormControl('', [Validators.required]),   
      password: new FormControl('', [Validators.required, Validators.minLength(1)]),  
      grant_type: new FormControl('password'),  
     }); 
  
  }
     onSubmit()  
     {     
         this.Userservice.postData(this.form.value)  
                        .subscribe(res => {    
                          if (res.status === 200) { 
                           this.successmsg = 'token - ' + res.body.access_token; 
                           console.log(   this.successmsg = 'token - ' + res.body.access_token );                                                                                    localStorage.setItem('access_token', res.body.access_token);  
                          this.Userservice.storeToken(res.body.access_token,res.body.role);
                          this.route.navigate(['home']);
                          } else {  
                             this.errmsg = res.status + ' - ' + res.statusText;  
                            console.log(res.status + ' - ' + res.statusText);
                             }  
                            },  
                          err => {                                 
                           if (err.status === 401  ) {  
                             this.errmsg = 'Invalid username or password.'; 
                             console.log( 'Invalid username or password.');   
                              }   
                             else if (err.status === 400  ) {  
                             this.errmsg = 'Invalid username or password.';  
                             console.log( 'Invalid username or password.');  
                             }   
                             else {  
                             this.errmsg ="Invalid username or password"; 
                             console.log("Invalid username or password");  
                              }  
                           });  
           }   
   }  