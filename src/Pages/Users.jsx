import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUser } from "../Redux/userSlice";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the Toastify CSS

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://backend-crud-aee4.onrender.com/api/user/get-user"
      );
      dispatch(getUser(response.data.result));
      toast.success("Users fetched successfully!");
    } catch (error) {
      console.log("Error fetching data:", error);
      toast.error("Failed to fetch users!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://backend-crud-aee4.onrender.com/api/user/delete-user/${id}`
      );
      dispatch(deleteUser({ id }));
      toast.success("User deleted successfully!");
    } catch (error) {
      console.log("Error deleting user:", error);
      toast.error("Failed to delete user!");
    }
  };

  return (
    <div className="container-fluid d-flex vh-100 justify-content-center align-items-center bg-light">
      <ToastContainer /> {/* Toast notifications */}
      <div className="row justify-content-center w-100">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <div className="bg-white shadow-sm rounded p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="text-dark">User List</h2>
              <Link to="/create" className="btn btn-success">
                Create User
              </Link>
            </div>

            <div className="table-responsive">
              {/* Make table responsive */}
              <table className="table table-bordered table-striped text-center">
                <thead className="bg-primary text-white">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="bg-light">
                  {users.map((ele) => (
                    <tr
                      key={ele.id}
                      className="border-bottom bg-light text-black"
                    >
                      <td>{ele.name}</td>
                      <td>{ele.email}</td>
                      <td>{ele.age}</td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <Link
                            to={`/edit/${ele.id}`}
                            className="btn btn-success btn-sm mx-1"
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-danger btn-sm mx-1"
                            onClick={() => handleDelete(ele.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
