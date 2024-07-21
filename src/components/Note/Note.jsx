import React from "react";
import "./Note.css";
import moment from "moment";

const Note = ({ title, description, createdAt }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="note-body">
        <p className="description">{description}</p>
        <p className="date">{moment(createdAt).format("DD/MM/YYYY")}</p>
      </div>
    </div>
  );
};
export default Note;
