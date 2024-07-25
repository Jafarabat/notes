import React from "react";
import "./Note.css";
import moment from "moment";

const Note = ({ id, title, description, createdAt, onDelete, onModal }) => {
  const removeNote = (e) => {
    e.preventDefault();
    onDelete(id);
  };

  const openModal = () => {
    onModal(id);
  };


  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="note-body">
        <p className="description">{description}</p>
        <p className="date">{moment(createdAt).format("DD/MM/YYYY")}</p>
        <button onClick={removeNote} className="delete-bttn">
          Удалить
        </button>
        <button onClick={openModal} className="edit-bttn">
          Редактировать
        </button>
      </div>
    </div>
  );
};
export default Note;
