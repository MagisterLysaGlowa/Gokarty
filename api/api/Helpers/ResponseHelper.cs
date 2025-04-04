namespace api.Helpers {
    public class ResponseHelper {
        public int Status { get; set; }
        public string StatusText { get; set; } = String.Empty;
        public string Message { get; set; } = String.Empty;

        public ResponseHelper(int status, string statusText, string message) {
            Status = status;
            StatusText = statusText;
            Message = message;
        }
    }
}