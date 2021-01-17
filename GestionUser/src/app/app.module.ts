import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './users/shared/user.service';
import { LaboratoiresComponent } from './laboratoires/laboratoires.component';
import { LaboratoireComponent } from './laboratoires/laboratoire/laboratoire.component';
import { LaboratoireListComponent } from './laboratoires/laboratoire-list/laboratoire-list.component';
import { LaboratoireEditComponent } from './laboratoires/laboratoire-edit/laboratoire-edit.component';
import { LaboratoireService } from './laboratoires/sharedL/laboratoire.service';
import { ProduitsComponent } from './produits/produits.component';
import { ProduitComponent } from './produits/produit/produit.component';
import { ProduitListComponent } from './produits/produit-list/produit-list.component';
import { ProduitEditComponent } from './produits/produit-edit/produit-edit.component';
import { ProduitService } from './produits/sharedP/produit.service';
import { CommandesComponent } from './commandes/commandes.component';
import { CommandeComponent } from './commandes/commande/commande.component';
import { CommandeListComponent } from './commandes/commande-list/commande-list.component';
import { CommandeEditComponent } from './commandes/commande-edit/commande-edit.component';
import { CommandeService } from './commandes/sharedC/commande.service';
import { StocksComponent } from './stocks/stocks.component';
import { StockComponent } from './stocks/stock/stock.component';
import { StockListComponent } from './stocks/stock-list/stock-list.component';
import { StockService } from './stocks/sharedS/stock.service';
import { VentesComponent } from './ventes/ventes.component';
import { VenteComponent } from './ventes/vente/vente.component';
import { VenteListComponent } from './ventes/vente-list/vente-list.component';
import { VenteEditComponent } from './ventes/vente-edit/vente-edit.component';
import { VenteService } from './ventes/shared/vente.service';
import { LoginComponent } from './login/login.component';
import {MyserviceService} from './login/myservice.service';
import { HomeComponent } from './home/home.component';




@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserComponent,
    UserListComponent,
    UserEditComponent,
    LaboratoiresComponent,
    LaboratoireComponent,
    LaboratoireListComponent,
    LaboratoireEditComponent,
    ProduitsComponent,
    ProduitComponent,
    ProduitListComponent,
    ProduitEditComponent,
    CommandesComponent,
    CommandeComponent,
    CommandeListComponent,
    CommandeEditComponent,
    StocksComponent,
    StockComponent,
    StockListComponent,
    VentesComponent,
    VenteComponent,
    VenteListComponent,
    VenteEditComponent,
    LoginComponent,
    HomeComponent,
   
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
     Ng2SearchPipeModule,
     NgxPaginationModule,
     ReactiveFormsModule
  ],

  
  providers: [UserService,LaboratoireService,ProduitService,CommandeService,StockService,VenteService,MyserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
