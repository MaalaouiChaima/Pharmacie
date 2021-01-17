using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace pharmacie1.API.Models
{
    public class VenteModel
    {
        public int ID { get; set; }
        public Nullable<System.DateTime> DATEVENTE { get; set; }
        public string QUANTITY { get; set; }
        public Nullable<int> ID_PRODUCT { get; set; }
        public string nomP { get; set; }
        public Nullable<decimal> PRIXVENTE { get; set; }
       
    }
}