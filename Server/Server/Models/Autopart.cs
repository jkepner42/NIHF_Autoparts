using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Autopart
    {
        public int Id { get; set; }
        public int PartNumber { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ManufacturerName { get; set; }
    }
}
