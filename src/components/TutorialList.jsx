// TutorialList.jsx

import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { Table } from "react-bootstrap";
const TutorialList = ({ tutorials, getTutorials, setEditData }) => {
  //? mock data
  // const tutorials = [
  //   {
  //     id: 1,
  //     title: "JS",
  //     description: "JS is a programming language",
  //   },
  //   {
  //     id: 2,
  //     title: "React",
  //     description: "JS library for UI design",
  //   },
  // ];

  const deleteTutorial = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_URL}${id}/`);
    } catch (error) {
      console.log(error);
    }
    getTutorials();
  };

  // console.log(editData);

  const headers = ["#id", "Title", "Description", "Edit/Delete"];

  return (
    <div className="container mt-4">
      <Table responsive className="table-striped text-center">
        <thead>
          <tr>
            {Array.from(headers).map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from(tutorials).map((item, i) => {
            const { id, title, description } = item;
            return (
              <tr key={id}>
                <th>{id}</th>
                <td>{title}</td>
                <td>{description}</td>
                <td className="text-center text-nowrap">
                  <FaEdit
                    size={20}
                    type="button"
                    className="me-2 text-warning"
                    onClick={() => setEditData(item)}
                  />

                  <AiFillDelete
                    size={22}
                    type="button"
                    className="text-danger "
                    onClick={() => deleteTutorial(id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default TutorialList;
