
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
    [RoutePrefix("api/Produits")]
    public class ProduitsController : ApiController
    {
        private IProduitService produitService;
      
        private ILaboratoireService laboService;
        private IStockService stockService;

        public ProduitsController(IProduitService produitService,  ILaboratoireService laboService, IStockService stockService)
        {
            this.produitService = produitService;
           
            this.laboService = laboService;
            this.stockService = stockService;


        }
        [Route("ListProduits")]
        [HttpGet]
        [Authorize]
        public async Task<HttpResponseMessage> GetAllProduits()
        {
            List<ProduitModel> model = new List<ProduitModel>();
            try
            {
                produitService.GetProduits().ToList().ForEach(item =>
                {
                    ProduitModel prod = new ProduitModel
                    {
                        ID = item.ID,
                        CNAM = item.CNAM,
                        CODECIP = item.CODECIP,
                        NAMEP = item.NAMEP,
                        DESCRIPTIONS = item.DESCRIPTIONS,
                        DOSAGE = item.DOSAGE,
                        CLASS = item.CLASS,
                        IS_ORDONNACE = item.IS_ORDONNACE,
                        ID_LABORATOIR = item.ID_LABORATOIR,
                        FORM = item.FORM,
                        PRIXACHAT = item.PRIXACHAT,
                        PRIXVENTE = item.PRIXVENTE,

                       labo = laboService.GetLaboratoire(item.ID_LABORATOIR.GetValueOrDefault()).NAMEL
                        
                    };

                    model.Add(prod);
                });

                
                return Request.CreateResponse(HttpStatusCode.OK, model);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }



        [Route("InfoProduit/{id}")]
        [HttpGet]
        [Authorize]
        public async Task<HttpResponseMessage> Get(int id)
        {
            try
            {
                //id = produitService.GetProduits().Take(1).FirstOrDefault().ID;
                PRODUIT infoProduit = produitService.GetProduit(id);
                return Request.CreateResponse(HttpStatusCode.OK, infoProduit);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [Route("Ajouter")]
        [AcceptVerbs("POST", "GET")]
        [Authorize]
        public async Task<HttpResponseMessage> Add(PRODUIT Prod)
        {
           
            try
            {
                bool IsAdded=true;
                STOCK s = new STOCK();
                if (Prod == null)
                {
                    int id = produitService.GetProduits().Take(1).FirstOrDefault().ID;
                    Prod = produitService.GetProduit(id);
                    Prod.NAMEP = "aa74rdf";
                    Prod.DESCRIPTIONS = "bbb963ff";
                }
                var pbd = produitService.GetProduits();
                foreach (PRODUIT p in pbd)
              
                { if (p.CODECIP==Prod.CODECIP)
                    {
                        IsAdded = false;

                    }   
                            
                            }
                if (IsAdded == true)
                {
                    IsAdded = produitService.Ajouter(Prod);

                    s.ID = Prod.ID;
                    s.ID_PRODUCT = Prod.ID;
                    s.QUANTITY = "0";

                    bool IsAdded2 = stockService.Ajouter(s);
                    return Request.CreateResponse(HttpStatusCode.OK, IsAdded);
                }
                else
                { return Request.CreateResponse(HttpStatusCode.BadRequest, IsAdded); }
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
        public async Task<HttpResponseMessage> Update(PRODUIT Prod)
        {
            try
            {
                var ProdBd = produitService.GetProduit(Prod.ID);
                if (ProdBd == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                ProdBd.CODECIP = Prod.CODECIP;
                ProdBd.NAMEP = Prod.NAMEP;
                ProdBd.DESCRIPTIONS = Prod.DESCRIPTIONS;
                ProdBd.DOSAGE = Prod.DOSAGE;
                ProdBd.FORM = Prod.FORM;
                ProdBd.CLASS = Prod.CLASS;
                ProdBd.IS_ORDONNACE = Prod.IS_ORDONNACE;
                ProdBd.CNAM = Prod.CNAM;
                ProdBd.PRIXACHAT = Prod.PRIXACHAT;
                ProdBd.PRIXVENTE = Prod.PRIXVENTE;
                ProdBd.ID_LABORATOIR = Prod.ID_LABORATOIR;

        bool IsModified = produitService.Modifier(Prod);
                return Request.CreateResponse(HttpStatusCode.OK, IsModified);
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
                    //int id = produitService.GetUsers().Take(1).FirstOrDefault().ID;
                    PRODUIT Prod = produitService.GetProduit(Id);
                    bool IsDeleted = produitService.Supprimer(Prod);
                    if (IsDeleted == true)
                    { return Request.CreateResponse(HttpStatusCode.OK, IsDeleted); }
                    else { return Request.CreateResponse(HttpStatusCode.BadRequest, IsDeleted); }
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
