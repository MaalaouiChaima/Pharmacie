using pharmacie1.Abstract;
using pharmacie1.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pharmacie1.Service
{
   public class CommandeService : ICommandeService
    {
        private IRepositorie<COMMANDE> commandeService;

        public CommandeService(IRepositorie<COMMANDE> commandeService)
        {
            this.commandeService = commandeService;
        }

        public bool Ajouter(COMMANDE iCommande)
        {
            return commandeService.Ajouter(iCommande);
        }


        public IQueryable<COMMANDE> GetCOMMANDES()
        {
            return commandeService.Table;
        }

        public COMMANDE GetCOMMANDE(int Id)
        {
            return commandeService.Recherche(Id);
        }

        public IQueryable<COMMANDE> GetCOMMANDE()
        {
            throw new NotImplementedException();
        }

        public bool Modifier(COMMANDE iCommande)
        {
            return commandeService.Modifier(iCommande);
        }

        public bool Supprimer(COMMANDE iCommande)
        {
            return commandeService.Supprimer(iCommande);
        }

    }
}
