import NoteForm from "./components/NoteForm/NoteForm";
import "./App.css";
import Note from "./components/Note/Note";
import { useEffect, useState } from "react";
import { createNote, deleteNote, editNote, fetchNotes } from "./Services/notes";
import MyModal from "./components/UI/MyModal/MyModal";
import EditForm from "./components/EditForm/EditForm";

function App() {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState({
    search: "",
    sortItem: "date",
    sortOrder: "desc",
  });

  const [modal, setModal] = useState(false);
  const [currentId, setCurrentId]=useState(null)

  useEffect(() => {
    const fetchData = async () => {
      let notes = await fetchNotes(filter);
      setNotes(notes);
    };
    fetchData();
  }, [filter]);

  const onCreate = async (note) => {
    await createNote(note);
    let notes = await fetchNotes(filter);
    setNotes(notes);
  };

  const onDelete = async (id) => {
    await deleteNote(id);
    let notes = await fetchNotes(filter);
    setNotes(notes);
  };

  const onModal = async (id) => {
    setCurrentId(id);
    setModal(true);
  };

  const onEdit = async (id, editedNote) => {
    await editNote(id, editedNote);
    let notes = await fetchNotes(filter);
    setNotes(notes);
    setModal(false);
  };

  return (
    <section>
      <MyModal visible={modal} setVisible={setModal}>
        <EditForm id={currentId} onEdit={onEdit} />
      </MyModal>
      <div className="main">
        <NoteForm filter={filter} setFilter={setFilter} onCreate={onCreate} />
        <ul>
          {notes.map((n) => (
            <li key={n.id}>
              <Note
                id={n.id}
                title={n.title}
                description={n.description}
                createdAt={n.createdAt}
                onDelete={onDelete}
                onModal={onModal}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default App;
