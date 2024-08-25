// AddTutorial.jsx

import axios from "axios";
import { useEffect, useState } from "react";

const AddTutorial = ({ getTutorials, editData, setEditData }) => {
  const { id, title: newTitle, description: NewDescription } = editData;

  const [title, setTitle] = useState(newTitle);
  const [description, setDescription] = useState(NewDescription);

  // console.log(title, description);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTutarial = { title, description };

    if (id) {
      editTutorial(newTutarial);
      setEditData("");
    } else {
      postTutarial(newTutarial);
    }
    setTitle("");
    setDescription("");
  };

  useEffect(() => {
    setTitle(newTitle);
    setDescription(NewDescription);
  }, [newTitle, NewDescription]);

  const postTutarial = async (newTutarial) => {
    try {
      // const URL = "https://tutorial-api.fullstack.clarusway.com/tutorials/";
      const res = await axios.post(process.env.REACT_APP_URL, newTutarial);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    getTutorials();
  };

  const editTutorial = async (tutorial) => {
    try {
      await axios.put(`${process.env.REACT_APP_URL}${id}/`, tutorial);
      getTutorials();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container text-center mt-4">
      <h1 className="display-6 text-danger">Add Your Tutorial</h1>
      <form onSubmit={handleSubmit} className=" bg-white rounded-3 p-4">
        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-bold">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter your title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label fw-bold">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="desc"
            placeholder="Enter your Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-danger mb-4">
          {id ? "Edit" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddTutorial;
