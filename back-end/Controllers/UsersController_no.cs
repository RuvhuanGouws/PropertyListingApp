using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PropertyApp.Data;
using PropertyApp.Domain;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebApi.Helpers;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController_no : ControllerBase
    {
        private IUserService _userService;
        private readonly UserContext _context;
        private readonly AppSettings _appSettings;

        public UsersController_no(IUserService userService, UserContext context)
        {
            _userService = userService;
            _context = context;
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
      //var response = _userService.Authenticate(model, _context.Users);

      //if (response == null)
      //  return BadRequest(new { message = "Username or password is incorrect" });

      //return Ok(response);
      var user = _context.Users.SingleOrDefault(x => x.Email == model.Email && x.Password == model.Password);
      // return null if user not found
      if (user == null) return null;

      // authentication successful so generate jwt token
      var token = generateJwtToken(user);

      var response = new AuthenticateResponse(user, token);

      return Ok(response);
    }

        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
          _context.Users.Add(user);
          await _context.SaveChangesAsync();

          return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        //[Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
          return await _context.Users.ToListAsync();
        }

        private string generateJwtToken(User user)
        {
          // generate token that is valid for 7 days
          var tokenHandler = new JwtSecurityTokenHandler();
          var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
          var tokenDescriptor = new SecurityTokenDescriptor
          {
            Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
          };
          var token = tokenHandler.CreateToken(tokenDescriptor);
          return tokenHandler.WriteToken(token);
        }
  }
}
