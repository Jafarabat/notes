using Microsoft.EntityFrameworkCore;
using Npgsql;
namespace MyNotes.DataAccess;
using MyNotes.Models;


public class NotesDbContext(IConfiguration configuration) : DbContext
{
    private readonly IConfiguration _configuration = configuration;

    public static string GetConnectionString(){
        return new NpgsqlConnectionStringBuilder(){
            Host = "localhost",
            Port = 5433,
            Database="my_notes",
            Username ="postgres",
            Password ="1"
        }.ConnectionString;
    }

    public DbSet<Note> Notes => Set<Note>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(GetConnectionString());
    }
}