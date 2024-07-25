import axios from "axios";

export const fetchNotes = async (filter) => {
  try {
    var response = await axios.get("http://localhost:5109/notes", {
      params: {
        search: filter?.search,
        sortItem: filter?.sortItem,
        sortOrder: filter?.sortOrder,
      },
    });
    return response.data.notes;
  } catch (e) {
    console.error(e);
  }
};

export const createNote = async (note) => {
  try {
    var response = await axios.post("http://localhost:5109/notes", note);

    return response.status;
  } catch (e) {
    console.error(e);
  }
};

export const deleteNote = async (Id) => {
  try {
    var response = await axios.delete(`http://localhost:5109/notes/${Id}`);
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const editNote = async (id, editedNote) => {
  try {
    var response = await axios.put(`http://localhost:5109/notes/${id}`, editedNote);
    console.log(response.data)
    return response;
  } catch (e) {
    console.error(e);
  }
};

// , {
//   params: {
//     id: id,
//     title: editedNote.title,
//     description: editedNote.description
//   },
// }
