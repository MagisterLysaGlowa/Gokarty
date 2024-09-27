using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class SeedDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "TournamentStates",
                columns: new[] { "TournamentStateId", "State" },
                values: new object[,]
                {
                    { 1, "Zaplanowane" },
                    { 2, "W trakcie" },
                    { 3, "Zakończone" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "TournamentStates",
                keyColumn: "TournamentStateId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "TournamentStates",
                keyColumn: "TournamentStateId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "TournamentStates",
                keyColumn: "TournamentStateId",
                keyValue: 3);
        }
    }
}
