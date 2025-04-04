using api.Dtos;
using api.Interfaces;
using api.Repositories;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace api.SignalRHubs
{
    public class TournamentTableHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "tournamentTable");
            await base.OnConnectedAsync();
        }
    }

    public class TournamentTableHubSender : ITournamentTableHubSender
    {
        private readonly IHubContext<TournamentTableHub> hubContext;
        private readonly IQueueRepository queueRepository;
        private readonly IRideRepository rideRepository;

        public TournamentTableHubSender(IHubContext<TournamentTableHub> hubContext, IQueueRepository queueRepository, IRideRepository rideRepository)
        {
            this.hubContext = hubContext;
            this.queueRepository = queueRepository;
            this.rideRepository = rideRepository;
        }

        public async Task SendUpdate(int tournamentId)
        {
            await hubContext.Clients.Groups("tournamentTable").SendAsync("tournamentTableUpdate", new TournemntTableUpdateDto()
            {
                Queue = await queueRepository.GetAllForTournamentAsync(tournamentId),
                LastRide = await rideRepository.FullGetLastAddedForTournamentAsync(tournamentId),
                Rides = await rideRepository.FullGetBestForTournamentAsync(tournamentId),
            });
        }
    }
}
