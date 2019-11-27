using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using ELearningWEBAPI.Models;

namespace ELearningWEBAPI.Controllers
{
	public class UsersController : ApiController
    {
        private LearningDatabaseEntities db = new LearningDatabaseEntities();

        // GET: api/Users
        public IQueryable<User> GetUsers()
        {
            return db.Users;
        }

        // GET: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUser(int id)
        {
            User user = db.Users.Where(u=>u.userid == id).FirstOrDefault();
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/Users/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUser(int id, User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.userid)
            {
                return BadRequest();
            }

            db.Entry(user).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }


		// POST: api/Users
		[AllowAnonymous]
		[ResponseType(typeof(User))]
		public IHttpActionResult PostUser(User user)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			db.Users.Add(user);
			db.SaveChanges();

			return CreatedAtRoute("DefaultApi", new { id = user.userid }, user);
		}

		[HttpGet]
		[Route("api/GetUserClaims")]
		public User GetUserClaims()
		{
			var identityClaims = (ClaimsIdentity)User.Identity;
			IEnumerable<Claim> claims = identityClaims.Claims;
			User model = new User()
			{
				username = identityClaims.FindFirst("username").Value,
				password = identityClaims.FindFirst("password").Value,
				loggedOn = identityClaims.FindFirst("loggedon").Value,
				userid = Int32.Parse(identityClaims.FindFirst("Id").Value)
			};
			return model;
		}

		// DELETE: api/Users/5
		[ResponseType(typeof(User))]
        public IHttpActionResult DeleteUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            db.SaveChanges();

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.userid == id) > 0;
        }
    }
}