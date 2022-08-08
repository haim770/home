import useAuth from "../../../../../../../Auth/useAuth";
import "./styles.css";
// Import React dependencies.
import React, { useState } from 'react'
// Import the Slate editor factory.
// import { createEditor } from 'slate'

// // Import the Slate components and React plugin.
// import { Slate, Editable, withReact } from 'slate-react'

const CreateBlog = () => {
  const { auth } = useAuth();
  return auth?.roles === "5150" ? (
    <div className="addBlog">
      בלוג חדש
    </div>
  ) : (
    <></>
  );
};

export default CreateBlog;
