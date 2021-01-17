using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

using System.Data.Entity.Validation;

using System.Text;
using System.Threading.Tasks;
using pharmacie1.Data;

namespace pharmacie1.Abstract
{
    

    public class Repositorie<Tentite> : IRepositorie<Tentite> where Tentite : class
    {
        private readonly PharmacieEntities contextes;
        private IDbSet<Tentite> entites;

        public Repositorie(PharmacieEntities contx)
        {
            this.contextes = contx;
        }


        //public IQueryable<affilie> Tables
        //{
        //    get
        //    {
        //        return contextes.affilie.Include(u => u.store);
        //    }
        //}


        //public Tentite RechCde()
        //{
        //    return this.Entite.First();
        //}


        public IQueryable<Tentite> Table
        {
            get
            {
                return this.Entite;
            }
        }

        private IDbSet<Tentite> Entite
        {
            get
            {
                if (entites == null)
                {
                    entites = contextes.Set<Tentite>();
                }
                return entites;
            }
        }


        //public IEnumerable<Tentite> RechFiltre(Expression<Func<Tentite, bool>> predicate)
        //{
        //    return contextes.Set<Tentite>().Where(predicate);
        //}


        public bool Ajouter(Tentite entity)
        {
            try
            {
                if (entity == null)
                {
                    throw new ArgumentNullException("entity");

                }
                this.Entite.Add(entity);
                if (this.contextes.SaveChanges() == 1)
                {
                    return true;
                }
                return false;
            }
            catch (DbEntityValidationException dbEx)
            {
                var msg = string.Empty;

                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        msg += string.Format("Properiete: {0} Erreur: {1}",
                        validationError.PropertyName, validationError.ErrorMessage) + Environment.NewLine;
                    }
                }

                var fail = new Exception(msg, dbEx);
                throw fail;

            }

        }


        public bool Modifier(Tentite entity)
        {
            try
            {
                if (entity == null)
                {
                    throw new ArgumentNullException("entity");
                }
                if (this.contextes.SaveChanges() > 0)
                {
                    return true;
                }
                return false;
            }
            catch (DbEntityValidationException dbEx)
            {
                var msg = string.Empty;
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        msg += Environment.NewLine + string.Format("Properiete: {0} Erreur: {1}",
                        validationError.PropertyName, validationError.ErrorMessage);
                    }
                }
                var fail = new Exception(msg, dbEx);
                throw fail;
            }

        }



        public Tentite Recherche(int TPk)
        {
            return this.Entite.Find(TPk);
        }


        public bool Supprimer(Tentite entity)
        {
            try
            {
                if (entity == null)
                {
                    throw new ArgumentNullException("entity");
                }
                this.Entite.Remove(entity);
                if (this.contextes.SaveChanges() > 0)
                {
                    return true;
                }
                return false;

            }
            catch (DbEntityValidationException dbEx)
            {
                var msg = string.Empty;

                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        msg += Environment.NewLine + string.Format("Properiete: {0} Erreur: {1}",
                        validationError.PropertyName, validationError.ErrorMessage);
                    }
                }
                var fail = new Exception(msg, dbEx);
                throw fail;
            }
        }




    }
}
