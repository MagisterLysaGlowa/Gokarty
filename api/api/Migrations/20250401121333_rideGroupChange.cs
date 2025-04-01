using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class rideGroupChange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rides_Players_PlayerId",
                table: "Rides");

            migrationBuilder.DropForeignKey(
                name: "FK_Rides_Tournaments_TournamentId",
                table: "Rides");

            migrationBuilder.DropIndex(
                name: "IX_Rides_PlayerId",
                table: "Rides");

            migrationBuilder.DropIndex(
                name: "IX_Rides_TournamentId",
                table: "Rides");

            migrationBuilder.DropColumn(
                name: "PlayerId",
                table: "Rides");

            migrationBuilder.DropColumn(
                name: "TournamentId",
                table: "Rides");

            migrationBuilder.AddColumn<int>(
                name: "RideGroupId",
                table: "Rides",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "RideGroups",
                columns: table => new
                {
                    RideGroupId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PlayerId = table.Column<int>(type: "integer", nullable: false),
                    TournamentId = table.Column<int>(type: "integer", nullable: false),
                    ClassId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RideGroups", x => x.RideGroupId);
                    table.ForeignKey(
                        name: "FK_RideGroups_Classes_ClassId",
                        column: x => x.ClassId,
                        principalTable: "Classes",
                        principalColumn: "ClassId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RideGroups_Players_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Players",
                        principalColumn: "PlayerId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RideGroups_Tournaments_TournamentId",
                        column: x => x.TournamentId,
                        principalTable: "Tournaments",
                        principalColumn: "TournamentId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rides_RideGroupId",
                table: "Rides",
                column: "RideGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_RideGroups_ClassId",
                table: "RideGroups",
                column: "ClassId");

            migrationBuilder.CreateIndex(
                name: "IX_RideGroups_PlayerId",
                table: "RideGroups",
                column: "PlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_RideGroups_TournamentId",
                table: "RideGroups",
                column: "TournamentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rides_RideGroups_RideGroupId",
                table: "Rides",
                column: "RideGroupId",
                principalTable: "RideGroups",
                principalColumn: "RideGroupId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rides_RideGroups_RideGroupId",
                table: "Rides");

            migrationBuilder.DropTable(
                name: "RideGroups");

            migrationBuilder.DropIndex(
                name: "IX_Rides_RideGroupId",
                table: "Rides");

            migrationBuilder.DropColumn(
                name: "RideGroupId",
                table: "Rides");

            migrationBuilder.AddColumn<int>(
                name: "PlayerId",
                table: "Rides",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TournamentId",
                table: "Rides",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Rides_PlayerId",
                table: "Rides",
                column: "PlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_Rides_TournamentId",
                table: "Rides",
                column: "TournamentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rides_Players_PlayerId",
                table: "Rides",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "PlayerId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rides_Tournaments_TournamentId",
                table: "Rides",
                column: "TournamentId",
                principalTable: "Tournaments",
                principalColumn: "TournamentId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
