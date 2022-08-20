import { useRef, useState, useEffect } from "react";
import useAuth from "../../Auth/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useInput from "../../Auth/useInput";
import instance from "../../api/AxiosInstance";
import Cookies from "universal-cookie";
import toast, { Toaster } from "react-hot-toast";
import "./Styles/loginStyles.css";
import useDH from "../../Auth/DH/DHUseContext";

const Login = () => {
  const { setAuth } = useAuth();
  const { generateAlicePKA, generateSharedKey, alicePKA } = useDH();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const userRef = useRef();
  const errRef = useRef();

  const [user, resetUser, userAttribs] = useInput("user", "");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

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
      generateAlicePKA();
      const response = await instance.request({
        data: {
          data_type: "Login",
          params: { user, pwd,alicePKA },
        },
      });

      const accessToken = response?.data?.accessToken;
      const refreshTokenCookie = response?.data?.refreshToken;
      const roles = response?.data?.roles;
      const firstName = response?.data?.firstName;
      const lastName = response?.data?.lastName;
      const bobPKA = response?.data?.publicKey;
      generateSharedKey(bobPKA);
      console.log(response?.data);
      setAuth({ user, roles, accessToken, firstName, lastName });
      // create the refresh token cookie
      cookies.set("refreshToken", refreshTokenCookie, { path: "/" });
      toast.success("התחברת בהצלחה");
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
    <section className="loginContainer">
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
          className="rounded-input"
        />

        <label htmlFor="password">סיסמה:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          className="rounded-input"
        />
        <button>התחבר</button>
      </form>
      <div className="bottom_container">
        <div>
          <Link to="/register">שכחת סיסמה? </Link>{" "}
        </div>
        <div>
          <Link to="/register">הירשם </Link>{" "}
        </div>
      </div>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <Toaster />

    </section>
  );
};

export default Login;
/*
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
  </form>
  <p>
    צריך חשבון?
    <br />
    <span className="line">
      <Link to="/register">הירשם</Link>{" "}
    </span>
  </p>

              <div className="">
              <GridMui item xs>
                <Link to="/register">שכחת סיסמה? </Link>{" "}
              </GridMui>
              <GridMui item>
                <Link to="/register">הירשם </Link>{" "}
              </GridMui>
            </div>
  <Toaster />
</section>;*/