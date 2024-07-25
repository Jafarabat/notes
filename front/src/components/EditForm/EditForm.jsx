import React, { useState } from "react";
import "./EditForm.css";

const EditForm = ({ id, onEdit }) => {

  const [editedNote, setEditedNote] = useState("");

  const editeNote = (e) => {
    e.preventDefault();
    onEdit(id, editedNote);
    setEditedNote("")
  };
  return (
    <section>
      <div>
        <form action="">
          <h2>Редактирование заметки</h2>
          <input
            type="text"
            placeholder="Изменить заголовок(макс. 20)"
            maxLength="20"
            value={editedNote?.title ?? ""}
            onChange={(e) =>
              setEditedNote({ ...editedNote, title: e.target.value })
            }
          />
          <textarea
            placeholder="Изменить описание(макс. 75)"
            maxLength="75"
            value={editedNote?.description ?? ""}
            onChange={(e) =>
              setEditedNote({ ...editedNote, description: e.target.value })
            }
          />
          <button type="submit" onClick={editeNote}>
            Изменить
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditForm;
