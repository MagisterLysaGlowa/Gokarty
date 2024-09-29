using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class emigracja : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "PlayerTournaments",
                columns: new[] { "PlayersId", "TournamentsId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 2, 1 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "PlayerTournaments",
                keyColumns: new[] { "PlayersId", "TournamentsId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "PlayerTournaments",
                keyColumns: new[] { "PlayersId", "TournamentsId" },
                keyValues: new object[] { 2, 1 });
        }
    }
}
