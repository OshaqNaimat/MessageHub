import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function WhatsAppSignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (!data.email || !data.password) {
      alert("Please fill in all fields");
      return;
    }

    console.log("Signing in:", response.data);
    alert("Signed In Successfully! 🎉");
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
            <img src="/logo.png" alt="" />
          </div>
          <h1 className="text-white text-2xl font-bold tracking-wide">
            Welcome
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: "14px",
              marginTop: 4,
            }}
          >
            Sign in to your account
          </p>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-4">
          <div className="input-wrap">
            <span className="input-icon">✉️</span>
            <input
              ref={emailRef}
              type="email"
              placeholder="Email Address"
              className="input-field"
            />
          </div>

          <div className="input-wrap">
            <span className="input-icon">🔒</span>
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              className="input-field"
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <span
              style={{
                color: "#25D366",
                fontSize: "13px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Forgot Password?
            </span>
          </div>

          <button
            onClick={handleSubmit}
            className="submit-btn w-full text-white cursor-pointer font-bold py-4 rounded-xl text-base mt-1"
            style={{ letterSpacing: "0.5px" }}
          >
            Sign In
          </button>
        </div>

        {/* Footer */}
        <p
          className="text-center mt-6"
          style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}
        >
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/sign-up")}
            style={{ color: "#25D366", cursor: "pointer", fontWeight: 600 }}
          >
            Create Account
          </span>
        </p>

        <p
          className="text-center mt-3"
          style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px" }}
        >
          By signing in, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
}
