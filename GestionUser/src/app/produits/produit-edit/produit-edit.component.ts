import { Component, OnInit } from '@angular/core';
import { Produit } from '../sharedP/produit.model';
import { ProduitService } from '../sharedP/produit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LaboratoireService } from 'src/app/laboratoires/sharedL/laboratoire.service';
import { Laboratoire } from 'src/app/laboratoires/sharedL/laboratoire.model';

@Component({
  selector: 'app-produit-edit',
  templateUrl: './produit-edit.component.html',
  styleUrls: ['./produit-edit.component.css']
})
export class ProduitEditComponent implements OnInit {
  lab:Laboratoire;
  produit: Produit = {ID:0,CODECIP:'',NAMEP:'',DESCRIPTIONS:'',DOSAGE:0,IS_ORDONNACE:'',CNAM:'',PRIXACHAT:0,PRIXVENTE:0,ID_LABORATOIR:0,CLASS:'',FORM:'',labo:''};
  Laboratoires:any=[] ;
  classs : any = ["Abatacept","Acarbose","Abciximab","Acamprosate","Paramédicale"];
  forms : any = ["Antalgiques","Anti-inflammatoires","Anesthésie"];
  currentUser: string;
  admin:boolean;
  pharmacien:boolean;
  constructor(private produitService:ProduitService,private router: Router,
    private route: ActivatedRoute , private laboratoireService:LaboratoireService) { }

  ngOnInit() {
    console.log("id => ",this.route.snapshot.params.id);

    this.produitService.getProduitByID(this.route.snapshot.params.id).subscribe(res=>{
      console.log("test load => ",res);
      this.produit =  res as Produit;
    });

    this.laboratoireService.getLaboratoireList().subscribe(r=>{console.log("tt=>",r);
 this.Laboratoires=r;});
 this.currentUser=localStorage.getItem('role');
 if(this.currentUser=="Administrator")
 {this.admin=true;}
 else if(this.currentUser=="Pharmacien")
 {this.pharmacien=true;}
  console.log("je suis",this.currentUser);
    
  }

  updateProduit(id : number) {
    if(window.confirm('Are you sure, you want to update?')){

      console.log("objet to updated", this.produit);
      if (this.produit.CODECIP.length==0 || this.produit.NAMEP.length==0||this.produit.DESCRIPTIONS.length==0||this.produit.DOSAGE.toString().length==0||this.produit.CNAM.length==0||this.produit.IS_ORDONNACE.length==0||this.produit.PRIXACHAT.toString().length==0||this.produit.PRIXVENTE.toString().length==0)
     
      {    console.log("tous les champs sont obligatoire");
        
        window.confirm('tous les champs sont obligatoire');}
      else{ 
      this.produitService.putProduit(id,this.produit).subscribe(data => {
        this.router.navigate(['/produits'])
      })
    }}
}


  changeClass(c) {
    console.log("==+> change value => ",c.target.value);
    this.produit.CLASS = c.target.value;
    }
  
    changeform(e) {
      console.log("==+> change value => ",e.target.value);
      this.produit.FORM = e.target.value;
      }
  
      changeLabo(l) {
        console.log("==+> nom selectionné => ",l.target.value);
    
        
        for (var i = 0; i < this.Laboratoires.length; i++) {
          if(this.Laboratoires[i].NAMEL==l.target.value)
          {this.lab=this.Laboratoires[i];}
        }
        console.log("==+> element recherché => ",this.lab); 
        console.log("==+> id retrouvé => ",this.lab.ID);
        this.produit.ID_LABORATOIR = this.lab.ID;
       
       
      }
     
  /*  changeLabo(l) {
      console.log("==+> change value => ",l.target.value);
      this.produit.ID_LABORATOIR = l.target.value;

} */
}