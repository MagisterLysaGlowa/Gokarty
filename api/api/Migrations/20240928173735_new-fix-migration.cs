using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class newfixmigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GokartId",
                table: "Queues",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Queues_GokartId",
                table: "Queues",
                column: "GokartId");

            migrationBuilder.AddForeignKey(
                name: "FK_Queues_Gokarts_GokartId",
                table: "Queues",
                column: "GokartId",
                principalTable: "Gokarts",
                principalColumn: "GokartId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Queues_Gokarts_GokartId",
                table: "Queues");

            migrationBuilder.DropIndex(
                name: "IX_Queues_GokartId",
                table: "Queues");

            migrationBuilder.DropColumn(
                name: "GokartId",
                table: "Queues");
        }
    }
}
