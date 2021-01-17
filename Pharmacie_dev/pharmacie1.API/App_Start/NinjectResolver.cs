using Ninject;
using Ninject.Extensions.ChildKernel;
using pharmacie1.Abstract;
using pharmacie1.Service;
using System;
using System.Collections.Generic;
using System.Web.Http.Dependencies;

namespace Pharmacie1.API
{
    public class NinjectResolver : IDependencyResolver
    {
        private IKernel kernel;

        public NinjectResolver()
            : this(new StandardKernel())
        {

        }

        public NinjectResolver(IKernel ninjectKernel, bool scope = false)
        {
            kernel = ninjectKernel;
            if (!scope)
            {
                AddBindings(kernel);
            }
        }

        public IDependencyScope BeginScope()
        {
            return new NinjectResolver(AddRequestBindings(new ChildKernel(kernel)), true);
        }

        public object GetService(Type serviceType)
        {
            return kernel.TryGet(serviceType);
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            return kernel.GetAll(serviceType);
        }

        public void Dispose()
        {

        }

        private void AddBindings(IKernel kernel)
        {
            // singleton and transient bindings go here
        }

        private IKernel AddRequestBindings(IKernel kernel)
        {

            kernel.Bind(typeof(IRepositorie<>)).To(typeof(Repositorie<>)).InSingletonScope();

            kernel.Bind<IUtilisateursService>().To<UtilisateurService>().InSingletonScope();
            kernel.Bind<IProduitService>().To<ProduitService>().InSingletonScope();
           
            kernel.Bind<ILaboratoireService>().To<LaboratoireService>().InSingletonScope();
           
            kernel.Bind<IVenteService>().To<VenteService>().InSingletonScope();
            kernel.Bind<IStockService>().To<StockServicecs>().InSingletonScope();
            kernel.Bind<ICommandeService>().To<CommandeService>().InSingletonScope();
           
            return kernel;
        }
    }
}