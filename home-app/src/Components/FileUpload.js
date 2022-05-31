import React from "react";
import axios from "axios";

const FileUpload = () => {
  // a local state to store the currently selected file.
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("data","getFiles");
    formData.append("selectedFile", selectedFile);
    let response = "";
    try {
      response = await axios({
        method: "post",
        url: "http://localhost:80/home/home-app/apiFile.php",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.log(error);
    }
    console.log(response.data);
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <form>
      <input type="file" onChange={handleFileSelect} />
      <button onClick={handleSubmit}> "Upload File"</button>
    </form>
  );
};

export default FileUpload;
