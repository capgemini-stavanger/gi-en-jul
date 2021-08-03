namespace GiEnJul.Dtos
{
    public class GetRecaptchaDto
    {
        public bool Success { get; set; }
        public string Challenge_ts { get; set; }
        public string Hostname { get; set; }
        public float Score { get; set; }
        public string Action { get; set; }
        public string[] ErrorCodes { get; set; }
    }
}
