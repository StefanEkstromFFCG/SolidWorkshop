using System;
using System.ComponentModel.DataAnnotations;

namespace FFCG.G5.SolidWebShop.Web.Server.Models
{
    public class User
    {
        public int ID { get; set; }
        public string Name { get; set; }

        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [DataType(DataType.Date)]
        public DateTime EntryTime { get; set; }

        public User()
        {
            EntryTime = DateTime.Now;
        }
    }
}
