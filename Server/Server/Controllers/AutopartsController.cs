using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using LiteDB;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.Controllers
{
    [Route("api/autoparts")]
    public class AutopartsController : Controller
    {
        // GET: api/autoparts
        [HttpGet]
        public IEnumerable<Autopart> Get()
        {
            using(var db = new LiteDatabase(@"autoparts.db"))
            {
                var autoparts = db.GetCollection<Autopart>("autoparts");
                return autoparts.FindAll();
            }
        }
        
        // POST api/autoparts
        [HttpPost]
        public void Post([FromBody]Autopart value)
        {
            using(var db = new LiteDatabase(@"autoparts.db"))
            {
                var autoparts = db.GetCollection<Autopart>("autoparts");
                autoparts.Insert(value);
            }
        }

        // PUT api/autoparts/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Autopart value)
        {
            using (var db = new LiteDatabase(@"autoparts.db"))
            {
                var autoparts = db.GetCollection<Autopart>("autoparts");
                //var part = autoparts.Find(Query.EQ("Id", value.Id)).SingleOrDefault();
                var part = autoparts.FindOne(p => p.Id == id);
                if (part == null) { return; }
                part.Id = value.Id;
                part.PartNumber = value.PartNumber;
                part.Name = value.Name;
                part.Description = value.Description;
                part.ManufacturerName = value.ManufacturerName;
                autoparts.Update(part);
            }
        }

        // DELETE api/autoparts/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            using (var db = new LiteDatabase(@"autoparts.db"))
            {
                var autoparts = db.GetCollection<Autopart>("autoparts");
                var part = autoparts.Delete(p => p.Id == id);
            }
        }

        [HttpOptions]
        public void Options()
        {
            header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");
            header("Access-Control-Allow-Headers: X-PINGARUNER, Content-Length, Content-Type");
            header("Access-Control-Max-Age: 1728000");
            header("Content-Length: 0");
            header("Content-Type: text/plain");
        }

        [HttpOptions("{id}")]
        public void Options(int id)
        {
            header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");
            header("Access-Control-Allow-Headers: X-PINGARUNER, Content-Length, Content-Type");
            header("Access-Control-Max-Age: 1728000");
            header("Content-Length: 0");
            header("Content-Type: text/plain");
        }

        private void header(string s)
        {
            var split = s.Split(":");
            HttpContext.Response.Headers.Add(split[0].Trim(), split[1].Trim());
        }
    }
}
