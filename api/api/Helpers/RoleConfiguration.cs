using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Helpers
{
    public class RoleConfiguration : IEntityTypeConfiguration<Role>
    {
        public void Configure(EntityTypeBuilder<Role> builder)
        {
            builder.HasData(
                new Role()
                {
                    Id = 1,
                    Name = "Admin",
                },
                new Role()
                {
                    Id = 2,
                    Name = "Operator",
                }
            );
        }
    }
}
