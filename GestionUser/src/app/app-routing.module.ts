import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './users/user/user.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';

import { LaboratoireComponent } from './laboratoires/laboratoire/laboratoire.component';
import { LaboratoireListComponent } from './laboratoires/laboratoire-list/laboratoire-list.component';
import { LaboratoireEditComponent } from './laboratoires/laboratoire-edit/laboratoire-edit.component';

import { ProduitComponent } from './produits/produit/produit.component';
import { ProduitListComponent } from './produits/produit-list/produit-list.component';
import { ProduitEditComponent } from './produits/produit-edit/produit-edit.component';


import { CommandeComponent } from './commandes/commande/commande.component';
import { CommandeListComponent } from './commandes/commande-list/commande-list.component';
import { CommandeEditComponent } from './commandes/commande-edit/commande-edit.component';

import { StockListComponent } from './stocks/stock-list/stock-list.component';

import { VenteComponent } from './ventes/vente/vente.component';
import { VenteListComponent } from './ventes/vente-list/vente-list.component';
import { VenteEditComponent } from './ventes/vente-edit/vente-edit.component';

import { LoginComponent } from './login/login.component';
import{AuthGuard} from './login/auth.guard' ;
import { HomeComponent } from './home/home.component';




const routes: Routes = [

  {path:'', component: LoginComponent },
  {path:'login', component: LoginComponent ,canActivate:[AuthGuard]},

  {path:'home', component: HomeComponent},

  { path: 'users/add', component: UserComponent  ,canActivate:[AuthGuard]},
 { path: 'users', component: UserListComponent ,canActivate:[AuthGuard]},
{ path: '', component: UserListComponent ,canActivate:[AuthGuard] },
  {path:'user/edit/:id', component:UserEditComponent ,canActivate:[AuthGuard]},

  { path: 'laboratoires/add', component: LaboratoireComponent ,canActivate:[AuthGuard] },
  { path: 'laboratoires', component: LaboratoireListComponent ,canActivate:[AuthGuard] },
 { path: '', component: LaboratoireListComponent  ,canActivate:[AuthGuard]},
   {path:'laboratoire/edit/:id', component:LaboratoireEditComponent ,canActivate:[AuthGuard]},
 

   { path: 'produits/add', component: ProduitComponent ,canActivate:[AuthGuard] },
   { path: 'produits', component: ProduitListComponent ,canActivate:[AuthGuard] },
  { path: '', component: ProduitListComponent  ,canActivate:[AuthGuard] },
    {path:'produit/edit/:id', component:ProduitEditComponent ,canActivate:[AuthGuard]},

    { path: 'commandes/add', component: CommandeComponent ,canActivate:[AuthGuard] },
    { path: 'commandes', component: CommandeListComponent  ,canActivate:[AuthGuard]},
  { path: '', component: CommandeListComponent  ,canActivate:[AuthGuard]},
     {path:'commande/edit/:id', component:CommandeEditComponent ,canActivate:[AuthGuard]},
  
     { path: 'stocks', component: StockListComponent ,canActivate:[AuthGuard] },

     { path: 'ventes/add', component: VenteComponent  ,canActivate:[AuthGuard]},
     { path: 'ventes', component: VenteListComponent ,canActivate:[AuthGuard] },
    { path: '', component: VenteListComponent ,canActivate:[AuthGuard] },
      {path:'vente/edit/:id', component:VenteEditComponent ,canActivate:[AuthGuard]},
      



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
