using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class additionallmigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                name: "Rides",
                columns: table => new
                {
                    RideId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TournamentId = table.Column<int>(type: "integer", nullable: false),
                    PlayerId = table.Column<int>(type: "integer", nullable: false),
                    GokartId = table.Column<int>(type: "integer", nullable: false),
                    Time = table.Column<string>(type: "text", nullable: true),
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

            migrationBuilder.CreateTable(
                name: "Queues",
                columns: table => new
                {
                    QueueId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TournamentId = table.Column<int>(type: "integer", nullable: false),
                    PlayerId = table.Column<int>(type: "integer", nullable: false),
                    QueuePosition = table.Column<int>(type: "integer", nullable: false),
                    RideStatusId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Queues", x => x.QueueId);
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

            migrationBuilder.InsertData(
                table: "RideStatuses",
                columns: new[] { "RideStatusId", "State" },
                values: new object[,]
                {
                    { 1, "Oczekuje" },
                    { 2, "W trakcie" },
                    { 3, "Zakończył" }
                });

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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Queues");

            migrationBuilder.DropTable(
                name: "Rides");

            migrationBuilder.DropTable(
                name: "RideStatuses");
        }
    }
}
