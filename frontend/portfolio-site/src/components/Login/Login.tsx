import React, { useState } from "react";
import "./Login.module.css"; // Importiere die CSS-Datei für das Styling

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hier kannst du die Login-Logik hinzufügen
    console.log("E-Mail:", email, "Passwort:", password);
  };

  return (
    <form className="form_container" onSubmit={handleSubmit}>
      <div className="logo_container"></div>
      <div className="title_container">
        <p className="title">Login to your Account</p>
        <span className="subtitle">
          Get started with our app, just create an account and enjoy the
          experience.
        </span>
      </div>
      <br />
      <div className="input_container">
        <label className="input_label" htmlFor="email_field">
          Email
        </label>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          className="icon"
        >
          <path
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="1.5"
            stroke="#141B34"
            d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"
          ></path>
          <path
            stroke-linejoin="round"
            stroke-width="1.5"
            stroke="#141B34"
            d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"
          ></path>
        </svg>
        <input
          placeholder="name@mail.com"
          title="Inpit title"
          name="input-name"
          type="text"
          className="input_field"
          id="email_field"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="input_container">
        <label className="input_label" htmlFor="password_field">
          Password
        </label>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          className="icon"
        >
          <path
            stroke-linecap="round"
            stroke-width="1.5"
            stroke="#141B34"
            d="M18 11.0041C17.4166 9.91704 16.273 9.15775 14.9519 9.0993C13.477 9.03404 11.9788 9 10.329 9C8.67911 9 7.18091 9.03404 5.70604 9.0993C3.95328 9.17685 2.51295 10.4881 2.27882 12.1618C2.12602 13.2541 2 14.3734 2 15.5134C2 16.6534 2.12602 17.7727 2.27882 18.865C2.51295 20.5387 3.95328 21.8499 5.70604 21.9275C6.42013 21.9591 7.26041 21.9834 8 22"
          ></path>
          <path
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="1.5"
            stroke="#141B34"
            d="M6 9V6.5C6 4.01472 8.01472 2 10.5 2C12.9853 2 15 4.01472 15 6.5V9"
          ></path>
        </svg>
        <input
          placeholder="Password"
          title="Inpit title"
          name="input-name"
          type="password"
          className="input_field"
          id="password_field"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button title="Sign In" type="submit" className="sign-in_btn">
        <span>Sign In</span>
      </button>

      <div className="separator">
        <hr className="line" />
        <span>Or</span>
        <hr className="line" />
      </div>
      <button title="Sign In" type="submit" className="sign-in_ggl">
        <svg
          height="18"
          width="18"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <path
              d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
              id="A"
            ></path>
          </defs>
          <g transform="matrix(.727273 0 0 .727273 -.954545 -1.45455)">
            <path
              fill="#fbbc05"
              d="M0 37V11l17 13z"
            ></path>
            <path
              fill="#ea4335"
              d="M0 11l17 13 7-6.1L48 14V0H0z"
            ></path>
            <path
              fill="#34a853"
              d="M0 37l30-23 7.9 1L48 0v48H0z"
            ></path>
            <path
              fill="#4285f4"
              d="M48 48L17 24l-4-3 35-10z"
            ></path>
          </g>
        </svg>
        <span>Sign In with Google</span>
      </button>
      <button title="Sign In" type="submit" className="sign-in_apl">
        <svg
          preserveAspectRatio="xMidYMid"
          version="1.1"
          viewBox="0 0 256 315"
          height="20px"
          width="16px"
        >
          <g>
            <path
              fill="#ffffff"
              d="M213.803394,167.030943 C214.2452,214.609646 255.542482,230.442639 256,230.644727 C255.650812,231.761357 249.401383,253.208293 234.917227,248.718714 C229.794049,245.60315 223.579306,238.302664 215.281219,237.883872 C199.320923,237.276071 193.600252,225.578919 185.801349,215.117643 C181.7679,208.744482 179.1583,201.215775 176.52065,193.647713 C177.568859,189.759453 178.505028,185.70558 179.34385,181.270763 C182.240225,173.7576 190.907057,167.923493 199.385227,167.030943 C199.735016,167.003415 207.298764,167.045698 213.803394,167.030943"
            ></path>
            <path
              fill="#ffffff"
              d="M72.3145621,48.5825493 C72.6315965,45.4915983 72.5291899,42.1307343 70.8496265,39.7092873 C68.4925027,36.7035633 61.3031931,35.0155983 58.0677225,37.1973145 C56.9316756,38.1134415 55.5332211,39.3947567 54.4400731,40.9467253 C51.4184905,46.7090163 48.8992397,53.1807013 48.6232967,60.0864113 C48.4467852,62.4404603 48.8195092,64.8015563 49.9522951,66.4170563 C52.7246769,71.2297103 58.9030729,72.9630273 65.4981879,70.6797773 C69.2687159,69.1977223 72.0455205,65.7070033 72.3145621,62.2746703 C72.4601178,60.3574103 73.3015525,58.6378263 74.5437563,58.2130573 C77.467368,57.1387533 79.7778755,59.3642523 80.8903576,61.6283993 C81.482572,63.0288553 82.2544874,64.4009483 83.1211405,65.6224203 C84.9573995,67.8368283 88.8531965,69.8123693 92.1297885,69.0710603 C95.4630895,68.2831273 97.0395356,65.1102363 97.5011366,62.4044013 C98.4760656,58.5512853 98.0815067,54.8155303 95.9981267,51.9382873 C92.3797237,46.4268393 85.0420197,44.4308033 80.3472667,46.5801013 C78.4243596,47.6111183 74.9603591,48.1827083 72.3145621,48.5825493 Z"
            ></path>
          </g>
        </svg>
        <span>Sign In with Apple</span>
      </button>

      <div className="bottom_txt_container">
        <span className="bottom_text">
          Don’t have an account?
          <span className="bottom_text_primary"> Sign Up</span>
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
