using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pharmacie1.Data;

namespace pharmacie1.Service
{
    public interface IUtilisateursService
    {
        IQueryable<USERS> GetUsers();
        USERS GetUsers(int Id);
        bool Ajouter(USERS iUser);
        bool Modifier(USERS iUser);
        bool Supprimer(USERS iUser);
    }
}
