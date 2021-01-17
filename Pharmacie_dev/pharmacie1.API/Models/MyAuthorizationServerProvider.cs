using Microsoft.Owin.Security.OAuth;
using System.Security.Claims;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace pharmacie1.API.Models
{
    public class MyAuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        String role;
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }
        public override Task TokenEndpointResponse(OAuthTokenEndpointResponseContext context)
        {
            context.AdditionalResponseParameters.Add("role", role);
            return base.TokenEndpointResponse(context);
        }
        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            using (UserMasterRepository _repo = new UserMasterRepository())
            {
                var user = _repo.ValidateUser(context.UserName, context.Password);
                if (user == null)
                {
                    context.SetError("invalid_grant", "Provided username and password is incorrect ");
                    return;
                }
                role = user.ROLE;
                var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                identity.AddClaim(new Claim(ClaimTypes.Role, user.ROLE));
                identity.AddClaim(new Claim(ClaimTypes.Name, user.FIRSTNAME));
                

                context.Validated(identity);
            }
        }
    }
}