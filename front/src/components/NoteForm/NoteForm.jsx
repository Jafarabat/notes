import React, { useState } from "react";
import "./NoteForm.css";

const NoteForm = ({ filter, setFilter, onCreate }) => {
  const [note, setNote] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    setNote(null);
    onCreate(note);
  };

  return (
    <section>
      <div>
        <form action="" onSubmit={onSubmit}>
          <h2>Создание заметки</h2>
          <input
            type="text"
            placeholder="Заголовок(макс. 20)"
            maxlength="20"
            value={note?.title ?? ""}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
          <textarea
            placeholder="Описание(макс. 75)"
            maxlength="75"
            value={note?.description ?? ""}
            onChange={(e) => setNote({ ...note, description: e.target.value })}
          />
          <button type="submit">Создать</button>
        </form>
      </div>

      <h4>Фильтры</h4>
      <input
        type="text"
        placeholder="Поиск"
        className="search-filter"
        onChange={(e) => setFilter({ ...filter, search: e.target.value })}
      ></input>
      <select
        onChange={(e) => setFilter({ ...filter, sortOrder: e.target.value })}
      >
        <option value={"desc"}>Сначала новые</option>
        <option value={"asc"}>Сначала старые</option>
      </select>
    </section>
  );
};

export default NoteForm;
