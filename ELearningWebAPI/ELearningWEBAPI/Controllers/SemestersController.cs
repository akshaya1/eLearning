using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using ELearningWEBAPI.Models;

namespace ELearningWEBAPI.Controllers
{
	[EnableCors(origins: "*", headers: "*", methods: "*")]
	public class SemestersController : ApiController
    {
        private LearningDatabaseEntities db = new LearningDatabaseEntities();

        // GET: api/Semesters
        public IQueryable<Semester> GetSemesters()
        {
            return db.Semesters;
        }

        // GET: api/Semesters/5
        [ResponseType(typeof(Semester))]
        public IHttpActionResult GetSemester(int id)
        {
            Semester semester = db.Semesters.Find(id);
            if (semester == null)
            {
                return NotFound();
            }

            return Ok(semester);
        }

        // PUT: api/Semesters/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSemester(int id, Semester semester)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != semester.semesterid)
            {
                return BadRequest();
            }

            db.Entry(semester).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SemesterExists(id))
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

        // POST: api/Semesters
        [ResponseType(typeof(Semester))]
        public IHttpActionResult PostSemester(Semester semester)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Semesters.Add(semester);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = semester.semesterid }, semester);
        }

        // DELETE: api/Semesters/5
        [ResponseType(typeof(Semester))]
        public IHttpActionResult DeleteSemester(int id)
        {
            Semester semester = db.Semesters.Find(id);
            if (semester == null)
            {
                return NotFound();
            }

            db.Semesters.Remove(semester);
            db.SaveChanges();

            return Ok(semester);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SemesterExists(int id)
        {
            return db.Semesters.Count(e => e.semesterid == id) > 0;
        }
    }
}