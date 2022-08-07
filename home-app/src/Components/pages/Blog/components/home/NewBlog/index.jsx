import React from "react";
import useAuth from "../../../../../../Auth/useAuth";
import "./styles.css";
import { Link } from "react-router-dom";

const CreateBlog = () => {
  const { auth } = useAuth();
  return auth?.roles === "5150" ? (
    <div className="addBlog">
      {" "}
      <Link to="/Blog/Create">
        <button>
          <p>צור בלוג</p>
        </button>
      </Link>
    </div>
  ) : (
    <></>
  );
};

export default CreateBlog;
