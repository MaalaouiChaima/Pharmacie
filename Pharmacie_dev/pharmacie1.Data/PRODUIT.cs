//------------------------------------------------------------------------------
// <auto-generated>
//     Ce code a été généré à partir d'un modèle.
//
//     Des modifications manuelles apportées à ce fichier peuvent conduire à un comportement inattendu de votre application.
//     Les modifications manuelles apportées à ce fichier sont remplacées si le code est régénéré.
// </auto-generated>
//------------------------------------------------------------------------------

namespace pharmacie1.Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class PRODUIT
    {
        public int ID { get; set; }
        public string CODECIP { get; set; }
        public string NAMEP { get; set; }
        public string DESCRIPTIONS { get; set; }
        public Nullable<int> DOSAGE { get; set; }
        public string IS_ORDONNACE { get; set; }
        public string CNAM { get; set; }
        public Nullable<decimal> PRIXACHAT { get; set; }
        public Nullable<decimal> PRIXVENTE { get; set; }
        public Nullable<int> ID_LABORATOIR { get; set; }
        public string CLASS { get; set; }
        public string FORM { get; set; }
    }
}