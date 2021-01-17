using pharmacie1.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pharmacie1.Service
{
    public interface IVenteService
    {
        IQueryable<VENTE> GetVentes();
        VENTE GetVente(int Id);
        bool Ajouter(VENTE iVente);
        bool Modifier(VENTE iVente);
        bool Supprimer(VENTE iVente);
    }
}
