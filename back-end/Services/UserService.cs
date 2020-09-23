using Microsoft.Extensions.Options;
using PropertyApp.Data;
using PropertyApp.ViewModels;
using System.Linq;
using WebApi.Helpers;




using Microsoft.IdentityModel.Tokens;

using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;

using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace PropertyApp.API
{
  public interface IUserService
  {
    AuthenticateResponse Authenticate(AuthenticateRequest model);
    IEnumerable<UserModel> GetAll();
    UserModel GetById(int id);
    UserModel Find(User user);
    UserModel AddUser(User user);

    public ActionResult<UserModel> Update(User user);

    public ActionResult<UserModel> ChangePw(PasswordChange passwordChange);
  }

  public class UserService : IUserService
  {
    private readonly AppSettings _appSettings;
    private readonly PropertyContext _userContext;
    
    public UserService(IOptions<AppSettings> appSettings, PropertyContext userContext)
    {
      _appSettings = appSettings.Value;
      _userContext = userContext;
    }

    public AuthenticateResponse Authenticate(AuthenticateRequest model)
    {
      var user = _userContext.Users.SingleOrDefault(x => x.Email == model.Email && x.Password == model.Password);

      // return null if user not found
      if (user == null) return null;

      var userModel = Map(user);
      // authentication successful so generate jwt token
      var token = generateJwtToken(userModel);

      return new AuthenticateResponse(userModel, token);
    }

    private UserModel Map(User user)
    {
      return new UserModel
      {
        Id = user.Id,
        FirstName = user.FirstName,
        LastName = user.LastName,
        Email = user.Email
      };
    }


    public IEnumerable<UserModel> GetAll()
    {
      return _userContext.Users.Select(u => Map(u));
    }

    public UserModel GetById(int id)
    {
      return Map(_userContext.Users.FirstOrDefault(x => x.Id == id));
    }

    public UserModel Find(User user)
    {
      var userTemp = _userContext.Users.FirstOrDefault(x => x.Email == user.Email);
      if (userTemp == null)
        return null;
      return Map(userTemp); 
    }

    public UserModel AddUser(User user)
    {
      _userContext.Add(user);
      _userContext.SaveChanges();
      var userModel = Map(user);
      return userModel;
    }

    public ActionResult<UserModel> Update(User user)
    {
      var userTemp = _userContext.Users.SingleOrDefault(userP => userP.Id == user.Id);
      if (userTemp != null)
      {
        _userContext.Entry(user).State = EntityState.Detached;
        _userContext.Users.Attach(user);
        _userContext.Entry(user).State = EntityState.Modified;
        _userContext.SaveChanges();
      }

      return Map(user);
    }

    public ActionResult<UserModel> ChangePw(PasswordChange passwordChange)
    {
      var userTemp = _userContext.Users.SingleOrDefault(userP => userP.Id == passwordChange.user.Id);

      if (userTemp.Password != passwordChange.pw)
      {
        return null;
      }
      userTemp.Password = passwordChange.newPw;
      if (userTemp != null)
      {
        _userContext.Entry(passwordChange.user).State = EntityState.Detached;
        _userContext.Users.Attach(passwordChange.user);
        _userContext.Entry(passwordChange.user).State = EntityState.Modified;
        _userContext.SaveChanges();
      }

      return Map(passwordChange.user);
    }

    // helper methods

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
