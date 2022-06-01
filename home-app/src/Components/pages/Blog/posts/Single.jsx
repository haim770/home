import Sidebar from "../sidebar/SideBar";
import SinglePost from "./SinglePost";

export default function Single() {
  return (
    <div style={{display:"flex"}}>
      <SinglePost />
      <Sidebar />
    </div>
  );
}
