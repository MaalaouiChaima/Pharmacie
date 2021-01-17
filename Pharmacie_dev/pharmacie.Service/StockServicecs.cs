using pharmacie1.Abstract;
using pharmacie1.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pharmacie1.Service
{
  public  class StockServicecs : IStockService
    {
        private IRepositorie<STOCK> stockService;

        public StockServicecs(IRepositorie<STOCK> stockService)
        {
            this.stockService = stockService;
        }

        public bool Ajouter(STOCK iStock)
        {
            return stockService.Ajouter(iStock);
        }


        public IQueryable<STOCK> GetSTOCKS()
        {
            return stockService.Table;
        }

        public STOCK GetSTOCK(int Id)
        {
            return stockService.Recherche(Id);
        }

        public IQueryable<STOCK> GetStocks()
        {
            throw new NotImplementedException();
        }

        public bool Modifier(STOCK iStock)
        {
            return stockService.Modifier(iStock);
        }

        public bool Supprimer(STOCK iStock)
        {
            return stockService.Supprimer(iStock);
        }
    }
}
