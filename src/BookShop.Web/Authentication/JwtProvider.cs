using BookShop.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BookShop.Web.Authentication
{
    public class JwtProvider
    {
        #region Private Members
        private readonly RequestDelegate next;
        private TimeSpan TokenExpiration;
        private SigningCredentials SigningCredentials;

        private ApplicationDbContext DbContext;
        private UserManager<ApplicationUser> UserManager;
        private SignInManager<ApplicationUser> SignInManager;

        #endregion

        #region Static Members

        private static readonly string PrivateKey = "private_key_1234567890";
        public static readonly SymmetricSecurityKey SecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(PrivateKey));
        public static readonly string Issuer = "BookShopWebApp";
        public static string TokenEndPoint = "/api/connect/token";

        #endregion

        #region Constructor

        public JwtProvider(RequestDelegate next, 
            ApplicationDbContext dbContext, 
            UserManager<ApplicationUser> userManager, 
            SignInManager<ApplicationUser> signInManager)
        {
            this.next = next;
            this.TokenExpiration = TimeSpan.FromMinutes(10);
            this.SigningCredentials = new SigningCredentials(SecurityKey, SecurityAlgorithms.HmacSha256);
            this.DbContext = dbContext;
            this.UserManager = userManager;
            this.SignInManager = signInManager;
        }

        #endregion

        #region Public Methods
        public Task Invoke(HttpContext httpContext)
        {
            if (!httpContext.Request.Path.Equals(TokenEndPoint, StringComparison.Ordinal))
                return next(httpContext);
            if(httpContext.Request.Method.Equals("POST") && httpContext.Request.HasFormContentType)
            {
                return this.CreateToken(httpContext);
            }
            else
            {
                httpContext.Response.StatusCode = 400;
                return httpContext.Response.WriteAsync("Bad request.");
            }
        }

        #endregion

        #region Private Methods
        private async Task CreateToken(HttpContext httpContext)
        {
            try
            {
                string username = httpContext.Request.Form["username"];
                string password = httpContext.Request.Form["password"];

                var user = await UserManager.FindByNameAsync(username);
                if(user == null && username.Contains("@"))
                {
                    user = await UserManager.FindByEmailAsync(username);
                }

                var success = user != null && await UserManager.CheckPasswordAsync(user, password);
                if (success)
                {
                    DateTime now = DateTime.UtcNow;
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Iss, Issuer),
                        new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(now).ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64)
                    };

                    var token = new JwtSecurityToken(
                        claims: claims,
                        notBefore: now,
                        expires: now.Add(TokenExpiration),
                        signingCredentials: SigningCredentials);
                    var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);
                    var jwt = new { accessToken = encodedToken, expiration = (int)TokenExpiration.TotalSeconds };
                    httpContext.Response.ContentType = "application/json";
                    await httpContext.Response.WriteAsync(JsonConvert.SerializeObject(jwt));
                    return;
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }

            httpContext.Response.StatusCode = 400;
            await httpContext.Response.WriteAsync("Invalid username or password");
        }
        #endregion
    }
}
