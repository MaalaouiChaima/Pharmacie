using pharmacie1.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pharmacie1.Service
{
 public   interface ILaboratoireService
    {
        IQueryable<LABORATOIRE> GetLaboratoires();
        LABORATOIRE GetLaboratoire(int Id);
        bool Ajouter(LABORATOIRE iLabo);
        bool Modifier(LABORATOIRE iLabo);
        bool Supprimer(LABORATOIRE iULabo);
    }
}
