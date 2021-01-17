using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pharmacie1.Abstract;
using pharmacie1.Data;

namespace pharmacie1.Service
{
    public class UtilisateurService : IUtilisateursService
    {
        private IRepositorie<USERS> UserService;

        public UtilisateurService(IRepositorie<USERS> UserService)
        {
            this.UserService = UserService;
        }

        public bool Ajouter(USERS iComptes)
        {
            return UserService.Ajouter(iComptes);
        }


        public IQueryable<USERS> GetUsers()
        {
            return UserService.Table;
        }

        public USERS GetUsers(int Id)
        {
            return UserService.Recherche(Id);
        }

        public IQueryable<USERS> GetUser()
        {
            throw new NotImplementedException();
        }

        public bool Modifier(USERS iComptes)
        {
            return UserService.Modifier(iComptes);
        }

        public bool Supprimer(USERS iComptes)
        {
            return UserService.Supprimer(iComptes);
        }

    }
}
