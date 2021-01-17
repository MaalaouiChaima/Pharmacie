using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace pharmacie1.API.Models
{
    public class CommandeModel
    {
        public int ID { get; set; }
        public Nullable<System.DateTime> DATECOMMANDE { get; set; }
        public string QUANTITYDEMANDE { get; set; }
        public Nullable<int> ID_LABORATOIRE { get; set; }
        public Nullable<int> ID_PRODUCT { get; set; }
        public  string  RECEIVED { get; set; }
        public string QUNTITYRECIEVED { get; set; }
        public Nullable<System.DateTime> DATERECEIVED { get; set; }
        public string NOMP { get; set; }
        public string NOML { get; set; }

    }
}