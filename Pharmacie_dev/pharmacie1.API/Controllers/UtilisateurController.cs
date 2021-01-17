using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using pharmacie1.API.Models;
using pharmacie1.Data;
using pharmacie1.Service;

namespace pharmacie1.API.Controllers
{
    [RoutePrefix("api/Utilisateurs")]
    public class UtilisateurController : ApiController
    {
        private PharmacieEntities db = new PharmacieEntities();
        private IUtilisateursService userService;

        public UtilisateurController(IUtilisateursService userService)
        {
            this.userService = userService;
        }

        [Route("ListUtilisateur")]
        [HttpGet]
      [Authorize(Roles = "Administrator")]
        public async Task<HttpResponseMessage> GetAllUser()
        {
            try
            {
                List<USERS> listUser = userService.GetUsers().ToList();
                return Request.CreateResponse(HttpStatusCode.OK, listUser);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }



        [Route("InfoUtilisateur/{id}")]
        [HttpGet]
    [Authorize(Roles = "Administrator")]
        public async Task<HttpResponseMessage> GetUser(int id)
        {
            try
            {
                //id = userService.GetUsers().Take(1).FirstOrDefault().ID;
                USERS infoUser = userService.GetUsers(id);
                return Request.CreateResponse(HttpStatusCode.OK, infoUser);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }
        /*
                [Route("Ajouter")]
                // POST: api/Users
                [ResponseType(typeof(USERS))]
                public IHttpActionResult PostCustomer(USERS customer)
                {

                        if (customer == null)
                        {
                            int id = userService.GetUsers().Take(1).FirstOrDefault().ID;
                            customer = userService.GetUsers(id);
                            customer.FIRSTNAME = "New_User_FirstName";
                            customer.LASTNAME = "New_User_LastName";
                        }
                        db.USERS.Add(customer);
                        // bool IsAdded = userService.Ajouter(customer);
                        // db.USERS.(customer);
                        db.SaveChanges();
                        return CreatedAtRoute("DefaultApi", new { id = customer.ID }, customer);
                        //return Request.CreateResponse(HttpStatusCode.OK, IsAdded);


                }*/

        //[Route("Ajouter")]
        //[AcceptVerbs("POST", "GET")]
        //public IHttpActionResult Add(USERS User)
        //{
        //    return Ok();
        //}
        [Route("Ajouter")]
        [AcceptVerbs("POST", "GET")]
       [Authorize(Roles = "Administrator")]
     
        public async Task<HttpResponseMessage> Add(USERS User)
        {
            Boolean IsAdded = true;
            try
            {
                if (User == null)
                {
                    int id = userService.GetUsers().Take(1).FirstOrDefault().ID;
                    User = userService.GetUsers(id);
                    User.FIRSTNAME = "New_User_FirstName";
                    User.LASTNAME = "New_User_LastName";
                }
                var US = userService.GetUsers();
                foreach (USERS u in US)

                {
                    if ((u.CIN == User.CIN) || (u.LOGIN == User.LOGIN))
                    {
                        IsAdded = false;

                    }

                }
                if (IsAdded == true)
                {
                    IsAdded = userService.Ajouter(User);
                    //return CreatedAtRoute("DefaultApi", new { id = User.ID }, User);
                    return Request.CreateResponse(HttpStatusCode.OK, IsAdded);
                }

                else { return Request.CreateResponse(HttpStatusCode.BadRequest, IsAdded); }
            }
           
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }


        [Route("Update")]
       
        [AcceptVerbs("PUT","GET","POST")]
      [Authorize(Roles = "Administrator")]
        public async Task<HttpResponseMessage> Update(USERS User)
        {
            try
            {
                     //id = userService.GetUsers().Take(1).FirstOrDefault().ID;
                    var UserBd = userService.GetUsers(User.ID);
                    if(UserBd ==null)
                        return Request.CreateResponse(HttpStatusCode.NotFound);

                    UserBd.BIRTHDAY = User.BIRTHDAY;
                    UserBd.CIN = User.CIN;
                    UserBd.CITY = User.CITY;
                    UserBd.EMAIL = User.EMAIL;
                    UserBd.FIRSTNAME = User.FIRSTNAME;
                    UserBd.LASTNAME = User.LASTNAME;
                    UserBd.LOGIN = User.LOGIN;
                    UserBd.PASSWORD = User.PASSWORD;
                    UserBd.PHONE = User.PHONE;
                    UserBd.RIB = User.RIB;
                    UserBd.ROLE = User.ROLE;
                    bool IsModified = userService.Modifier(User);
                    return Request.CreateResponse(HttpStatusCode.OK, IsModified);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [Authorize(Roles = "Administrator")]
        [Route("Delete/{id}")]
        [AcceptVerbs("DELETE")]
        public async Task<HttpResponseMessage> Delete(int Id)
        {
            try
            {
                if (Id > 0)
                {
                    //int id = userService.GetUsers().Take(1).FirstOrDefault().ID;
                    USERS User = userService.GetUsers(Id);
                    bool IsDeleted = userService.Supprimer(User);
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
