import { useRef, useState, useEffect } from "react";
import useAuth from "../../Auth/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useInput from "../../Auth/useInput";
import instance from "../../api/AxiosInstance";
import Cookies from "universal-cookie";
import toast, { Toaster } from "react-hot-toast";
import "./Styles/loginStyles.css";
import useDH from "../../Auth/DH/DHUseContext";

const MAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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

  const [forgetPassword, setForgetPassword] = useState(false);
  const [resetMail, setResetMail] = useState("");

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
          params: { user, pwd, alicePKA },
        },
      });

      const accessToken = response?.data?.accessToken;
      const refreshTokenCookie = response?.data?.refreshToken;
      const roles = response?.data?.roles;
      const firstName = response?.data?.firstName;
      const lastName = response?.data?.lastName;
      const bobPKA = response?.data?.publicKey;
      generateSharedKey(bobPKA);
      //console.log(response?.data);
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

  const showForgetPassword = () => {
    setForgetPassword(true);
  };
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const handleSubmitForgotPassword = async (e) => {
    e.preventDefault();
    const v1 = MAIL_REGEX.test(resetMail);
    if (v1) {
      try {
        const response = await instance.request({
          data: {
            data_type: "resetPasswordRequest",
            params: { resetMail },
          },
        });
        console.log(response?.data);
        toast.success("מייל שחזור נשלח בהצלחה");
        await delay(3000);
        //navigate(from, { replace: true });
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
    } else {
      setErrMsg("כתובת מייל לא חוקית");
    }
  };

  const mailRef = useRef();
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
        <button className="button-4">התחבר</button>
      </form>
      <div className="bottom_container">
        <div>
          <button onClick={showForgetPassword} className="fpass_btn">
            שכחת סיסמה?{" "}
          </button>{" "}
        </div>
        <div>
          <Link to="/register" className="fpass_btn">
            הירשם{" "}
          </Link>{" "}
        </div>
      </div>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      {forgetPassword ? (
        <div className="forgotPasswordContainer">
          <form onSubmit={handleSubmitForgotPassword}>
            <label htmlFor="resetMail">כתובת מייל</label>
            <input
              type="text"
              id="resetMail"
              ref={mailRef}
              autoComplete="off"
              {...userAttribs}
              required
              className="rounded-input"
              onChange={(e) => setResetMail(e.target.value)}
              value={resetMail}
            />
            <button className="button-4">שחזר סיסמה</button>
          </form>
        </div>
      ) : (
        <></>
      )}
      <Toaster />
    </section>
  );
};

export default Login;
