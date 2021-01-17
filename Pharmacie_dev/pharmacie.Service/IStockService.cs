using pharmacie1.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pharmacie1.Service
{
   public interface IStockService
    {
        IQueryable<STOCK> GetSTOCKS();
        STOCK GetSTOCK(int Id);
        bool Ajouter(STOCK iStock);
        bool Modifier(STOCK iStock);
        bool Supprimer(STOCK iStock);
    }
}
