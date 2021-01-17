using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace pharmacie1.API.Models
{
    public class UtilisateurModel
    {
        public int ID { get; set; }
        public string FIRSTNAME { get; set; }
        public string LASTNAME { get; set; }
        public Nullable<int> CIN { get; set; }
        public string CITY { get; set; }
        public string PHONE { get; set; }
        public string EMAIL { get; set; }
        public Nullable<System.DateTime> BIRTHDAY { get; set; }
        public string LOGIN { get; set; }
        public string PASSWORD { get; set; }
        public string RIB { get; set; }
    }
}