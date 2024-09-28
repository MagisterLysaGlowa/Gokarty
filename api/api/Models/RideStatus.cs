namespace api.Models
{
    public class RideStatus
    {
        public int RideStatusId { get; set; }
        public string? State { get; set; }
        public ICollection<Queue> Queues { get; } = default!;
    }
}
