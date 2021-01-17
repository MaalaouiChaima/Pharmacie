using pharmacie1.Abstract;
using pharmacie1.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pharmacie1.Service
{
   public class ProduitService : IProduitService
    {
        private IRepositorie<PRODUIT> prodService;

        public ProduitService(IRepositorie<PRODUIT> prodService)
        {
            this.prodService = prodService;
        }

        public bool Ajouter(PRODUIT iProduit)
        {
            return prodService.Ajouter(iProduit);
        }


        public IQueryable<PRODUIT> GetProduits()
        {
            return prodService.Table;
        }

        public PRODUIT GetProduit(int Id)
        {
            return prodService.Recherche(Id);
        }

        public IQueryable<PRODUIT> GetProduit()
        {
            throw new NotImplementedException();
        }

        public bool Modifier(PRODUIT iProduit)
        {
            return prodService.Modifier(iProduit);
        }

        public bool Supprimer(PRODUIT iProduit)
        {
            return prodService.Supprimer(iProduit);
        }
    }
}
