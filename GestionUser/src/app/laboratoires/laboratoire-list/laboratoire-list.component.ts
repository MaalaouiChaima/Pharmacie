import { Component, OnInit } from '@angular/core';
import { LaboratoireService } from '../sharedL/laboratoire.service';
import { Router } from '@angular/router';
import { Laboratoire } from '../sharedL/laboratoire.model';

@Component({
  selector: 'app-laboratoire-list',
  templateUrl: './laboratoire-list.component.html',
  styleUrls: ['./laboratoire-list.component.css']
})
export class LaboratoireListComponent implements OnInit {
  Laboratoires: any = [];
  searchText;
  config: any;
  currentUser: string;
  admin:boolean;
  pharmacien:boolean;
  constructor(private laboratoireService:LaboratoireService , private router: Router) { 
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.Laboratoires.count
    };
  }

  ngOnInit() {
    this.laboratoireService.getLaboratoireList().subscribe(res=>{
      console.log("test => ",res);
      this.Laboratoires = res;
     
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

  populateForm(us: Laboratoire) {
    this.laboratoireService.selectedLaboratoire = Object.assign({}, us);
  }
  onAddLaboratoire(){
    this.router.navigate(['/laboratoires/add'])
  }
  onUpdatelaboratoire(id: number){
    this.router.navigate(['/laboratoire/edit/'+id]);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.laboratoireService.deleteLaboratoire(id).subscribe(res => {

        console.log("delete user => ",res);

        this.laboratoireService.getLaboratoireList().subscribe(res=>{
          console.log("test => ",res);
          this.Laboratoires = res;
        });
      });
    }
  }

}
