using Microsoft.AspNetCore.Components.Web;
namespace MyNotes.Models;

public class Note(string title, string description)
{

    
    
    public Guid Id { get; init; }

    public string Title { get; init; } = title;

    public string Description { get; init; } = description;

    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
}