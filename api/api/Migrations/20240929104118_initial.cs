using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Gokarts",
                columns: table => new
                {
                    GokartId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gokarts", x => x.GokartId);
                });

            migrationBuilder.CreateTable(
                name: "RideStatuses",
                columns: table => new
                {
                    RideStatusId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    State = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RideStatuses", x => x.RideStatusId);
                });

            migrationBuilder.CreateTable(
                name: "Schools",
                columns: table => new
                {
                    SchoolId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    City = table.Column<string>(type: "text", nullable: true),
                    Acronym = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schools", x => x.SchoolId);
                });

            migrationBuilder.CreateTable(
                name: "TournamentStates",
                columns: table => new
                {
                    TournamentStateId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    State = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TournamentStates", x => x.TournamentStateId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Login = table.Column<string>(type: "text", nullable: true),
                    Password = table.Column<string>(type: "text", nullable: true),
                    Access = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Players",
                columns: table => new
                {
                    PlayerId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Surname = table.Column<string>(type: "text", nullable: true),
                    BirthDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    SchoolId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Players", x => x.PlayerId);
                    table.ForeignKey(
                        name: "FK_Players_Schools_SchoolId",
                        column: x => x.SchoolId,
                        principalTable: "Schools",
                        principalColumn: "SchoolId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tournaments",
                columns: table => new
                {
                    TournamentId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    TournamentStateId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tournaments", x => x.TournamentId);
                    table.ForeignKey(
                        name: "FK_Tournaments_TournamentStates_TournamentStateId",
                        column: x => x.TournamentStateId,
                        principalTable: "TournamentStates",
                        principalColumn: "TournamentStateId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PlayerTournaments",
                columns: table => new
                {
                    PlayersId = table.Column<int>(type: "integer", nullable: false),
                    TournamentsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlayerTournaments", x => new { x.PlayersId, x.TournamentsId });
                    table.ForeignKey(
                        name: "FK_PlayerTournaments_Players_PlayersId",
                        column: x => x.PlayersId,
                        principalTable: "Players",
                        principalColumn: "PlayerId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlayerTournaments_Tournaments_TournamentsId",
                        column: x => x.TournamentsId,
                        principalTable: "Tournaments",
                        principalColumn: "TournamentId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Queues",
                columns: table => new
                {
                    QueueId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TournamentId = table.Column<int>(type: "integer", nullable: false),
                    PlayerId = table.Column<int>(type: "integer", nullable: false),
                    QueuePosition = table.Column<int>(type: "integer", nullable: false),
                    GokartId = table.Column<int>(type: "integer", nullable: false),
                    RideStatusId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Queues", x => x.QueueId);
                    table.ForeignKey(
                        name: "FK_Queues_Gokarts_GokartId",
                        column: x => x.GokartId,
                        principalTable: "Gokarts",
                        principalColumn: "GokartId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Queues_Players_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Players",
                        principalColumn: "PlayerId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Queues_RideStatuses_RideStatusId",
                        column: x => x.RideStatusId,
                        principalTable: "RideStatuses",
                        principalColumn: "RideStatusId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Queues_Tournaments_TournamentId",
                        column: x => x.TournamentId,
                        principalTable: "Tournaments",
                        principalColumn: "TournamentId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Rides",
                columns: table => new
                {
                    RideId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TournamentId = table.Column<int>(type: "integer", nullable: false),
                    PlayerId = table.Column<int>(type: "integer", nullable: false),
                    GokartId = table.Column<int>(type: "integer", nullable: false),
                    Time = table.Column<int>(type: "integer", nullable: true),
                    RideNumber = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rides", x => x.RideId);
                    table.ForeignKey(
                        name: "FK_Rides_Gokarts_GokartId",
                        column: x => x.GokartId,
                        principalTable: "Gokarts",
                        principalColumn: "GokartId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Rides_Players_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Players",
                        principalColumn: "PlayerId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Rides_Tournaments_TournamentId",
                        column: x => x.TournamentId,
                        principalTable: "Tournaments",
                        principalColumn: "TournamentId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Gokarts",
                columns: new[] { "GokartId", "Name" },
                values: new object[,]
                {
                    { 1, "Czarny 1" },
                    { 2, "Czarny 2" }
                });

            migrationBuilder.InsertData(
                table: "RideStatuses",
                columns: new[] { "RideStatusId", "State" },
                values: new object[,]
                {
                    { 1, "Oczekuje" },
                    { 2, "W trakcie" },
                    { 3, "Zakończył" }
                });

            migrationBuilder.InsertData(
                table: "Schools",
                columns: new[] { "SchoolId", "Acronym", "City", "Name" },
                values: new object[] { 1, "ZSTIO", "Limanowa", "ZSTIO" });

            migrationBuilder.InsertData(
                table: "TournamentStates",
                columns: new[] { "TournamentStateId", "State" },
                values: new object[,]
                {
                    { 1, "Zaplanowane" },
                    { 2, "W trakcie" },
                    { 3, "Zakończone" }
                });

            migrationBuilder.InsertData(
                table: "Players",
                columns: new[] { "PlayerId", "BirthDate", "Name", "SchoolId", "Surname" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 10, 5, 12, 0, 0, 0, DateTimeKind.Utc), "Maciej", 1, "Traktor" },
                    { 2, new DateTime(2024, 10, 5, 12, 0, 0, 0, DateTimeKind.Utc), "Michalina", 1, "Ciągnik" }
                });

            migrationBuilder.InsertData(
                table: "Tournaments",
                columns: new[] { "TournamentId", "EndDate", "Name", "StartDate", "TournamentStateId" },
                values: new object[] { 1, new DateTime(2024, 10, 5, 12, 0, 0, 0, DateTimeKind.Utc), "Wyścig", new DateTime(2024, 10, 5, 12, 0, 0, 0, DateTimeKind.Utc), 1 });

            migrationBuilder.CreateIndex(
                name: "IX_PlayerTournaments_TournamentsId",
                table: "PlayerTournaments",
                column: "TournamentsId");

            migrationBuilder.CreateIndex(
                name: "IX_Players_SchoolId",
                table: "Players",
                column: "SchoolId");

            migrationBuilder.CreateIndex(
                name: "IX_Queues_GokartId",
                table: "Queues",
                column: "GokartId");

            migrationBuilder.CreateIndex(
                name: "IX_Queues_PlayerId",
                table: "Queues",
                column: "PlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_Queues_RideStatusId",
                table: "Queues",
                column: "RideStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Queues_TournamentId",
                table: "Queues",
                column: "TournamentId");

            migrationBuilder.CreateIndex(
                name: "IX_Rides_GokartId",
                table: "Rides",
                column: "GokartId");

            migrationBuilder.CreateIndex(
                name: "IX_Rides_PlayerId",
                table: "Rides",
                column: "PlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_Rides_TournamentId",
                table: "Rides",
                column: "TournamentId");

            migrationBuilder.CreateIndex(
                name: "IX_Tournaments_TournamentStateId",
                table: "Tournaments",
                column: "TournamentStateId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PlayerTournaments");

            migrationBuilder.DropTable(
                name: "Queues");

            migrationBuilder.DropTable(
                name: "Rides");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "RideStatuses");

            migrationBuilder.DropTable(
                name: "Gokarts");

            migrationBuilder.DropTable(
                name: "Players");

            migrationBuilder.DropTable(
                name: "Tournaments");

            migrationBuilder.DropTable(
                name: "Schools");

            migrationBuilder.DropTable(
                name: "TournamentStates");
        }
    }
}
