import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import instance from "../../../../../api/AxiosInstance";
import "./Styles/UserSettings.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// minimum 2 chars , only letters.
const NAME_REGEX =
  /^[\u0590-\u05fe][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
//const PHONE_REGEX = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2?([ .-]?)([0-9]{4})/;
const PHONE_REGEX = 
/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);
  const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((current) => !current);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPhoneNumber(PHONE_REGEX.test(phoneNumber));
  }, [phoneNumber]);

  useEffect(() => {
    setValidFirstName(NAME_REGEX.test(firstName));
  }, [firstName]);

  useEffect(() => {
    setValidLastName(NAME_REGEX.test(lastName));
  }, [lastName]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await instance.request({
        data: {
          data_type: "updateSettings",
          params: { user, pwd },
        },
      });
      //console.log(response);
      setSuccess(true);
      //clear state and controlled inputs
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>הגדרות משתמש</h1>
      <div className="headerH3">
        <h3>user rule</h3>
        <h3>יתרת מודעות לפרסום: </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="Icon-inside">
          <label htmlFor="username">
            מייל רישום:
            <FontAwesomeIcon
              icon={faCheck}
              className={validName ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validName || !user ? "hide" : "invalid"}
            />
          </label>
          <input
            type="text"
            id="username"
            ref={userRef}
            value={user}
            aria-describedby="uidnote"
            disabled
          />
        </div>

        <div className="Icon-inside">
          <label htmlFor="userfirstname">
            שם פרטי:
            <FontAwesomeIcon
              icon={faCheck}
              className={validFirstName ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validFirstName || !firstName ? "hide" : "invalid"}
            />
          </label>
          <input
            type="text"
            id="userfirstname"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setFirstNameFocus(true)}
            onBlur={() => setFirstNameFocus(false)}
          />
        </div>
        <div className="Icon-inside">
          <label htmlFor="userlastname">
            שם משפחה:
            <FontAwesomeIcon
              icon={faCheck}
              className={validLastName ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validLastName || !lastName ? "hide" : "invalid"}
            />
          </label>
          <input
            type="text"
            id="userlastname"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            required
            aria-invalid={validLastName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setLastNameFocus(true)}
            onBlur={() => setLastNameFocus(false)}
          />
        </div>

        <div className="Icon-inside">
          <label htmlFor="userphonenumber">
            מספר פלאפון:
            <FontAwesomeIcon
              icon={faCheck}
              className={validPhoneNumber ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validPhoneNumber || !phoneNumber ? "hide" : "invalid"}
            />
          </label>
          <input
            type="text"
            id="userphonenumber"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            required
            aria-invalid={validPhoneNumber ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setPhoneNumberFocus(true)}
            onBlur={() => setPhoneNumberFocus(false)}
          />
          <p
            id="pwdnote"
            className={
              phoneNumberFocus && !validPhoneNumber
                ? "instructions"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            10 ספרות, ניתן לרשום קידומת מדינה אם נדרש.
            <br />
            ניתן לרשום בפורמט הבא:
            <br /> {/* &#x200E; needed for numbers to be write currect */}
            <span aria-label="bracket space">&#x200E;(123) 456 7899</span>{" "}
            <span aria-label="bracket dots">&#x200E;(123).456.7899</span>{" "}
            <span aria-label="bracket dash format">&#x200E;(123)-456-7899</span>
            <br />
            <span aria-label="one dash format">&#x200E;123-4567899</span>{" "}
            <span aria-label="dash format">&#x200E;123-456-7899</span>{" "}
            <span aria-label="space format">&#x200E;123 456 7899</span> <br />
            <span aria-label="standart format">&#x200E;1234567899</span>{" "}
            <span aria-label="extention space format">
              &#x200E;+972 123 456 7899
            </span>
          </p>
        </div>

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
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
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
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
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
          disabled={!validName || !validPwd || !validMatch ? true : false}
        >
          הירשם
        </button>
      </form>
      <p>
        כבר רשום?
        <br />
        <span className="line">
          <Link to="/">התחבר</Link>
        </span>
      </p>
    </section>
  );
};

export default Register;

/*
 first name
last name
phone number
mail - not to be change
password
prompt
site rule - view only
remaining ads - add link to purchase new ads

*/
const UserSettings = () => {
  return <div></div>;
};

//export default UserSettings
