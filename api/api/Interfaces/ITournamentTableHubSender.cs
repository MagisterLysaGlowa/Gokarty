namespace api.Interfaces
{
    public interface ITournamentTableHubSender
    {
        public Task SendUpdate(int tournamentId);
    }
}
