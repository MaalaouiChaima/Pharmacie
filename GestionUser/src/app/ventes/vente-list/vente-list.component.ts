import { Component, OnInit } from '@angular/core';
import { ProduitService } from 'src/app/produits/sharedP/produit.service';
import { VenteService } from '../shared/vente.service';
import { Router } from '@angular/router';
import { Vente } from '../shared/vente.model';

@Component({
  selector: 'app-vente-list',
  templateUrl: './vente-list.component.html',
  styleUrls: ['./vente-list.component.css']
})
export class VenteListComponent implements OnInit {

  Ventes: any = [];
  searchText;
  config: any;
  currentUser: string;
  admin:boolean;
  pharmacien:boolean;
  constructor(private produitService:ProduitService , private router: Router,private venteService:VenteService ) { 
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.Ventes.count
    };
  }

  ngOnInit() {

    this.venteService.getVenteList().subscribe(res=>{
      console.log("testNaj => ",res);
     
      this.Ventes = res;
      console.log("testttt => ", this.Ventes);
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

  populateForm(us: Vente) {
    this.venteService.selectedVente = Object.assign({}, us);
  }
  onAddVente(){
    this.router.navigate(['/ventes/add'])
  }
  onUpdateVente(id: number){
    this.router.navigate(['/vente/edit/'+id]);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.venteService.deleteVente(id).subscribe(res => {

        console.log("delete vente => ",res);

        this.venteService.getVenteList().subscribe(res=>{
          console.log("test => ",res);
          this.Ventes = res;
        });
      });
    }
  }


}
