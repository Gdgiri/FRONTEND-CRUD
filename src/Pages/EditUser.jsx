import axios from "axios";
import React, { useState } from "react";
import { updateUser } from "../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const EditUser = () => {
  const { id } = useParams();
  const users = useSelector((state) => state.users.users);
  const user = users.find((ele) => ele.id === id);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(user.age);

  const handleSubmit = async (e) => {
    setName(e.target.value.toUpperCase());
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://backend-crud-aee4.onrender.com/api/user/update-user/${id}`,
        { name, email, age }
      );
      dispatch(updateUser(response.data.result)); // Adjust according to your Redux setup
      toast.success("User edited successfully!");
      setTimeout(() => navigate("/"), 1500); // Redirect after 1.5 seconds
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12">
          {" "}
          {/* Adjusted for different screen sizes */}
          <div className="card shadow-sm border-light">
            <div className="card-body">
              <h2 className="card-title mb-4 text-center">Edit User</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="age" className="form-label">
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    className="form-control"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button className="btn btn-primary btn-lg">
                    Update User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditUser;
