using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PropertyApp.Data;
using WebApi.Helpers;
using PropertyApp.ViewModels;
using Microsoft.Extensions.Options;
using PropertyApp.API;

namespace WebApi.Controllers
{
  [Route("[controller]")]
  [ApiController]
  [EnableCors]
  public class UserController : ControllerBase
  {
    //private readonly UserContext _context;
    private readonly IUserService _userService;
    private readonly AppSettings _appSettings;

    public UserController(IUserService userService, IOptions<AppSettings> appSettings)
    {
      _userService = userService;
      _appSettings = appSettings.Value;
    }

    // GET: api/User
    //[HttpGet]
    //public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    //{
    //  return await _context.Users.ToListAsync();
    //}

    [HttpPost("authenticate")]
    public IActionResult Authenticate(AuthenticateRequest model)
    {
      var response = _userService.Authenticate(model);
      
      if (response == null)
            return BadRequest(new { message = "Username or password is incorrect" });

      return Ok(response);
    }


    //// GET: api/User/5
    //[Authorize]
    //[HttpGet("{id}")]
    //public async Task<ActionResult<User>> GetUser(int id)
    //{
    //  var user = await _userService.Users.FindAsync(id);

    //  if (user == null)
    //  {
    //    return NotFound();
    //  }

    //  return user;
    //}

    // PUT: api/User/5
    // To protect from overposting attacks, enable the specific properties you want to bind to, for
    // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
    //[Authorize]
    //[HttpPut("{id}")]
    //public async Task<IActionResult> PutUser(int id, User user)
    //{
    //  if (id != user.Id)
    //  {
    //    return BadRequest();
    //  }

    //  _context.Entry(user).State = EntityState.Modified;

    //  try
    //  {
    //    await _context.SaveChangesAsync();
    //  }
    //  catch (DbUpdateConcurrencyException)
    //  {
    //    if (!UserExists(id))
    //    {
    //      return NotFound();
    //    }
    //    else
    //    {
    //      throw;
    //    }
    //  }

    //  return NoContent();
    //}

    // POST: api/User
    // To protect from overposting attacks, enable the specific properties you want to bind to, for
    // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
    [HttpPost]
    public IActionResult PostUser(User user)
    {
      var userTemp = _userService.Find(user); 

      if (userTemp != null)
          return BadRequest(new { message = "The email is already linked to an account." });

      _userService.AddUser(user);

      return Ok(CreatedAtAction("GetUser", new { id = user.Id }, user));
    }

    // DELETE: api/User/5
    //[Authorize]
    //[HttpDelete("{id}")]
    //public async Task<ActionResult<User>> DeleteUser(int id)
    //{
    //  var user = await _context.Users.FindAsync(id);
    //  if (user == null)
    //  {
    //    return NotFound();
    //  }

    //  _context.Users.Remove(user);
    //  await _context.SaveChangesAsync();

    //  return user;
    //}

    //private bool UserExists(int id)
    //{
    //  return _context.Users.Any(e => e.Id == id);
    //}

    private string generateJwtToken(UserModel user)
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
