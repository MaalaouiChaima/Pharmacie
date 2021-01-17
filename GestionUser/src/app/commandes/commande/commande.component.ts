import { Component, OnInit } from '@angular/core';
import { ProduitService } from 'src/app/produits/sharedP/produit.service';
import { LaboratoireService } from 'src/app/laboratoires/sharedL/laboratoire.service';
import { Router } from '@angular/router';
import { CommandeService } from '../sharedC/commande.service';
import { Laboratoire } from 'src/app/laboratoires/sharedL/laboratoire.model';
import { Produit } from 'src/app/produits/sharedP/produit.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
  Laboratoires:any=[] ;
  NOML:Laboratoire;
  NOMP:Produit;
 Produits: any = [];
Commandes :any=[];
lab:Laboratoire;
pro:Produit;
currentUser: string;
admin:boolean;
pharmacien:boolean;
  constructor(private commandeService :CommandeService,private produitService : ProduitService ,private router: Router,private laboratoireService : LaboratoireService) { }

  ngOnInit() {
    this.resetForm();

    this.commandeService.getCommandeList().subscribe(a=>{console.log("ttt=>",a);
 this.Commandes=a;});

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
    this.commandeService.selectedCommande = {
      ID: null,
      DATECOMMANDE : null,
      QUANTITYDEMANDE : '',
      ID_LABORATOIRE :null,
      ID_PRODUCT :null ,
      RECEIVED : 'non',
      QUNTITYRECIEVED : null,
      DATERECEIVED : null,
      NOMP :null ,
      NOML :null ,
   
    
    }
  } 
onSubmit(form: NgForm) {

  if (this.commandeService.selectedCommande.DATECOMMANDE==null|| this.commandeService.selectedCommande.QUANTITYDEMANDE.length==0)
  {window.confirm("tous les champs sont obligatoire");}
  else{ 
    if (this.commandeService.selectedCommande.ID == null) {
      this.commandeService.postCommande(this.commandeService.selectedCommande)
        .subscribe(data => {
          //this.resetForm(form);
          this.router.navigate(['/commandes'])
        })}
      }
}

// Choose city using select dropdown

changeProd(p) {
  console.log("==+> change value => ",p.target.value);

  for (var i = 0; i < this.Produits.length; i++) {
    if(this.Produits[i].NAMEP==p.target.value)
    {this.pro=this.Produits[i];}
  }
  console.log("==+> element recherché => ",this.pro); 
  this.commandeService.selectedCommande.ID_PRODUCT = this.pro.ID;
  console.log("==+> id retrouvé => ",this.pro.ID); 
 
}
   

  changeLabo(l) {
    console.log("==+> nom selectionné => ",l.target.value);

    for (var i = 0; i < this.Laboratoires.length; i++) {
      if(this.Laboratoires[i].NAMEL==l.target.value)
      {this.lab=this.Laboratoires[i];}
    }
    console.log("==+> element recherché => ",this.lab); 
    this.commandeService.selectedCommande.ID_LABORATOIRE = this.lab.ID;
    console.log("==+> id retrouvé => ",this.lab.ID); 
   
  }

}
