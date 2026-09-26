"use client";
import { useState } from "react";

export default function Auth() {
  const [signup, setSignup] = useState(false);
  const [method, setMethod] = useState("email");

  return (
    <main>
      <div className="card">
        <div className="logo">S</div>
        <h1>StockSense</h1>
        <h2>{signup ? "Create Account" : "Welcome Back!"}</h2>
        <p>{signup ? "Create your account" : "Login to your account"}</p>

        {signup ? (
          <form onSubmit={e => {
            e.preventDefault();
            alert("Signup UI working!");
          }}>
            <input placeholder="Full Name" required />
            <input type="email" placeholder="Email Address" required />
            <input type="tel" placeholder="Mobile Number" required />
            <input type="password" placeholder="Create Password" required />
            <button className="primary">Sign Up</button>
          </form>
        ) : (
          <>
            <button className="google" onClick={() => alert("Google login setup required")}>
              🌐 Continue with Google
            </button>

            <div className="or">OR LOGIN WITH</div>

            <div className="tabs">
              <button className={method === "email" ? "active" : ""}
                onClick={() => setMethod("email")}>Email</button>
              <button className={method === "mobile" ? "active" : ""}
                onClick={() => setMethod("mobile")}>Mobile</button>
            </div>

            <form onSubmit={e => {
              e.preventDefault();
              alert("Login UI working!");
            }}>
              <input
                type={method === "email" ? "email" : "tel"}
                placeholder={method === "email" ? "Email Address" : "Mobile Number"}
                required
              />
              <input type="password" placeholder="Password" required />
              <button className="primary">Login</button>
            </form>
          </>
        )}

        <p className="switch">
          {signup ? "Already have an account?" : "Don't have an account?"}
          <button onClick={() => setSignup(!signup)}>
            {signup ? " Login" : " Sign Up"}
          </button>
        </p>
      </div>

      <style jsx>{`
        * { box-sizing: border-box; }
        main {
          min-height: 100vh; display: grid; place-items: center;
          background: #eaf3ff; padding: 20px;
          font-family: Arial, sans-serif;
        }
        .card {
          background: white; width: 100%; max-width: 400px;
          padding: 32px; border-radius: 18px;
          box-shadow: 0 10px 35px #174a8b20;
        }
        .logo {
          margin: auto; width: 48px; height: 48px;
          display: grid; place-items: center; border-radius: 14px;
          background: #2563eb; color: white; font-size: 27px;
          font-weight: bold;
        }
        h1, h2, p { text-align: center; }
        h1 { color: #2563eb; margin: 10px 0 25px; }
        h2 { color: #172554; margin-bottom: 5px; }
        p { color: #64748b; font-size: 14px; }
        form { display: grid; gap: 13px; }
        input {
          padding: 13px; border: 1px solid #cbd5e1;
          border-radius: 8px; width: 100%; outline-color: #2563eb;
        }
        button { cursor: pointer; }
        .google, .primary {
          width: 100%; padding: 13px; border-radius: 8px;
          font-weight: bold; font-size: 15px;
        }
        .google {
          background: white; border: 1px solid #cbd5e1;
          color: #1e293b; margin-top: 20px;
        }
        .or { text-align: center; color: #94a3b8; margin: 20px; font-size: 12px; }
        .tabs { display: flex; gap: 10px; margin-bottom: 15px; }
        .tabs button {
          flex: 1; padding: 11px; border: 1px solid #cbd5e1;
          background: white; border-radius: 8px;
        }
        .tabs .active { background: #dbeafe; color: #1d4ed8; border-color: #2563eb; }
        .primary { background: #2563eb; color: white; border: 0; }
        .primary:hover { background: #1d4ed8; }
        .switch { margin-top: 24px; }
        .switch button {
          color: #2563eb; border: 0; background: none;
          font-weight: bold;
        }
      `}</style>
    </main>
  );
}