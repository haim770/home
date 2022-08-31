import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  //page for unautorized
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <section>
      <h1>Unauthorized</h1>
      <br />
      <p>You do not have access to the requested page.</p>
      <div className="flexGrow">
        <button onClick={goBack} className="button-4">
          Go Back
        </button>
      </div>
    </section>
  );
};

export default Unauthorized;
