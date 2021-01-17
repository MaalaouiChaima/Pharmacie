import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../login/myservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: string;
  admin:boolean;
  pharmacien:boolean;
  constructor(private Userservice : MyserviceService,private route:Router) { }

  ngOnInit() {
    this.currentUser=localStorage.getItem('role');
    if(this.currentUser=="Administrator")
    {this.admin=true;}
    else if(this.currentUser=="Pharmacien")
    {this.pharmacien=true;}
     console.log("je suis",this.currentUser);
  }



  onSubmit()  
  {    this.route.navigate(['login']);
      this.Userservice.removeToken();
   
  }

}
