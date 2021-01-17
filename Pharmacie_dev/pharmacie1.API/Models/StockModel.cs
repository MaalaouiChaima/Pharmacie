using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace pharmacie1.API.Models
{
    public class StockModel
    {
        public int ID { get; set; }
        public string QUANTITY { get; set; }
        public Nullable<int> ID_PRODUCT { get; set; }
        public string NOMP { get; set; }
    }
}