import { useRef, useState } from "react";
import axios from "axios";
export default function WhatsAppRegister() {
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
    c_password: "",
  });

  const { name, email, password, number, c_password } = formFields;

  const handleChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const registerData = {
      name,
      email,
      password,
      number,
    };

    const response = await axios.post(
      "http:localhost:6000/api/auth/register",
      registerData,
    );
    console.log(response);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, #0a1628 0%, #0d2137 40%, #0a1628 100%)",
        fontFamily: "'Georgia', serif",
      }}
    >
      {/* Background bubbles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-5"
            style={{
              background: "#25D366",
              width: `${80 + i * 60}px`,
              height: `${80 + i * 60}px`,
              top: `${10 + i * 15}%`,
              left: `${5 + i * 16}%`,
              animation: `pulse ${3 + i}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes pulse { from { transform: scale(1); } to { transform: scale(1.15); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes glow { 0%,100% { box-shadow: 0 0 10px #25D36640; } 50% { box-shadow: 0 0 24px #25D36680; } }
        .input-field {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(37,211,102,0.2);
          border-radius: 12px;
          color: #fff;
          width: 100%;
          padding: 14px 18px 14px 48px;
          font-size: 15px;
          outline: none;
          transition: all 0.3s ease;
        }
        .input-field::placeholder { color: rgba(255,255,255,0.35); }
        .input-field:focus {
          border-color: #25D366;
          background: rgba(37,211,102,0.07);
          box-shadow: 0 0 0 3px rgba(37,211,102,0.12);
        }
        .card { animation: fadeUp 0.7s ease forwards; }
        .submit-btn {
          background: linear-gradient(135deg, #25D366, #128C7E);
          transition: all 0.3s ease;
          animation: glow 2.5s ease-in-out infinite;
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(37,211,102,0.4);
        }
        .submit-btn:active { transform: translateY(0); }
        .input-wrap { position: relative; }
        .input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #25D366;
          font-size: 16px;
          pointer-events: none;
        }
      `}</style>

      <div
        className="card w-full max-w-md mx-4"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(37,211,102,0.15)",
          borderRadius: "24px",
          padding: "40px 36px",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
        }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="flex items-center justify-center mb-4"
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #25D366, #128C7E)",
              boxShadow: "0 8px 32px rgba(37,211,102,0.35)",
            }}
          >
            <svg viewBox="0 0 24 24" width="38" height="38" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.121 1.533 5.856L.054 23.447a.75.75 0 00.921.921l5.591-1.479A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.712 9.712 0 01-4.964-1.363l-.355-.212-3.678.972.986-3.595-.232-.37A9.712 9.712 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
            </svg>
          </div>
          <h1 className="text-white text-2xl font-bold tracking-wide">
            Create Account
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: "14px",
              marginTop: 4,
            }}
          >
            Join WhatsApp today
          </p>
        </div>

        <form action="">
          {/* Fields */}
          <div className="flex flex-col gap-4">
            <div className="input-wrap">
              <span className="input-icon">👤</span>
              <input
                name="name"
                value={name}
                onChange={handleChange}
                type="text"
                placeholder="Full Name"
                className="input-field"
              />
            </div>

            <div className="input-wrap">
              <span className="input-icon">✉️</span>
              <input
                name="email"
                value={email}
                onChange={handleChange}
                type="email"
                placeholder="Email Address"
                className="input-field"
              />
            </div>

            <div className="input-wrap">
              <span className="input-icon">📱</span>
              <input
                name="number"
                value={number}
                onChange={handleChange}
                type="tel"
                placeholder="Phone Number"
                className="input-field"
              />
            </div>

            <div className="input-wrap">
              <span className="input-icon">🔒</span>
              <input
                name="password"
                value={password}
                onChange={handleChange}
                type="password"
                placeholder="Password"
                className="input-field"
              />
            </div>

            <div className="input-wrap">
              <span className="input-icon">🔑</span>
              <input
                name="c_password"
                value={c_password}
                onChange={handleChange}
                type="password"
                placeholder="Confirm Password"
                className="input-field"
              />
            </div>

            <button
              className="submit-btn w-full text-white font-bold py-4 rounded-xl text-base mt-2"
              style={{ letterSpacing: "0.5px" }}
            >
              Create Account
            </button>
          </div>
        </form>

        {/* Footer */}
        <p
          className="text-center mt-6"
          style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}
        >
          Already have an account?{" "}
          <span
            style={{ color: "#25D366", cursor: "pointer", fontWeight: 600 }}
          >
            Sign In
          </span>
        </p>

        <p
          className="text-center mt-3"
          style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px" }}
        >
          By registering, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
}
