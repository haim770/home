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
  //login page
  const { setAuth } = useAuth();
  const { setPrivateShareKey, setAlicePKA } = useDH();
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
    //login
    e.preventDefault();
      const PKA = "95150999";
      const alicePv = generateAlicePrivateKey(PKA);
      const alicePKA = generateAlicePKA(PKA, alicePv);
      setAlicePKA(alicePv, alicePKA);
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
      const shared = generateSharedPrivateKey(PKA, bobPKA, alicePv);
      setPrivateShareKey(shared);
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
    //forget password
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


/**
 * Generate random Prime number in range
 *
 */

const getRandPrime = (min, max) => {
  let rnd = Math.floor(Math.random() * (max - min) + min);
  if (isPrime(rnd)) return rnd;
  return getRandPrime(min, max);
};


function generateAlicePrivateKey(p) {
  /**
   * Varibales
   */
  const thealicePrivateKey = getRandPrime(2, p);
  return thealicePrivateKey;
}

function generateAlicePKA(p,alicePrivateKey) {
  /**
   * Varibales
   */

  const g = findPrimitive(p);
  const alicePublicKey = power(g, alicePrivateKey, p);

  return alicePublicKey;
}

// Returns true if n is prime
function isPrime(n) {
  // Corner cases
  if (n <= 1) return false;
  if (n <= 3) return true;

  // This is checked so that we can skip
  // middle five numbers in below loop
  if (n % 2 === 0 || n % 3 === 0) return false;

  for (let i = 5; i * i <= n; i = i + 6)
    if (n % i === 0 || n % (i + 2) === 0) return false;

  return true;
}

/* Iterative Function to calculate (x^n)%p in
O(logy) */
/**
 * Modular exponentiation
 * https://en.wikipedia.org/wiki/Modular_exponentiation
 * @param {*} x
 * @param {*} y
 * @param {*} p
 * @returns
 */
function power(x, y, p) {
  let res = 1; // Initialize result

  x = x % p; // Update x if it is more than or
  // equal to p

  while (y > 0) {
    // If y is odd, multiply x with result
    if (y & 1) res = (res * x) % p;

    // y must be even now
    y = y >> 1; // y = y/2
    x = (x * x) % p;
  }
  return res;
}

// Utility function to store prime factors of a number
function findPrimefactors(s, n) {
  // Print the number of 2s that divide n
  while (n % 2 === 0) {
    s.add(2);
    n = n / 2;
  }

  // n must be odd at this point. So we can skip
  // one element (Note i = i +2)
  for (let i = 3; i <= Math.sqrt(n); i = i + 2) {
    // While i divides n, print i and divide n
    while (n % i === 0) {
      s.add(i);
      n = n / i;
    }
  }

  // This condition is to handle the case when
  // n is a prime number greater than 2
  if (n > 2) s.add(n);
}

// Function to find smallest primitive root of n
function findPrimitive(n) {
  let s = new Set();

  // Check if n is prime or not
  if (isPrime(n) === false) return -1;

  // Find value of Euler Totient function of n
  // Since n is a prime number, the value of Euler
  // Totient function is n-1 as there are n-1
  // relatively prime numbers.
  let phi = n - 1;

  // Find prime factors of phi and store in a set
  findPrimefactors(s, phi);

  // Check for every number from 2 to phi
  for (let r = 2; r <= phi; r++) {
    // Iterate through all prime factors of phi.
    // and check if we found a power with value 1
    let flag = false;
    for (let it of s) {
      // Check if r^((phi)/primefactors) mod n
      // is 1 or not
      if (power(r, phi / it, n) === 1) {
        flag = true;
        break;
      }
    }

    // If there was no power with value 1.
    if (flag === false) return r;
  }

  // If no primitive root found
  return -1;
}
/**
 * End find Primitive root
 */


function generateSharedPrivateKey(p, bobPKA, alicePrivateKey) {
  return "" + power(bobPKA, alicePrivateKey, p);
}
