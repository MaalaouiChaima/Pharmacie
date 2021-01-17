import { Component, OnInit } from '@angular/core';
import { Commande } from '../sharedC/commande.model';
import { ProduitService } from 'src/app/produits/sharedP/produit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LaboratoireService } from 'src/app/laboratoires/sharedL/laboratoire.service';
import { CommandeService } from '../sharedC/commande.service';
import { Laboratoire } from 'src/app/laboratoires/sharedL/laboratoire.model';
import { Produit } from 'src/app/produits/sharedP/produit.model';

@Component({
  selector: 'app-commande-edit',
  templateUrl: './commande-edit.component.html',
  styleUrls: ['./commande-edit.component.css']
})
export class CommandeEditComponent implements OnInit {

commande:Commande ={ID:0,DATECOMMANDE:null,QUANTITYDEMANDE:'',ID_LABORATOIRE:0,ID_PRODUCT:0,RECEIVED:'',QUNTITYRECIEVED:'',DATERECEIVED:null,NOMP:null,NOML:null};
Laboratoires:any=[] ;
Produits:any=[];
lab:Laboratoire;
pro:Produit;
currentUser: string;
admin:boolean;
pharmacien:boolean;

  constructor(private commandeService:CommandeService,private produitService:ProduitService,private router: Router,
    private route: ActivatedRoute , private laboratoireService:LaboratoireService) { }

  ngOnInit() {

    console.log("id => ",this.route.snapshot.params.id);

    this.commandeService.getCommandeByID(this.route.snapshot.params.id).subscribe(res=>{
      console.log("test load => ",res);
      this.commande =  res as Commande;
    });

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


  updateCommande(id : number) {
    if(window.confirm('Are you sure, you want to update?')){

      console.log("objet to updated",Commande);

      if (this.commande.QUANTITYDEMANDE.length==0||this.commande.RECEIVED.length==0||this.commande.DATERECEIVED.toString().length==0||this.commande.QUNTITYRECIEVED.length==0)
      {window.confirm("tous les champs sont obligatoire");}
      else{ 
      this.commandeService.putCommande(id,this.commande).subscribe(data => {
        this.router.navigate(['/commandes'])
      })
    }}
}


changeLabo(l) {
  console.log("==+> nom selectionné => ",l.target.value);

  for (var i = 0; i < this.Laboratoires.length; i++) {
    if(this.Laboratoires[i].NAMEL==l.target.value)
    {this.lab=this.Laboratoires[i];}
  }
  console.log("==+> element recherché => ",this.lab); 
  this.commande.ID_LABORATOIRE = this.lab.ID;
  console.log("==+> id retrouvé => ",this.lab.ID); 
 
}
  
changeProd(p) {
  console.log("==+> change value => ",p.target.value);

  for (var i = 0; i < this.Produits.length; i++) {
    if(this.Produits[i].NAMEP==p.target.value)
    {this.pro=this.Produits[i];}
  }
  console.log("==+> element recherché => ",this.pro); 
  this.commande.ID_PRODUCT = this.pro.ID;
  console.log("==+> id retrouvé => ",this.pro.ID); 
 
}
     
   /* changeLabo(l) {
      console.log("==+> change value => ",l.target.value);
      this.commande.ID_LABORATOIRE = l.target.value;

}

changeProd(p) {
  console.log("==+> change value => ",p.target.value);
  this.commande.ID_PRODUCT = p.target.value;
  console.log("==+> change valueeee => ",  this.commande);
} */
}
