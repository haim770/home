import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { useSearchParams, useLocation, Navigate } from "react-router-dom";
import instance from "../../../api/AxiosInstance";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import "./Settings/Pages/Styles/UserSettings.css";
import toast, { Toaster } from "react-hot-toast";

  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const RecoveryPage = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const token = searchParams.get("token");
  const userMail = searchParams.get("email");

  const [showPassword, setShowPassword] = useState(false);
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMessage,setErrMessage]=useState(true);
  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();

  /**
   * Get Chat from server
   */
  const testCredentials = async () => {
    const result = await instance.request({
      data: {
        data_type: "testRecoveryParams",
        params: { token: token, email: userMail },
      },
    });
    console.log(result?.data);
    // check if we got new data from server or any response
    if (result?.data) {
      setErrMessage(result?.data.isValid);
    }
  };

  // When enter page, Test if we got his data on the database.
  useLayoutEffect(() => {
    testCredentials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [pwd, matchPwd]);
  const handleClickShowPassword = () => {
    setShowPassword((current) => !current);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v2 = PWD_REGEX.test(pwd);
    const v1 = pwd === matchPwd;
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await instance.request({
        data: {
          data_type: "updateRecoveryPassword",
          params: {
            token,
            userMail,
            pwd,
            matchPwd,
          },
        },
      });
      // check if we got new data from server or any response
      if (response?.data.message === "success") {
        toast.success("סיסמה עודכנה בהצלחה");
        <Navigate to="/Login" state={{ from: location }} replace />;
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 412) {
        setErrMsg("I'm a teapot");
      } else if (err.response?.status === 401) {
        setErrMsg("Incorrect permissions");
      } else if (err.response?.status === 400) {
        setErrMsg("Bad request");
      } else {
        setErrMsg("Update Failed");
      }
      errRef.current.focus();
    }
  };

  return token && userMail && errMessage ? (
    <div>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <form onSubmit={handleSubmit}>
        <div className="Icon-inside">
          <label htmlFor="password" className="sameLineLable">
            סיסמה:
            <FontAwesomeIcon
              icon={faCheck}
              className={validPwd ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validPwd || !pwd ? "hide" : "invalid"}
            />
          </label>
          <div className="iconInput">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              className="inputField"
            />
            <span>
              <IconButton
                className="IconButton"
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </span>
          </div>
          <p
            id="pwdnote"
            className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            4 עד 24 תווים.
            <br />
            אותיות, מספרים, קו תחתון ומקף מותרים.{" "}
            <span aria-label="exclamation mark">!</span>{" "}
            <span aria-label="at symbol">@</span>{" "}
            <span aria-label="hashtag">#</span>{" "}
            <span aria-label="dollar sign">$</span>{" "}
            <span aria-label="percent">%</span>
          </p>
        </div>
        <div className="Icon-inside">
          <label htmlFor="confirm_pwd" className="sameLineLable">
            אמת סיסמה:
            <FontAwesomeIcon
              icon={faCheck}
              className={validMatch && matchPwd ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validMatch || !matchPwd ? "hide" : "invalid"}
            />
          </label>
          <div className="iconInput">
            <input
              type={showPassword ? "text" : "password"}
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              className="inputField"
            />
            <span>
              <IconButton
                className="IconButton"
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </span>
          </div>
          <p
            id="confirmnote"
            className={matchFocus && !validMatch ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            חייב לתאום את הסיסמה הקודמת.
          </p>
        </div>

        <button
          className="button-4"
          disabled={!validPwd || !validMatch ? true : false}
        >
          עדכן פרטים
        </button>
      </form>
      <Toaster />
    </div>
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};

export default RecoveryPage;
