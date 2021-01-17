using pharmacie1.Abstract;
using pharmacie1.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pharmacie1.Service
{
   public class LaboratoireService : ILaboratoireService
    {  private IRepositorie<LABORATOIRE> laboService;

    public LaboratoireService(IRepositorie<LABORATOIRE> laboService)
    {
        this.laboService = laboService;
    }

    public bool Ajouter(LABORATOIRE iLabo)
    {
        return laboService.Ajouter(iLabo);
    }


    public IQueryable<LABORATOIRE> GetLaboratoires()
    {
        return laboService.Table;
    }

    public LABORATOIRE GetLaboratoire(int Id)
    {
        return laboService.Recherche(Id);
    }

    public IQueryable<LABORATOIRE> GetLaboratoire()
    {
        throw new NotImplementedException();
    }

    public bool Modifier(LABORATOIRE iLabo)
    {
        return laboService.Modifier(iLabo);
    }

    public bool Supprimer(LABORATOIRE iLabo)
    {
        return laboService.Supprimer(iLabo);
    }
    
    }
}
