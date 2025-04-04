using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class removedRideState : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Queues_RideStatuses_RideStatusId",
                table: "Queues");

            migrationBuilder.DropTable(
                name: "RideStatuses");

            migrationBuilder.DropIndex(
                name: "IX_Queues_RideStatusId",
                table: "Queues");

            migrationBuilder.DropColumn(
                name: "RideStatusId",
                table: "Queues");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RideStatusId",
                table: "Queues",
                type: "integer",
                nullable: false,
                defaultValue: 0);

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
                name: "IX_Queues_RideStatusId",
                table: "Queues",
                column: "RideStatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_Queues_RideStatuses_RideStatusId",
                table: "Queues",
                column: "RideStatusId",
                principalTable: "RideStatuses",
                principalColumn: "RideStatusId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
