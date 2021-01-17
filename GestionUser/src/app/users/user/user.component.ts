import { Component, OnInit } from '@angular/core';
import{UserService} from '../shared/user.service'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  roles : any = ["Administrator","Pharmacien"];
  Users: any = [];
  currentUser: string;
  admin:boolean;
  pharmacien:boolean;
  constructor(private userService : UserService ,private router: Router) { }

  ngOnInit() {
  this.resetForm();

  this.userService.getUserList().subscribe(res=>{
    console.log("test => ",res);
    this.Users = res;
  });
  this.currentUser=localStorage.getItem('role');
  if(this.currentUser=="Administrator")
  {this.admin=true;}
  else if(this.currentUser=="Pharmacien")
  {this.pharmacien=true;}
   console.log("je suis",this.currentUser);
 

  }

 resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.userService.selectedUser = {
      ID: null,
      FIRSTNAME: '',
      LASTNAME: '',
      CIN: null,
      BIRTHDAY :null,
      PHONE :' ',
      EMAIL :'',
      CITY:'',
      LOGIN :'',
      PASSWORD :'',
      RIB :'',
      ROLE :''
    
    }
  } 
onSubmit(form: NgForm) {
  if (this.userService.selectedUser.FIRSTNAME.length==0|| this.userService.selectedUser.LASTNAME.length==0||this.userService.selectedUser.CIN.toString().length==0||this.userService.selectedUser.PHONE.length==0||this.userService.selectedUser.CITY.length==0||this.userService.selectedUser.EMAIL.length==0||this.userService.selectedUser.LOGIN.length==0||this.userService.selectedUser.PASSWORD.length==0||this.userService.selectedUser.RIB.length==0||this.userService.selectedUser.ROLE.length==0)
  {window.confirm("tous les champs sont obligatoire");}
  else{ 
    if (this.userService.selectedUser.ID == null) {

      this.userService.postUser(this.userService.selectedUser)
        .subscribe(data => {
          //this.resetForm(form);
          this.router.navigate(['/users'])
        },error=>{window.confirm(' Cet utilisateur existe déja');})}
}
}


changeCity(e) {
  console.log("==+> change value => ",e.target.value);
  this.userService.selectedUser.ROLE = e.target.value;
  }
 /*
  changeUser(e) {
    console.log("==+> change value => ",e.target.value);
    this.userService.selectedUser.ROLE = e.target.value;
    }
*/

}


