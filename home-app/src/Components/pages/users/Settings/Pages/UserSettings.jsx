import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import instance from "../../../../../api/AxiosInstance";
import "./Styles/UserSettings.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import useAuth from "../../../../../Auth/useAuth";
import Report from "./../../../../Report.js";

const USER_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
// minimum 2 chars , only letters.
const NAME_REGEX =
  /^[\u0590-\u05fea-zA-Z][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
//const PHONE_REGEX = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2?([ .-]?)([0-9]{4})/;
const PHONE_REGEX =
  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
const UserSettings = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();

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

  const [userRule, setUserRule] = useState("משתמש");
  const [userRemainAds, setUserRemainAds] = useState(0);

  const [confirmOldPass, setConfirmOldPass] = useState("");
  const [validOldPass, setValidOldPass] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const [userForTheReport, setUserForTheReport] = useState({});
  const [showReport, setReportShow] = useState("notShowReport");
  const handleClickShowPassword = () => {
    setShowPassword((current) => !current);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (!loading) userRef.current.focus();
  }, [loading]);

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
    setValidOldPass(confirmOldPass != null && confirmOldPass !== "");
  }, [confirmOldPass]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
    setChangePassword(pwd != null && pwd !== "");
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v2 = PWD_REGEX.test(pwd) || !changePassword;
    const v3 = PHONE_REGEX.test(phoneNumber);
    const v4 = NAME_REGEX.test(firstName);
    const v5 = NAME_REGEX.test(lastName);
    const v1 = pwd === matchPwd;
    if (!v1 || !v2 || !v3 || !v4 || !v5) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await instance.request({
        data: {
          data_type: "updateUserSettings",
          params: {
            user,
            pwd,
            matchPwd,
            confirmOldPass,
            firstName,
            lastName,
            phoneNumber,
          },
        },
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      // check if we got new data from server or any response
      if (response?.data) {
        console.log(response.data);
      }
      setSuccess(true);
      //clear state and controlled inputs
      getUserData();
      setPwd("");
      setMatchPwd("");
      setConfirmOldPass("");
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

  /**
   * Get user data from server
   */
  const getUserData = async () => {
    const result = await instance.request({
      data: {
        data_type: "getUserDataForSettings",
        params: "",
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });

    // check if we got new data from server or any response
    if (result?.data) {
      /**
       * After we load all user data we want to set it in form
       */
      if (result?.data?.userdata) {
        console.log(result?.data?.userdata);
        const userData = result?.data?.userdata;
        setFirstName(userData[0].first_name);
        setUser(userData[0].mail);
        setLastName(userData[0].last_name);
        setPhoneNumber(userData[0].phone);
        setUserRemainAds(userData[0].remaining_ads);
        if (userData[0].rule === "5150") setUserRule("מנהל");
      }
    }
    // after finish load all data stop loading
    setLoading(false);
  };

  /**
   * This use effect will render only once when the component loaded,
   * when we close the contacts it will end the interval.
   * Will refesh contacts every 1 second.
   */
  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const changeMail = async (e) => {
    //func to send a request for changing mail to the manager
    e.preventDefault();
    setReportShow("showReport");
  };
  return loading ? (
    <div className="loader"></div>
  ) : (
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
        <h3>{userRule}</h3>
        <h3>יתרת מודעות לפרסום: {userRemainAds}</h3>
      </div>
      {showReport == "notShowReport" ? (
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
            <div
              style={{
                display: "flex",
              }}
            >
              <input
                type="text"
                id="username"
                ref={userRef}
                value={user}
                aria-describedby="uidnote"
                disabled
                className="inputField"
              />
              <button
                style={{ marginRight: "2rem", cursor: "pointer" }}
                onClick={changeMail}
              >
                שנה מייל
              </button>
            </div>
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
              className="inputField"
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
                className={
                  validPhoneNumber || !phoneNumber ? "hide" : "invalid"
                }
              />
            </label>
            <input
              type="text"
              id="userphonenumber"
              autoComplete="off"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              required
              aria-invalid={validPhoneNumber ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setPhoneNumberFocus(true)}
              onBlur={() => setPhoneNumberFocus(false)}
              className="inputField"
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
              <span aria-label="bracket space">
                &#x200E;(123) 456 7899
              </span>{" "}
              <span aria-label="bracket dots">&#x200E;(123).456.7899</span>{" "}
              <span aria-label="bracket dash format">
                &#x200E;(123)-456-7899
              </span>
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
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              חייב לתאום את הסיסמה הקודמת.
            </p>
          </div>

          <div className="Icon-inside">
            <label htmlFor="confirm_pwd" className="sameLineLable">
              הזן סיסמה ישנה לאישור:
            </label>
            <div className="iconInput">
              <input
                type={showPassword ? "text" : "password"}
                id="confirm_old_password"
                onChange={(e) => setConfirmOldPass(e.target.value)}
                value={confirmOldPass}
                required
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
          </div>

          <button
            disabled={
              !validName ||
              !validOldPass ||
              (changePassword && (!validPwd || !validMatch))
                ? true
                : false
            }
          >
            עדכן פרטים
          </button>
        </form>
      ) : (
        <Report
          className={showReport}
          setClassName={setReportShow}
          userMail={auth?.mail}
          elementType="user"
        />
      )}
    </section>
  );
};

export default UserSettings;
