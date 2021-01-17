using pharmacie1.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pharmacie1.Service
{
  public interface ICommandeService
    {
        IQueryable<COMMANDE> GetCOMMANDES();
        COMMANDE GetCOMMANDE(int Id);
        bool Ajouter(COMMANDE iCommande);
        bool Modifier(COMMANDE iCommande);
        bool Supprimer(COMMANDE iCommande);
    }
}
