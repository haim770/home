import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <section>
      <h1>Settings</h1>
      <br />
      <p>Admins and Users can get in.</p>
      <div className="flexGrow">
        <Link to="/">Settings</Link>
      </div>
    </section>
  );
};

export default Settings;
