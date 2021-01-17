using pharmacie1.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using pharmacie1.Data;

namespace pharmacie1.API.Controllers
{
    [RoutePrefix("api/Laboratoire")]
    public class LaboratoireController : ApiController
    {

        private ILaboratoireService laboService;

        public LaboratoireController(ILaboratoireService laboService)
        {
            this.laboService = laboService;
        }

        [Route("ListLaboratoire")]
        [HttpGet]
        [Authorize]
        public async Task<HttpResponseMessage> GetAllLabo()
        {
            try
            {
                List<LABORATOIRE> listLabo = laboService.GetLaboratoires().ToList();
                return Request.CreateResponse(HttpStatusCode.OK, listLabo);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }



        [Route("InfoLaboratoire/{id}")]
        [HttpGet]
        [Authorize]
        public async Task<HttpResponseMessage> Get(int id)
        {
            try
            {
               // id = laboService.GetLaboratoires().Take(1).FirstOrDefault().ID;
                LABORATOIRE infoLabo = laboService.GetLaboratoire(id);
                return Request.CreateResponse(HttpStatusCode.OK, infoLabo);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [Route("Ajouter")]
        [AcceptVerbs("POST", "GET")]
       // [HttpGet]
        [Authorize]
        public async Task<HttpResponseMessage> Add(LABORATOIRE Labo)
        {
            try
            {
                if (Labo == null)
                {
                    int id = laboService.GetLaboratoires().Take(1).FirstOrDefault().ID;
                    Labo = laboService.GetLaboratoire(id);
                    Labo.NAMEL = "LABO_Bizerte";
                    Labo.DESCRIPTIONS = "New_Labo_LastName";
                }
                bool IsAdded = laboService.Ajouter(Labo);
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
        public async Task<HttpResponseMessage> Update(LABORATOIRE Labo)
        {
            try
            {
                var UserBd = laboService.GetLaboratoire(Labo.ID);
                if (UserBd == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                UserBd.NAMEL = Labo.NAMEL;
                UserBd.DESCRIPTIONS = Labo.DESCRIPTIONS;
                UserBd.DESCRIPTIONS = Labo.DESCRIPTIONS;
                UserBd.MAIL = Labo.MAIL;
                UserBd.PHONE = Labo.PHONE;
                UserBd.CITY = Labo.CITY;
                UserBd.CODEPOSTAL = Labo.CODEPOSTAL;

                bool IsModified = laboService.Modifier(Labo);
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
                    //int id = laboService.GetLaboratoires().Take(1).FirstOrDefault().ID;
                    LABORATOIRE User = laboService.GetLaboratoire(Id);
                    bool IsDeleted = laboService.Supprimer(User);
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
