using System.ComponentModel.DataAnnotations;

namespace game_app_api_repository.Models
{

    public class TblPlanholder
    {
        [Key]
        public string lpaNo { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string middleName { get; set; }
        public DateTime birthDate { get; set; }
        public string address { get; set; }
        public string mobileNumber { get; set; }
        public string planCode { get; set; }
        public decimal totalAmountPayable { get; set; }
        public DateTime dueDate { get; set; }
    }

}
