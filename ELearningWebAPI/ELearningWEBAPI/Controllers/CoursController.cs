using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using ELearningWEBAPI.Models;

namespace ELearningWEBAPI.Controllers
{
	public class CoursController : ApiController
    {
        private LearningDatabaseEntities db = new LearningDatabaseEntities();

        // GET: api/Cours
        public IQueryable<Cours> GetCourses()
        {
            return db.Courses;
        }

        // GET: api/Cours/5
        [ResponseType(typeof(Cours))]
        public IHttpActionResult GetCours(int id)
        {
            Cours cours = db.Courses.Find(id);
            if (cours == null)
            {
                return NotFound();
            }

            return Ok(cours);
        }

		[HttpGet]
		public HttpResponseMessage GetPdf(string filename)
		{

			string path = @"C://Samples//" + filename;
			byte[] pdf = System.IO.File.ReadAllBytes(path);
			HttpResponseMessage result = Request.CreateResponse(HttpStatusCode.OK);
			result.Content = new ByteArrayContent(pdf);
			result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("inline");
			result.Content.Headers.ContentDisposition.FileName = filename;
			result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
			return result;

		}


		// PUT: api/Cours/5
		[ResponseType(typeof(void))]
        public IHttpActionResult PutCours(int id, Cours cours)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cours.courseid)
            {
                return BadRequest();
            }

            db.Entry(cours).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CoursExists(id))
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

        // POST: api/Cours
        [ResponseType(typeof(Cours))]
        public IHttpActionResult PostCours(Cours cours)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Courses.Add(cours);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = cours.courseid }, cours);
        }

        // DELETE: api/Cours/5
        [ResponseType(typeof(Cours))]
        public IHttpActionResult DeleteCours(int id)
        {
            Cours cours = db.Courses.Find(id);
            if (cours == null)
            {
                return NotFound();
            }

            db.Courses.Remove(cours);
            db.SaveChanges();

            return Ok(cours);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CoursExists(int id)
        {
            return db.Courses.Count(e => e.courseid == id) > 0;
        }
    }
}