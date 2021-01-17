using pharmacie1.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace pharmacie1.API.Models
{
    public class UserMasterRepository : IDisposable
    {
        PharmacieEntities context = new PharmacieEntities();
        public USERS ValidateUser(string login, string password)
        {
            return context.USERS.FirstOrDefault(user =>
            user.LOGIN.Equals(login, StringComparison.OrdinalIgnoreCase)
            && user.PASSWORD == password);
        }
        public void Dispose()
        {
            context.Dispose();
        }

    }
}