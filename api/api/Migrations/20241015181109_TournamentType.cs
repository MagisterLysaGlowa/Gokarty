using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class TournamentType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TournamentTypeId",
                table: "Tournaments",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TournamentTypes",
                columns: table => new
                {
                    TournamentTypeId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TournamentTypes", x => x.TournamentTypeId);
                });

            migrationBuilder.InsertData(
                table: "TournamentTypes",
                columns: new[] { "TournamentTypeId", "Name" },
                values: new object[,]
                {
                    { 1, "Zapętlony" },
                    { 2, "Nieskończony" }
                });

            migrationBuilder.UpdateData(
                table: "Tournaments",
                keyColumn: "TournamentId",
                keyValue: 1,
                column: "TournamentTypeId",
                value: null);

            migrationBuilder.CreateIndex(
                name: "IX_Tournaments_TournamentTypeId",
                table: "Tournaments",
                column: "TournamentTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tournaments_TournamentTypes_TournamentTypeId",
                table: "Tournaments",
                column: "TournamentTypeId",
                principalTable: "TournamentTypes",
                principalColumn: "TournamentTypeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tournaments_TournamentTypes_TournamentTypeId",
                table: "Tournaments");

            migrationBuilder.DropTable(
                name: "TournamentTypes");

            migrationBuilder.DropIndex(
                name: "IX_Tournaments_TournamentTypeId",
                table: "Tournaments");

            migrationBuilder.DropColumn(
                name: "TournamentTypeId",
                table: "Tournaments");
        }
    }
}
