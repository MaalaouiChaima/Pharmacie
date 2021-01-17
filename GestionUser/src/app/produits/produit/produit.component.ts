import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router';
import { ProduitService } from '../sharedP/produit.service';
import { LaboratoireService } from 'src/app/laboratoires/sharedL/laboratoire.service';
import { Laboratoire } from 'src/app/laboratoires/sharedL/laboratoire.model';
@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
   Laboratoires:any=[] ;
   labo:Laboratoire;
   lab:Laboratoire;
   currentUser: string;
   admin:boolean;
   pharmacien:boolean;
 Produits: any = [];
 classs : any = ["Abatacept","Acarbose","Abciximab","Acamprosate","Paramédicale"];
 forms : any = ["Antalgiques","Anti-inflammatoires","Anesthésie"];
  constructor(private produitService : ProduitService ,private router: Router,private laboratoireService : LaboratoireService) { }

  ngOnInit() {
    this.resetForm();

this.laboratoireService.getLaboratoireList().subscribe(r=>{console.log("tt=>",r);
 this.Laboratoires=r;}); 


  this.produitService.getProduitList().subscribe(res=>{
    console.log("test => ",res);
    this.Produits = res;
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
    this.produitService.selectedProduit = {
      ID: null,
      CODECIP : '',
      NAMEP : '',
     DESCRIPTIONS : '',
    DOSAGE :null ,
     IS_ORDONNACE : '',
    CNAM : '',
     PRIXACHAT : null,
    PRIXVENTE :null ,
    ID_LABORATOIR :null ,
    CLASS : '',
    FORM : '',
    labo: null,
    
    }
  } 
onSubmit(form: NgForm) {
  if (this.produitService.selectedProduit.CODECIP.length==0 || this.produitService.selectedProduit.NAMEP.length==0||this.produitService.selectedProduit.DESCRIPTIONS.length==0||this.produitService.selectedProduit.DOSAGE.toString().length==0||this.produitService.selectedProduit.CNAM.length==0||this.produitService.selectedProduit.IS_ORDONNACE.length==0||this.produitService.selectedProduit.PRIXACHAT.toString().length==0||this.produitService.selectedProduit.PRIXVENTE.toString().length==0)
     
  {window.confirm('tous les champs sont obligatoire');}
  else{ 
   if(this.produitService.selectedProduit.ID == null) {
      this.produitService.postProduit(this.produitService.selectedProduit)
        .subscribe(data => {
         
          this.router.navigate(['/produits'])
        },error=>{window.confirm(' Ce produit existe déja');})}
}}


changeClass(c) {
  console.log("==+> change value => ",c.target.value);
  this.produitService.selectedProduit.CLASS = c.target.value;
  }

  changeform(e) {
    console.log("==+> change value => ",e.target.value);
    this.produitService.selectedProduit.FORM = e.target.value;
    }

   
  changeLabo(l) {
    console.log("==+> nom selectionné => ",l.target.value);

    
    for (var i = 0; i < this.Laboratoires.length; i++) {
      if(this.Laboratoires[i].NAMEL==l.target.value)
      {this.lab=this.Laboratoires[i];}
    }
    console.log("==+> element recherché => ",this.lab); 
    this.produitService.selectedProduit.ID_LABORATOIR = this.lab.ID;
    console.log("==+> id retrouvé => ",this.lab.ID); 
   
  }

    

}
