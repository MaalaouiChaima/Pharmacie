using pharmacie1.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pharmacie1.Service
{
  public  interface IProduitService
    {
        IQueryable<PRODUIT> GetProduits();
        PRODUIT GetProduit(int Id);
        bool Ajouter(PRODUIT iUser);
        bool Modifier(PRODUIT iUser);
        bool Supprimer(PRODUIT iUser);
    }
}
