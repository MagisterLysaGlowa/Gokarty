using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class onDeleteRestrict : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Classes_Schools_SchoolId",
                table: "Classes");

            migrationBuilder.DropForeignKey(
                name: "FK_PlayerTournaments_Players_PlayersId",
                table: "PlayerTournaments");

            migrationBuilder.DropForeignKey(
                name: "FK_PlayerTournaments_Tournaments_TournamentsId",
                table: "PlayerTournaments");

            migrationBuilder.DropForeignKey(
                name: "FK_Players_Classes_ClassId",
                table: "Players");

            migrationBuilder.DropForeignKey(
                name: "FK_Queues_Gokarts_GokartId",
                table: "Queues");

            migrationBuilder.DropForeignKey(
                name: "FK_Queues_Players_PlayerId",
                table: "Queues");

            migrationBuilder.DropForeignKey(
                name: "FK_Queues_Tournaments_TournamentId",
                table: "Queues");

            migrationBuilder.DropForeignKey(
                name: "FK_RideGroups_Classes_ClassId",
                table: "RideGroups");

            migrationBuilder.DropForeignKey(
                name: "FK_RideGroups_Players_PlayerId",
                table: "RideGroups");

            migrationBuilder.DropForeignKey(
                name: "FK_RideGroups_Tournaments_TournamentId",
                table: "RideGroups");

            migrationBuilder.DropForeignKey(
                name: "FK_Rides_Gokarts_GokartId",
                table: "Rides");

            migrationBuilder.DropForeignKey(
                name: "FK_Rides_RideGroups_RideGroupId",
                table: "Rides");

            migrationBuilder.DropForeignKey(
                name: "FK_Tournaments_TournamentStates_TournamentStateId",
                table: "Tournaments");

            migrationBuilder.DropForeignKey(
                name: "FK_Tournaments_TournamentTypes_TournamentTypeId",
                table: "Tournaments");

            migrationBuilder.AddForeignKey(
                name: "FK_Classes_Schools_SchoolId",
                table: "Classes",
                column: "SchoolId",
                principalTable: "Schools",
                principalColumn: "SchoolId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PlayerTournaments_Players_PlayersId",
                table: "PlayerTournaments",
                column: "PlayersId",
                principalTable: "Players",
                principalColumn: "PlayerId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PlayerTournaments_Tournaments_TournamentsId",
                table: "PlayerTournaments",
                column: "TournamentsId",
                principalTable: "Tournaments",
                principalColumn: "TournamentId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Players_Classes_ClassId",
                table: "Players",
                column: "ClassId",
                principalTable: "Classes",
                principalColumn: "ClassId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Queues_Gokarts_GokartId",
                table: "Queues",
                column: "GokartId",
                principalTable: "Gokarts",
                principalColumn: "GokartId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Queues_Players_PlayerId",
                table: "Queues",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "PlayerId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Queues_Tournaments_TournamentId",
                table: "Queues",
                column: "TournamentId",
                principalTable: "Tournaments",
                principalColumn: "TournamentId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RideGroups_Classes_ClassId",
                table: "RideGroups",
                column: "ClassId",
                principalTable: "Classes",
                principalColumn: "ClassId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RideGroups_Players_PlayerId",
                table: "RideGroups",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "PlayerId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RideGroups_Tournaments_TournamentId",
                table: "RideGroups",
                column: "TournamentId",
                principalTable: "Tournaments",
                principalColumn: "TournamentId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Rides_Gokarts_GokartId",
                table: "Rides",
                column: "GokartId",
                principalTable: "Gokarts",
                principalColumn: "GokartId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Rides_RideGroups_RideGroupId",
                table: "Rides",
                column: "RideGroupId",
                principalTable: "RideGroups",
                principalColumn: "RideGroupId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tournaments_TournamentStates_TournamentStateId",
                table: "Tournaments",
                column: "TournamentStateId",
                principalTable: "TournamentStates",
                principalColumn: "TournamentStateId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tournaments_TournamentTypes_TournamentTypeId",
                table: "Tournaments",
                column: "TournamentTypeId",
                principalTable: "TournamentTypes",
                principalColumn: "TournamentTypeId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Classes_Schools_SchoolId",
                table: "Classes");

            migrationBuilder.DropForeignKey(
                name: "FK_PlayerTournaments_Players_PlayersId",
                table: "PlayerTournaments");

            migrationBuilder.DropForeignKey(
                name: "FK_PlayerTournaments_Tournaments_TournamentsId",
                table: "PlayerTournaments");

            migrationBuilder.DropForeignKey(
                name: "FK_Players_Classes_ClassId",
                table: "Players");

            migrationBuilder.DropForeignKey(
                name: "FK_Queues_Gokarts_GokartId",
                table: "Queues");

            migrationBuilder.DropForeignKey(
                name: "FK_Queues_Players_PlayerId",
                table: "Queues");

            migrationBuilder.DropForeignKey(
                name: "FK_Queues_Tournaments_TournamentId",
                table: "Queues");

            migrationBuilder.DropForeignKey(
                name: "FK_RideGroups_Classes_ClassId",
                table: "RideGroups");

            migrationBuilder.DropForeignKey(
                name: "FK_RideGroups_Players_PlayerId",
                table: "RideGroups");

            migrationBuilder.DropForeignKey(
                name: "FK_RideGroups_Tournaments_TournamentId",
                table: "RideGroups");

            migrationBuilder.DropForeignKey(
                name: "FK_Rides_Gokarts_GokartId",
                table: "Rides");

            migrationBuilder.DropForeignKey(
                name: "FK_Rides_RideGroups_RideGroupId",
                table: "Rides");

            migrationBuilder.DropForeignKey(
                name: "FK_Tournaments_TournamentStates_TournamentStateId",
                table: "Tournaments");

            migrationBuilder.DropForeignKey(
                name: "FK_Tournaments_TournamentTypes_TournamentTypeId",
                table: "Tournaments");

            migrationBuilder.AddForeignKey(
                name: "FK_Classes_Schools_SchoolId",
                table: "Classes",
                column: "SchoolId",
                principalTable: "Schools",
                principalColumn: "SchoolId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PlayerTournaments_Players_PlayersId",
                table: "PlayerTournaments",
                column: "PlayersId",
                principalTable: "Players",
                principalColumn: "PlayerId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PlayerTournaments_Tournaments_TournamentsId",
                table: "PlayerTournaments",
                column: "TournamentsId",
                principalTable: "Tournaments",
                principalColumn: "TournamentId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Players_Classes_ClassId",
                table: "Players",
                column: "ClassId",
                principalTable: "Classes",
                principalColumn: "ClassId");

            migrationBuilder.AddForeignKey(
                name: "FK_Queues_Gokarts_GokartId",
                table: "Queues",
                column: "GokartId",
                principalTable: "Gokarts",
                principalColumn: "GokartId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Queues_Players_PlayerId",
                table: "Queues",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "PlayerId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Queues_Tournaments_TournamentId",
                table: "Queues",
                column: "TournamentId",
                principalTable: "Tournaments",
                principalColumn: "TournamentId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RideGroups_Classes_ClassId",
                table: "RideGroups",
                column: "ClassId",
                principalTable: "Classes",
                principalColumn: "ClassId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RideGroups_Players_PlayerId",
                table: "RideGroups",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "PlayerId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RideGroups_Tournaments_TournamentId",
                table: "RideGroups",
                column: "TournamentId",
                principalTable: "Tournaments",
                principalColumn: "TournamentId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rides_Gokarts_GokartId",
                table: "Rides",
                column: "GokartId",
                principalTable: "Gokarts",
                principalColumn: "GokartId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rides_RideGroups_RideGroupId",
                table: "Rides",
                column: "RideGroupId",
                principalTable: "RideGroups",
                principalColumn: "RideGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tournaments_TournamentStates_TournamentStateId",
                table: "Tournaments",
                column: "TournamentStateId",
                principalTable: "TournamentStates",
                principalColumn: "TournamentStateId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tournaments_TournamentTypes_TournamentTypeId",
                table: "Tournaments",
                column: "TournamentTypeId",
                principalTable: "TournamentTypes",
                principalColumn: "TournamentTypeId");
        }
    }
}
