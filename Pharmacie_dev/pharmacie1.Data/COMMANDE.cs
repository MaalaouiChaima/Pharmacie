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
    
    public partial class COMMANDE
    {
        public int ID { get; set; }
        public Nullable<System.DateTime> DATECOMMANDE { get; set; }
        public string QUANTITYDEMANDE { get; set; }
        public Nullable<int> ID_LABORATOIRE { get; set; }
        public Nullable<int> ID_PRODUCT { get; set; }
        public string RECEIVED { get; set; }
        public string QUNTITYRECIEVED { get; set; }
        public Nullable<System.DateTime> DATERECEIVED { get; set; }
    }
}