import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GestionUser';
  currentUser: string;
  constructor(
 
   
) {
    this.currentUser = localStorage.getItem('role');
   
   // console.log("je suis",this.currentUser);
}
}
