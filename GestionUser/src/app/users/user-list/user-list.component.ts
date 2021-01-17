import { Component, OnInit } from '@angular/core';
import{UserService} from '../shared/user.service'
import { Router } from '@angular/router';
import { User } from '../shared/user.model';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  searchText;
  Users: any = [];
  config: any;
  currentUser: string;
  admin:boolean;
  pharmacien:boolean;
  constructor(private userService:UserService , private router: Router) { 
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.Users.count
    };
  }

  ngOnInit() {

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

  pageChanged(event){
    this.config.currentPage = event;
  }

  

  

  populateForm(us: User) {
    this.userService.selectedUser = Object.assign({}, us);
  }
  onAddUser(){
    this.router.navigate(['/users/add'])
  }
  onUpdateUser(id: number){
    this.router.navigate(['/user/edit/'+id]);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.userService.deleteUser(id).subscribe(res => {

        console.log("delete user => ",res);

        this.userService.getUserList().subscribe(res=>{
          console.log("test => ",res);
          this.Users = res;
        });
      });
    }
  }


}
