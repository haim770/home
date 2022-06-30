import { useRef, useState, useEffect } from "react";
import useAuth from "../../Auth/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useInput from "../../Auth/useInput";
import useToggle from "../../Auth/useInput";
import instance from "../../api/AxiosInstance";
import Cookies from "universal-cookie";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, resetUser, userAttribs] = useInput("user", "");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [check, toggleCheck] = useToggle("persist", true);

  const cookies = new Cookies();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await instance.request({
          data: {
            data_type: "Login",
            params: { user, pwd },
          },
        });

      const accessToken = response?.data?.accessToken;
      const refreshTokenCookie = response?.data?.refreshToken;
      const roles = response?.data?.roles;
      //console.log(response?.data);
      setAuth({ user, roles, accessToken });
      // create the refresh token cookie
      cookies.set("refreshToken", refreshTokenCookie, { path: "/" });

      resetUser();
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section className="logRegBox">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>התחברות</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">שם משתמש:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          {...userAttribs}
          required
        />

        <label htmlFor="password">סיסמה:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <button>התחבר</button>
        <div className="persistCheck">
          <input
            type="checkbox"
            id="persist"
            onChange={toggleCheck}
            checked={check}
          />
          <label htmlFor="persist">זכור אותי</label>
        </div>
      </form>
      <p>
        צריך חשבון?
        <br />
        <span className="line">
          <Link to= "/register">הירשם</Link>        </span>
      </p>
    </section>
  );
};

export default Login;
