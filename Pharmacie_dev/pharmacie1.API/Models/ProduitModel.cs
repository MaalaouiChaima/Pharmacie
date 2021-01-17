using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace pharmacie1.API.Models
{
    public class ProduitModel
    {
        public int ID { get; set; }
        public string CODECIP { get; set; }
        public string NAMEP { get; set; }
        public string DESCRIPTIONS { get; set; }
        public Nullable<int> DOSAGE { get; set; }
        public string FORM { get; set; }
        public string CLASS { get; set; }
        public  string IS_ORDONNACE { get; set; }
        public string CNAM { get; set; }
        public Nullable<decimal> PRIXACHAT { get; set; }
        public Nullable<decimal> PRIXVENTE { get; set; }
        public Nullable<int> ID_LABORATOIR { get; set; }

        public string labo { get; set; }
        
    }
}