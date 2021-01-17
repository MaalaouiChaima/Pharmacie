import { Component, OnInit } from '@angular/core';
import { Vente } from '../shared/vente.model';
import { VenteService } from '../shared/vente.service';
import { ProduitService } from 'src/app/produits/sharedP/produit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from 'src/app/produits/sharedP/produit.model';

@Component({
  selector: 'app-vente-edit',
  templateUrl: './vente-edit.component.html',
  styleUrls: ['./vente-edit.component.css']
})
export class VenteEditComponent implements OnInit {

  vente:Vente ={ID:0,DATEVENTE:null,QUANTITY:'',ID_PRODUCT:0,nomP:'',PRIXVENTE:0};
  Produits:any=[];
  pro:Produit;
  currentUser: string;
  admin:boolean;
  pharmacien:boolean;
  constructor(private produitService:ProduitService,private router: Router,
    private route: ActivatedRoute , private venteService:VenteService) { }

  ngOnInit() {

    console.log("id => ",this.route.snapshot.params.id);

    this.venteService.getVenteByID(this.route.snapshot.params.id).subscribe(res=>{
      console.log("test load by id=> ",res);
      this.vente =  res as Vente;
      console.log("test load by iddd=> ",this.vente);
    });

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

  updateVente(id : number) {
    if(window.confirm('Are you sure, you want to update?')){

      console.log("objet to updated",Vente);
      if (this.vente.DATEVENTE==null || this.vente.QUANTITY.length==0)
      {window.confirm("tous les champs sont obligatoire");}
      else{ 
      this.venteService.putVente(id,this.vente).subscribe(data => {
        this.router.navigate(['/ventes'])
      },error=>{window.confirm(' il n y pas assez de produit en stock');})
    }}}


    changeProd(p) {
      console.log("==+> change value => ",p.target.value);
    
      for (var i = 0; i < this.Produits.length; i++) {
        if(this.Produits[i].NAMEP==p.target.value)
        {this.pro=this.Produits[i];}
      }
      console.log("==+> element recherché => ",this.pro); 
      this.vente.ID_PRODUCT = this.pro.ID;
      console.log("==+> id retrouvé => ",this.pro.ID); 
     
    }
     
     
    }
 







