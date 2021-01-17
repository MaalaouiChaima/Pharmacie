import { Component, OnInit } from '@angular/core';
import { LaboratoireService } from '../sharedL/laboratoire.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-laboratoire',
  templateUrl: './laboratoire.component.html',
  styleUrls: ['./laboratoire.component.css']
})
export class LaboratoireComponent implements OnInit {

 
  Laboratoires: any = [];
  currentUser: string;
  admin:boolean;
  pharmacien:boolean;
  constructor(private laboratoireService : LaboratoireService ,private router: Router) { }

  ngOnInit() {

    this.resetForm();

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

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.laboratoireService.selectedLaboratoire = {
      ID: null,
      NAMEL: '',
      DESCRIPTIONS: '',
      MAIL :' ',
      PHONE :'',
      CITY:'',   
      CODEPOSTAL :'',
    
    }
  } 

  onSubmit(form: NgForm) {
    
  if (this.laboratoireService.selectedLaboratoire.NAMEL.length==0 || this.laboratoireService.selectedLaboratoire.DESCRIPTIONS.length==0 ||this.laboratoireService.selectedLaboratoire.MAIL.length==0 ||this.laboratoireService.selectedLaboratoire.PHONE.length==0||this.laboratoireService.selectedLaboratoire.CITY.length==0 )
  {window.confirm("tous les champs sont obligatoire");}
  else{ 
    if (this.laboratoireService.selectedLaboratoire.ID == null) {
      this.laboratoireService.postLaboratoire(this.laboratoireService.selectedLaboratoire)
        .subscribe(data => {
          //this.resetForm(form);
          this.router.navigate(['/laboratoires'])
        })}}
}

}
