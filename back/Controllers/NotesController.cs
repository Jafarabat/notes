using System.Linq.Expressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyNotes.Contracts;
using MyNotes.DataAccess;
using MyNotes.Models;

namespace MyNotes.Controllers;

[ApiController]
[Route("[controller]")]
public class NotesController(NotesDbContext dbContext) : ControllerBase
{
    private readonly NotesDbContext _dbContext = dbContext;

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateNoteRequest request, CancellationToken ct)
    {
        var note = new Note(request.Title, request.Description);

        await _dbContext.Notes.AddAsync(note, ct);
        await _dbContext.SaveChangesAsync(ct);

        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] GetNotesRequest request, CancellationToken ct)
    {
        var notesQuery = _dbContext.Notes
            .Where(n => string.IsNullOrWhiteSpace(request.Search) ||
                        n.Title.ToLower().Contains(request.Search.ToLower()));

        Expression<Func<Note, object>> selectorKey = request.SortItem?.ToLower() switch
        {
            "date" => note => note.CreatedAt,
            "title" => note => note.Title,
            _ => note => note.Id
        };

        notesQuery = request.SortOrder == "desc"
            ? notesQuery.OrderByDescending(selectorKey)
            : notesQuery.OrderBy(selectorKey);

        var noteDtos = await notesQuery
            .Select(n => new NoteDto(n.Id, n.Title, n.Description, n.CreatedAt))
            .ToListAsync(cancellationToken: ct);

        return Ok(new GetNotesResponse(noteDtos));
    }


    [HttpDelete("{Id}")]
    public async Task<IActionResult> Delete([FromRoute] DeleteNoteRequest request, CancellationToken ct)
    {
        var note = await _dbContext.Notes.FindAsync(request.Id);
        if (note == null)
        {
            return NotFound();
        }
        _dbContext.Notes.Remove(note);
        await _dbContext.SaveChangesAsync(ct);

        return Ok();
    }

    // [HttpGet("{Id}")]
    // public async Task<IActionResult> Get([FromRoute] DeleteNoteRequest request, CancellationToken ct)
    // {
    //     var note = await _dbContext.Notes.FindAsync(request.Id);
    //     if (note == null)
    //     {
    //         return NotFound();
    //     }
    //     return Ok(note);
    // }

    [HttpPut("{Id}")]
    public async Task<IActionResult> Put([FromRoute] Guid Id, [FromBody] UpdateNoteRequest request, CancellationToken ct)
    {
        var note = await _dbContext.Notes.FindAsync(Id);
        if (note == null)
        {
            return NotFound();
        }

        note.Title = request.Title;
        note.Description = request.Description;
        await _dbContext.SaveChangesAsync(ct);

        return Ok();

    }

}

