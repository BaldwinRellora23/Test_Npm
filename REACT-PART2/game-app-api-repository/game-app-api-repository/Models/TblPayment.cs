namespace game_app_api_repository.Models
{
    public class TblPayment
    {
        public string LPANo { get; set; }
        public string ORNumber { get; set; }
        public DateTime ORDate { get; set; }
        public decimal ORAmount { get; set; }

    }
}
