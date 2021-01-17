import { Component, OnInit } from '@angular/core';
import { VenteService } from '../shared/vente.service';
import { ProduitService } from 'src/app/produits/sharedP/produit.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Produit } from 'src/app/produits/sharedP/produit.model';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.css']
})
export class VenteComponent implements OnInit {
  Ventes :any=[];
  Produits: any = [];
  pro:Produit;
  currentUser: string;
  admin:boolean;
  pharmacien:boolean;
  constructor(private venteService :VenteService,private produitService : ProduitService ,private router: Router) { }

  ngOnInit() {

    this.resetForm();

    this.venteService.getVenteList().subscribe(a=>{console.log("ttt=>",a);
 this.Ventes=a;});

 
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
    this.venteService.selectedVente = {
      ID: null,
      DATEVENTE : null,
      QUANTITY : '',
      ID_PRODUCT :null,
      nomP :'' ,
      PRIXVENTE : null,
    

    }
  } 
onSubmit(form: NgForm) {
  if (this.venteService.selectedVente.DATEVENTE==null || this.venteService.selectedVente.QUANTITY.length==0)
  {window.confirm("tous les champs sont obligatoire");}
  else{ 
    if (this.venteService.selectedVente.ID == null) {
    
      this.venteService.postVente(this.venteService.selectedVente)
        .subscribe(data => {
          //this.resetForm(form);
          this.router.navigate(['/ventes'])},error=>{window.confirm(' Desoldé, il n y pas assez de produit en stock');})
    }
  }
}



changeProd(p) {
  console.log("==+> change value => ",p.target.value);

  for (var i = 0; i < this.Produits.length; i++) {
    if(this.Produits[i].NAMEP==p.target.value)
    {this.pro=this.Produits[i];}
  }
  console.log("==+> element recherché => ",this.pro); 
  this.venteService.selectedVente.ID_PRODUCT = this.pro.ID;
  console.log("==+> id retrouvé => ",this.pro.ID); 
 
}
 
}
