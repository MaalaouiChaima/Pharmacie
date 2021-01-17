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
    [RoutePrefix("api/Commandes")]
    public class CommandeController : ApiController
    {
        private IProduitService produitService;
        private ILaboratoireService laboratoireService;
        private ICommandeService commandeService;
        private IStockService stockService;


        public CommandeController(IProduitService produitService, ILaboratoireService laboratoireService, ICommandeService commandeService, IStockService stockService)
        {
            this.produitService = produitService;
            this.laboratoireService = laboratoireService;
            this.commandeService = commandeService;
            this.stockService = stockService;

        }
        [Route("ListCommande")]
        [HttpGet]
        [Authorize]
        public async Task<HttpResponseMessage> GetAllCommandes()
        {
            List<CommandeModel> model = new List<CommandeModel>();
            try
            {
                commandeService.GetCOMMANDES().ToList().ForEach(item =>
                {
                   CommandeModel cmd = new CommandeModel
                    {
                       ID =item.ID,
                
        DATECOMMANDE =item.DATECOMMANDE,
         QUANTITYDEMANDE =item.QUANTITYDEMANDE,
        ID_LABORATOIRE=item.ID_LABORATOIRE,
        ID_PRODUCT =item.ID_PRODUCT,
        RECEIVED =item.RECEIVED,
        QUNTITYRECIEVED =item.QUNTITYRECIEVED,
        DATERECEIVED =item.DATERECEIVED,
       // NOMP { get; set; }
       //  NOML { get; set; }

        NOMP = produitService.GetProduit(item.ID_PRODUCT.GetValueOrDefault()).NAMEP,
        NOML=laboratoireService.GetLaboratoire(item.ID_LABORATOIRE.GetValueOrDefault()).NAMEL
                    };

                    model.Add(cmd);
                });


                return Request.CreateResponse(HttpStatusCode.OK, model);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }



        [Route("InfoCommande/{id}")]
        [HttpGet]
        [Authorize]
        public async Task<HttpResponseMessage> Get(int id)
        {
            try
            {
               // id = commandeService.GetCOMMANDES().Take(1).FirstOrDefault().ID;

                COMMANDE infoCommande = commandeService.GetCOMMANDE(id);
                return Request.CreateResponse(HttpStatusCode.OK, infoCommande);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [Route("Ajouter")]
        [AcceptVerbs("POST", "GET")]
        [Authorize]
        public async Task<HttpResponseMessage> Add(COMMANDE cmd)
        {
            try
            {
                if (cmd == null)
                {
                    int id = commandeService.GetCOMMANDES().Take(1).FirstOrDefault().ID;
                    cmd = commandeService.GetCOMMANDE(id);
                    cmd.QUANTITYDEMANDE = "741";
                    cmd.QUNTITYRECIEVED = "741";

                }
                bool IsAdded = commandeService.Ajouter(cmd);
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
        public async Task<HttpResponseMessage> Update(COMMANDE cmd)
        {
            try
            {
                
                var stockBD = stockService.GetSTOCKS();
                 STOCK s = null;
                var CmdBd = commandeService.GetCOMMANDE(cmd.ID);
                if (CmdBd == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                CmdBd.DATECOMMANDE = cmd.DATECOMMANDE;
                CmdBd.QUANTITYDEMANDE = cmd.QUANTITYDEMANDE;
                CmdBd.ID_LABORATOIRE = cmd.ID_LABORATOIRE;
                CmdBd.ID_PRODUCT = cmd.ID_PRODUCT;
                CmdBd.RECEIVED = cmd.RECEIVED;
                CmdBd.QUNTITYRECIEVED = cmd.QUNTITYRECIEVED;
                CmdBd.DATERECEIVED = cmd.DATERECEIVED;

                bool IsAdded = commandeService.Modifier(cmd);
                if (cmd.RECEIVED.Equals("Oui"))
                {
                    foreach (STOCK n in stockBD)
                    {
                        if (n.ID_PRODUCT == cmd.ID_PRODUCT)
                        {
                            s = n;
                            int result = 0;
                            result = int.Parse(n.QUANTITY) + int.Parse(cmd.QUNTITYRECIEVED);
                            s.QUANTITY = result.ToString();

                        }
                    }
                    bool IsModified = stockService.Modifier(s);
                }

                return Request.CreateResponse(HttpStatusCode.OK, true);
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
                var stockBD = stockService.GetSTOCKS();
                STOCK s = null;
                if (Id > 0)
                {
                    //int id = produitService.GetUsers().Take(1).FirstOrDefault().ID;
                    COMMANDE cmd = commandeService.GetCOMMANDE(Id);
                   
                    foreach (STOCK n in stockBD)
                    {
                        if (n.ID_PRODUCT == cmd.ID_PRODUCT)
                        {
                            s = n;
                            int result = 0;
                            result = int.Parse(n.QUANTITY) - int.Parse(cmd.QUNTITYRECIEVED);
                            s.QUANTITY = result.ToString();

                        }
                    }
                    bool IsModified = stockService.Modifier(s);
                    bool IsDeleted = commandeService.Supprimer(cmd);
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
