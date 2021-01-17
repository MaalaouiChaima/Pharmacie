import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../sharedC/commande.service';
import { LaboratoireService } from 'src/app/laboratoires/sharedL/laboratoire.service';
import { Router } from '@angular/router';
import { ProduitService } from 'src/app/produits/sharedP/produit.service';
import { Commande } from '../sharedC/commande.model';

@Component({
  selector: 'app-commande-list',
  templateUrl: './commande-list.component.html',
  styleUrls: ['./commande-list.component.css']
})
export class CommandeListComponent implements OnInit {
  Commandes: any = [];
  searchText;
  config: any;
  currentUser: string;
  admin:boolean;
  pharmacien:boolean;
  constructor(private commandeService:CommandeService , private router: Router) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.Commandes.count
    };
   }

  ngOnInit() {
  
    this.commandeService.getCommandeList().subscribe(res=>{
      console.log("test => ",res);
     
      this.Commandes = res;
   
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

    populateForm(us: Commande) {
      this.commandeService.selectedCommande = Object.assign({}, us);
    }
    onAddCommande(){
      this.router.navigate(['/commandes/add'])
    }
    onUpdateCommande(id: number){
      this.router.navigate(['/commande/edit/'+id]);
    }
  
    onDelete(id: number) {
      if (confirm('Are you sure to delete this record?')) {
        this.commandeService.deleteCommande(id).subscribe(res => {
  
          console.log("delete commande => ",res);
  
          this.commandeService.getCommandeList().subscribe(res=>{
            console.log("test => ",res);
            this.Commandes = res;
          });
        });
      }
    }
  
  }



