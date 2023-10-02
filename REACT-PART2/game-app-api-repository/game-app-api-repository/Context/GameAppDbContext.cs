

using game_app_api_repository.Models;
using Microsoft.EntityFrameworkCore;

namespace game_app_api_repository.Context
{
    public class GameAppDbContext: DbContext
    {

        public GameAppDbContext(DbContextOptions<GameAppDbContext> options): base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TblPlanholder>().HasKey(t => new { t.lpaNo });
            modelBuilder.Entity<TblUser>().HasKey(t => new { t.UserName, t.Password });
            modelBuilder.Entity<TblPayment>().HasKey(t => new { t.ORNumber });
        }


        public DbSet<TblPlanholder> TblPlanholder { get; set; }
        public DbSet<TblUser> TblUser { get; set; }

        public DbSet<TblPayment> TblPayment { get; set; }

    }
}
