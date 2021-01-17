using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pharmacie1.Abstract
{
    public interface IRepositorie<Tentite> where Tentite : class
    {

        Tentite Recherche(int TPk);
        bool Ajouter(Tentite entity);
        bool Modifier(Tentite entity);
        bool Supprimer(Tentite entity);
        IQueryable<Tentite> Table { get; }
    }
}
