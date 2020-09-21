using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyApp.Data.Migrations
{
    public partial class final : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "status",
                table: "Adverts",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "province",
                table: "Adverts",
                newName: "Province");

            migrationBuilder.RenameColumn(
                name: "price",
                table: "Adverts",
                newName: "Price");

            migrationBuilder.RenameColumn(
                name: "header",
                table: "Adverts",
                newName: "Header");

            migrationBuilder.RenameColumn(
                name: "details",
                table: "Adverts",
                newName: "Details");

            migrationBuilder.RenameColumn(
                name: "city",
                table: "Adverts",
                newName: "City");

            migrationBuilder.AddColumn<bool>(
                name: "Admin",
                table: "Users",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                table: "Adverts",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "money(18,2)");

            migrationBuilder.AddColumn<bool>(
                name: "Featured",
                table: "Adverts",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Admin",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Featured",
                table: "Adverts");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Adverts",
                newName: "status");

            migrationBuilder.RenameColumn(
                name: "Province",
                table: "Adverts",
                newName: "province");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Adverts",
                newName: "price");

            migrationBuilder.RenameColumn(
                name: "Header",
                table: "Adverts",
                newName: "header");

            migrationBuilder.RenameColumn(
                name: "Details",
                table: "Adverts",
                newName: "details");

            migrationBuilder.RenameColumn(
                name: "City",
                table: "Adverts",
                newName: "city");

            migrationBuilder.AlterColumn<decimal>(
                name: "price",
                table: "Adverts",
                type: "money(18,2)",
                nullable: false,
                oldClrType: typeof(decimal));
        }
    }
}
