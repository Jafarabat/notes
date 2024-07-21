import NoteForm from "./components/NoteForm/NoteForm";
import "./App.css";
import Note from "./components/Note/Note";
import { useEffect, useState } from "react";
import { createNote, fetchNotes } from "./Services/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState({
    search: "",
    sortItem: "date",
    sortOrder: "desc"
  });

  useEffect(() => {
    const fetchData = async () => {
      let notes = await fetchNotes(filter);
      setNotes(notes);
    };
    fetchData();
  }, [filter]);

  const onCreate = async (note) =>{
    await createNote(note);
    let notes = await fetchNotes(filter);
      setNotes(notes);
  }

  return (
    <section>
      <div className="main">
        <NoteForm filter={filter} setFilter={setFilter} onCreate={onCreate} />
        <ul>
          {notes.map((n) => (
            <li key={n.id}>
              <Note
                title={n.title}
                description={n.description}
                createdAt={n.createdAt}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default App;
