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
    [RoutePrefix("api/Ventes")]
    public class VenteController : ApiController
    {
        private IVenteService venteService;
        private IProduitService prodService;
        private IStockService stockService;
        public VenteController(IVenteService venteService, IProduitService prodService, IStockService stockService)
        {
            this.venteService = venteService;
            this.prodService = prodService;
            this.stockService = stockService;
        }

        [Route("ListVente")]
        [HttpGet]
        [Authorize]
        public async Task<HttpResponseMessage> GetAllVente()
        {
            List<VenteModel> model = new List<VenteModel>();
            try
            {
                venteService.GetVentes().ToList().ForEach(item =>
                {
                    VenteModel vent = new VenteModel
                    {
                        ID = item.ID,
                        DATEVENTE=item.DATEVENTE,
                        QUANTITY=item.QUANTITY,
                        ID_PRODUCT=item.ID_PRODUCT,

                        nomP = prodService.GetProduit(item.ID_PRODUCT.GetValueOrDefault()).NAMEP,
                     PRIXVENTE=prodService.GetProduit(item.ID_PRODUCT.GetValueOrDefault()).PRIXVENTE,
                    };

                    model.Add(vent);
                });


                return Request.CreateResponse(HttpStatusCode.OK, model);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }



        [Route("InfoVente/{id}")]
        [HttpGet]
        [Authorize]
        public async Task<HttpResponseMessage> Get(int id)
        {
            try
            {
               // id = venteService.GetVentes().Take(1).FirstOrDefault().ID;
                VENTE infoVent = venteService.GetVente(id);
                return Request.CreateResponse(HttpStatusCode.OK, infoVent);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [Route("Ajouter")]
        [AcceptVerbs("POST", "GET")]
        [Authorize]
        public async Task<HttpResponseMessage> Add(VENTE Vent)
        {
            try
            {
                bool IsAdded = false;
                var stockBD = stockService.GetSTOCKS();
                STOCK s = null;
                STOCK x = null;
                /*   if (Vent == null)
                   {
                       int id = venteService.GetVentes().Take(1).FirstOrDefault().ID;
                       Vent = venteService.GetVente(id);
                       Vent.QUANTITY = "741";

                   }*/

                foreach (STOCK a in stockBD)
                {
                    if (a.ID_PRODUCT == Vent.ID_PRODUCT)
                    {
                        s = a;
                    } }
                        if (int.Parse(s.QUANTITY) < int.Parse(Vent.QUANTITY))
                        {
                            IsAdded = false;
                        }
                        else
                        {
                            Vent.DATEVENTE = Vent.DATEVENTE;
                            Vent.QUANTITY = Vent.QUANTITY;
                            Vent.ID_PRODUCT = Vent.ID_PRODUCT;
                            IsAdded = venteService.Ajouter(Vent);
                            x = s;
                            int result = 0;
                            result = int.Parse(x.QUANTITY) - int.Parse(Vent.QUANTITY);
                            x.QUANTITY = result.ToString();
                           

                        }

                if (IsAdded == true)
                { bool IsModif = stockService.Modifier(x); }

                //  bool IsAdded = venteService.Ajouter(Vent);
                if (IsAdded == false)
                { return Request.CreateResponse(HttpStatusCode.BadRequest, IsAdded); }
                else
                    return Request.CreateResponse(HttpStatusCode.OK, IsAdded);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }


        [Route("Update")]
        //[HttpPut]
        [AcceptVerbs("PUT", "GET", "POST")]
      [Authorize]
        public async Task<HttpResponseMessage> Update(VENTE Vent)
        {
            try
            {
                bool IsModified = false;
                STOCK x = null;
                var stockBD = stockService.GetSTOCKS();
                STOCK s = null;
                var CmdBd = venteService.GetVente(Vent.ID);
                if (CmdBd == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound);

                foreach (STOCK a in stockBD)
                {
                    if (a.ID_PRODUCT == CmdBd.ID_PRODUCT)
                    {
                        x = a;
                    } }
                        if (int.Parse(x.QUANTITY) < int.Parse(Vent.QUANTITY))
                        {
                            IsModified = false;
                        }
                        else
                        {
                           CmdBd.DATEVENTE = Vent.DATEVENTE;
                            CmdBd.QUANTITY = Vent.QUANTITY;
                            CmdBd.ID_PRODUCT = Vent.ID_PRODUCT;
                            IsModified = venteService.Modifier(CmdBd);
                            s = x;
                            int result = 0;
                            result = int.Parse(x.QUANTITY) - int.Parse(Vent.QUANTITY);
                            s.QUANTITY = result.ToString();
                           

                        }
                if (IsModified == true)

                { bool IsModif = stockService.Modifier(s); }


                /*   foreach (STOCK n in stockBD)
                   {
                       if (n.ID_PRODUCT == Vent.ID_PRODUCT)
                       {
                           s = n;
                           int result = 0;
                           result = int.Parse(n.QUANTITY) - int.Parse(Vent.QUANTITY);
                           s.QUANTITY = result.ToString();

                       }
                   } */

                /* if (Vent == null)
                 {
                     int id = venteService.GetVentes().Take(1).FirstOrDefault().ID;
                     Vent = venteService.GetVente(id);
                     Vent.QUANTITY = "852";

                 }*/
                //bool IsModif = stockService.Modifier(s);
                if(IsModified==false)
                { return Request.CreateResponse(HttpStatusCode.BadRequest, IsModified); }
                else
                { return Request.CreateResponse(HttpStatusCode.OK, IsModified);}
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [Route("Delete/{id}")]
        [AcceptVerbs("DELETE")]
        [Authorize]
        public async Task<HttpResponseMessage> Delete(int Id)
        {
            try
            {
                if (Id > 0)
                {
                    //int id = userService.GetUsers().Take(1).FirstOrDefault().ID;
                    VENTE Vent = venteService.GetVente(Id);
                    bool IsDeleted = venteService.Supprimer(Vent);
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
