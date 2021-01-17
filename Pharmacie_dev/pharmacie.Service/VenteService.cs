using pharmacie1.Abstract;
using pharmacie1.Data;
using pharmacie1.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pharmacie1.Service
{
    public class VenteService : IVenteService
    {

        private IRepositorie<VENTE> VentService;

        public VenteService(IRepositorie<VENTE> VentService)
        {
            this.VentService = VentService;
        }

        public bool Ajouter(VENTE iVente)
        {
            return VentService.Ajouter(iVente);
        }


        public IQueryable<VENTE> GetVentes()
        {
            return VentService.Table;
        }

        public VENTE GetVente(int Id)
        {
            return VentService.Recherche(Id);
        }

        public IQueryable<VENTE> GetVente()
        {
            throw new NotImplementedException();
        }

        public bool Modifier(VENTE iVente)
        {
            return VentService.Modifier(iVente);
        }

        public bool Supprimer(VENTE iVente)
        {
            return VentService.Supprimer(iVente);
        }
    }
}
