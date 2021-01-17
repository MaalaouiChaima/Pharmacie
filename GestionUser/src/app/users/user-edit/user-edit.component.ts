import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  currentUser: string;
  admin:boolean;
  pharmacien:boolean;
  user: User = {ID:0,FIRSTNAME:'',LASTNAME:'',CIN:0,CITY:'',PHONE:'',EMAIL:'',BIRTHDAY:null,LOGIN:'',PASSWORD:'',RIB:'',ROLE:''};
  roles : any = ["Administrator","Pharmacien"]

  constructor(private userService:UserService,private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    console.log("id => ",this.route.snapshot.params.id);

    this.userService.getUserByID(this.route.snapshot.params.id).subscribe(res=>{
      console.log("test load => ",res);
      this.user =  res as User;
    });
    this.currentUser=localStorage.getItem('role');
  if(this.currentUser=="Administrator")
  {this.admin=true;}
  else if(this.currentUser=="Pharmacien")
  {this.pharmacien=true;}
   console.log("je suis",this.currentUser);
 
  }


  updateUser(id : number) {
    if(window.confirm('Are you sure, you want to update?')){

      console.log("objet to updated",User);
      if (this.user.FIRSTNAME.length==0 || this.user.LASTNAME.length==0||this.user.CIN.toString().length==0||this.user.PHONE.length==0||this.user.CITY.length==0||this.user.EMAIL.length==0||this.user.LOGIN.length==0||this.user.PASSWORD.length==0||this.user.RIB.length==0)
      {window.confirm("tous les champs sont obligatoire");}
      else{ 
      this.userService.putUser(id,this.user).subscribe(data => {
        this.router.navigate(['/users'])
      })
    }
}}

// Choose city using select dropdown
changeCity(e) {
  console.log("==+> change value => ",e.target.value);
  this.user.ROLE = e.target.value;
  }

}
