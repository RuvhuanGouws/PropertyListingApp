using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyApp.Data.Migrations
{
    public partial class propertyapp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Adverts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    header = table.Column<string>(nullable: true),
                    details = table.Column<string>(nullable: true),
                    province = table.Column<string>(nullable: true),
                    city = table.Column<string>(nullable: true),
                    price = table.Column<decimal>(nullable: false),
                    UserID = table.Column<int>(nullable: false),
                    status = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Adverts", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Adverts");
        }
    }
}
