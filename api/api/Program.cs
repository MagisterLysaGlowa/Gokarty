
using api.Data;
using api.Helpers;
using api.Interfaces;
using api.Repositories;
using api.SignalRHubs;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.WebHost.UseUrls([ "http://0.0.0.0:5079","http://localhost:5079" ]);

            // Add services to the container.
            builder.Services.AddSignalR();
            builder.Services.AddControllers();
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<ITournamentRepository, TournamentRepository>();
            builder.Services.AddScoped<IPlayerRepository, PlayerRepository>();
            builder.Services.AddScoped<ISchoolRepository, SchoolRepository>();
            builder.Services.AddScoped<IGokartRepository, GokartRepository>();
            builder.Services.AddScoped<IRideRepository, RideRepository>();
            builder.Services.AddScoped<IQueueRepository, QueueRepository>();
            builder.Services.AddScoped<IJwtService, JwtService>();
            builder.Services.AddScoped<ITournamentTableHubSender, TournamentTableHubSender>();
            builder.Services.AddScoped<IClassRepository, ClassRepository>();

            builder.Services.AddDbContext<AppDbContext>(options =>
            {
                options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection") ??
                    throw new InvalidOperationException("Connection string 'DefaultConnection' not found"));
            });

            builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles
            );

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    builder => builder
                        .WithOrigins("http://localhost:5173") // React app URL
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
            });

            var app = builder.Build();

            app.UseCors("AllowReactApp");

            app.MapHub<TournamentTableHub>("/hubs/tournamentTable");

            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {

            }
            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}
