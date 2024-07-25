namespace MyNotes.Contracts;

public record UpdateNoteRequest(Guid Id, string Title, string Description);