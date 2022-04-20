import axios from 'axios';
import { useState } from "react";

export default function TestAxios() {
        const [dataServer, setdataServer] = useState(0);
        const url = "http://localhost:80/home/home-app/api.php";
        axios.get(url).then(response=>response.data)
        .then((data) => {
            console.log(data)
            setdataServer(data);
        });
        

  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>test Axios</h2>
      <p>{dataServer}</p>
    </main>
  );
}