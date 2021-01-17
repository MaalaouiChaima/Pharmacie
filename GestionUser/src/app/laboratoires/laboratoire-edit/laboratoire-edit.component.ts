import { Component, OnInit } from '@angular/core';
import { Laboratoire } from '../sharedL/laboratoire.model';
import { LaboratoireService } from '../sharedL/laboratoire.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-laboratoire-edit',
  templateUrl: './laboratoire-edit.component.html',
  styleUrls: ['./laboratoire-edit.component.css']
})
export class LaboratoireEditComponent implements OnInit {

  laboratoire: Laboratoire = {ID:0, NAMEL:'',DESCRIPTIONS:'',MAIL:'',PHONE:'',CITY:'',CODEPOSTAL:''};
 
  currentUser: string;
  admin:boolean;
  pharmacien:boolean;
  constructor(private laboratoireService:LaboratoireService,private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    console.log("id => ",this.route.snapshot.params.id);

    this.laboratoireService.getLaboratoireByID(this.route.snapshot.params.id).subscribe(res=>{
      console.log("test load => ",res);
      this.laboratoire =  res as Laboratoire;
    });

    this.currentUser=localStorage.getItem('role');
   if(this.currentUser=="Administrator")
   {this.admin=true;}
   else if(this.currentUser=="Pharmacien")
   {this.pharmacien=true;}
    console.log("je suis",this.currentUser);
  }

  updateLaboratoire(id : number) {
    if(window.confirm('Are you sure, you want to update?')){

      console.log("objet to updated",Laboratoire);
      if (this.laboratoire.NAMEL.length==0  || this.laboratoire.DESCRIPTIONS.length==0||this.laboratoire.MAIL.length==0||this.laboratoire.PHONE.length==0||this.laboratoire.CITY.length==0)
      {window.confirm("tous les champs sont obligatoire");}
      else{ 
      this.laboratoireService.putLaboratoire(id,this.laboratoire).subscribe(data => {
        this.router.navigate(['/laboratoires'])
      })
    }
}}

}
