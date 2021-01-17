using pharmacie1.API.Models;
using pharmacie1.Data;
using pharmacie1.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace pharmacie1.API.Controllers
{
    [RoutePrefix("api/Stocks")]
    public class StockController : ApiController
    {

        private IProduitService produitService;
        private IStockService stockService;
       
        public StockController(IProduitService produitService, IStockService stockService)
        {
            this.produitService = produitService;
            this.stockService = stockService;


        }
        [Route("ListStocks")]
        [HttpGet]
        [Authorize]
        public async Task<HttpResponseMessage> GetAllStocks()
        {
            List<StockModel> model = new List<StockModel>();
            try
            {
                stockService.GetSTOCKS().ToList().ForEach(item =>
                {
                    StockModel stock = new StockModel
                    {
                        ID = item.ID,
                        QUANTITY=item.QUANTITY,
                        ID_PRODUCT=item.ID_PRODUCT,

                       NOMP=produitService.GetProduit(item.ID_PRODUCT.GetValueOrDefault()).NAMEP
                      
                    };

                    model.Add(stock);
                });


                return Request.CreateResponse(HttpStatusCode.OK, model);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }



        [Route("InfoStock")]
        [HttpGet]
        [Authorize]
        public async Task<HttpResponseMessage> Get(int id)
        {
            try
            {
                id = stockService.GetSTOCKS().Take(1).FirstOrDefault().ID;
                STOCK infoStock = stockService.GetSTOCK(id);
                return Request.CreateResponse(HttpStatusCode.OK, infoStock);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [Route("Ajouter")]
        [HttpGet]
        [Authorize]
        public async Task<HttpResponseMessage> Add(STOCK stock1)
        {
            try
            {
                
                if (stock1 == null)
                {
                    int id = stockService.GetSTOCKS().Take(1).FirstOrDefault().ID;
                    stock1 = stockService.GetSTOCK(id);
                    stock1.QUANTITY = "741";
                   
                }

                bool IsAdded = stockService.Ajouter(stock1);
                return Request.CreateResponse(HttpStatusCode.OK, IsAdded);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }


        [Route("Modifier")]
        [HttpGet]
        [Authorize]
        public async Task<HttpResponseMessage> Update(STOCK stock1)
        {
            try
            {
                if (stock1 == null)
                {
                    int id = stockService.GetSTOCKS().Take(1).FirstOrDefault().ID;
                    stock1 = stockService.GetSTOCK(id);
                    stock1.QUANTITY= "963";
                    
                }
                bool IsModified = stockService.Modifier(stock1);
                return Request.CreateResponse(HttpStatusCode.OK, IsModified);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [Route("Supprimer")]
        [HttpGet]
        [Authorize]
        public async Task<HttpResponseMessage> Delete(int Id)
        {
            try
            {
                if (Id > 0)
                {
                    //int id = produitService.GetUsers().Take(1).FirstOrDefault().ID;
                    STOCK stock1 = stockService.GetSTOCK(Id);
                    bool IsDeleted = stockService.Supprimer(stock1);
                    return Request.CreateResponse(HttpStatusCode.OK, IsDeleted);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.OK, false);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }

    }
}
