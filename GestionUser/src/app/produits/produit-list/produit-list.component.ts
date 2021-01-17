import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../sharedP/produit.service';
import { Router } from '@angular/router';
import { Produit } from '../sharedP/produit.model';
import { LaboratoireService } from 'src/app/laboratoires/sharedL/laboratoire.service';

@Component({
  selector: 'app-produit-list',
  templateUrl: './produit-list.component.html',
  styleUrls: ['./produit-list.component.css']
})
export class ProduitListComponent implements OnInit {
  Produits: any = [];
  searchText;
  config: any;
  currentUser: string;
  admin:boolean;
  pharmacien:boolean;
  constructor(private produitService:ProduitService , private router: Router,private laboratoireService:LaboratoireService) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.Produits.count
    };
   }

  ngOnInit() {
    this.produitService.getProduitList().subscribe(res=>{
      console.log("testNaj => ",res);
     
      this.Produits = res;
      console.log("testttt => ", this.Produits);
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

  populateForm(us: Produit) {
    this.produitService.selectedProduit = Object.assign({}, us);
  }
  onAddProduit(){
    this.router.navigate(['/produits/add'])
  }
  onUpdateProduit(id: number){
    this.router.navigate(['/produit/edit/'+id]);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.produitService.deleteProduit(id).subscribe(res => {

        console.log("delete produit => ",res);

        this.produitService.getProduitList().subscribe(res=>{
          console.log("test => ",res);
          this.Produits = res;
        },error=>{window.confirm(' Ce produit ne peut pas être supprimer car il est lié au stock');});
      });
    }
  }


}
