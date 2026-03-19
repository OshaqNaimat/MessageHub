import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function OTPVerification() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const inputRefs = useRef([]);
  const timerRef = useRef(null);
  const otpRef = useRef(""); // ✅ Fix: ref to always hold latest OTP
  const navigate = useNavigate();

  useEffect(() => {
    inputRefs.current[0]?.focus();
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const startTimer = () => {
    clearInterval(timerRef.current);
    setCountdown(30);
    let t = 30;
    timerRef.current = setInterval(() => {
      t--;
      setCountdown(t);
      if (t <= 0) clearInterval(timerRef.current);
    }, 1000);
  };

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val && e.nativeEvent.inputType !== "deleteContentBackward") return;

    const newOtp = otpRef.current.split(""); // ✅ use ref, not stale state
    while (newOtp.length < 4) newOtp.push("");
    newOtp[idx] = val ? val[0] : "";
    const updated = newOtp.join("");

    otpRef.current = updated; // ✅ sync ref immediately
    setOtp(updated);
    setError("");

    if (val && idx < 3) inputRefs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otpRef.current[idx] && idx > 0) {
      const newOtp = otpRef.current.split(""); // ✅ use ref
      newOtp[idx - 1] = "";
      const updated = newOtp.join("");
      otpRef.current = updated; // ✅ sync ref
      setOtp(updated);
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);
    if (!paste) return;
    const updated = paste.padEnd(4, "").slice(0, 4);
    otpRef.current = updated; // ✅ sync ref
    setOtp(updated);
    inputRefs.current[Math.min(paste.length, 3)]?.focus();
  };

  const convertedData = JSON.parse(localStorage.getItem("user") || "{}");
  const email = convertedData?.email || "";

  const handleVerify = async () => {
    const currentOtp = otpRef.current.trim();

    // console.log("Sending:", { email, otp: currentOtp }); // 🔍 DEBUG

    if (currentOtp.length < 4) {
      setError("Please enter all 4 digits.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5174/api/auth/otpVerification",
        {
          otp: String(currentOtp), // ✅ force string
          email: email?.trim(), // ✅ safe email
        },
      );

      console.log("SUCCESS RESPONSE:", response.data); // 🔍 DEBUG

      setVerified(true);
      navigate("/MainPage");

      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (err) {
      console.log("ERROR RESPONSE:", err.response?.data || err.message); // 🔥 IMPORTANT

      setError(
        err.response?.data?.message || "Incorrect code. Please try again.",
      );

      otpRef.current = "";
      setOtp("");

      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
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
        @keyframes shake { 0%,100% { transform: translateX(0); } 20% { transform: translateX(-8px); } 40% { transform: translateX(8px); } 60% { transform: translateX(-6px); } 80% { transform: translateX(6px); } }
        @keyframes popIn { 0% { transform: scale(0.8); opacity:0; } 60% { transform: scale(1.1); } 100% { transform: scale(1); opacity:1; } }
        .otp-card { animation: fadeUp 0.7s ease forwards; }
        .otp-input-box {
          width: 64px; height: 70px;
          background: rgba(255,255,255,0.05);
          border: 1.5px solid rgba(37,211,102,0.2);
          border-radius: 16px;
          color: #fff;
          font-size: 28px;
          font-weight: 700;
          text-align: center;
          outline: none;
          transition: all 0.25s ease;
          caret-color: #25D366;
        }
        .otp-input-box::placeholder { color: rgba(255,255,255,0.2); font-size: 20px; }
        .otp-input-box:focus {
          border-color: #25D366;
          background: rgba(37,211,102,0.08);
          box-shadow: 0 0 0 3px rgba(37,211,102,0.15);
          transform: translateY(-3px);
        }
        .otp-input-box.filled {
          border-color: rgba(37,211,102,0.55);
          background: rgba(37,211,102,0.06);
        }
        .otp-input-box.error {
          border-color: #ff5e5e !important;
          background: rgba(255,94,94,0.08) !important;
          animation: shake 0.4s ease;
        }
        .verify-btn {
          background: linear-gradient(135deg, #25D366, #128C7E);
          transition: all 0.3s ease;
          animation: glow 2.5s ease-in-out infinite;
          cursor: pointer;
        }
        .verify-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(37,211,102,0.4); }
        .verify-btn:active { transform: translateY(0); }
        .success-circle { animation: popIn 0.4s ease forwards; }
      `}</style>

      <div
        className="otp-card w-full max-w-md mx-4"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(37,211,102,0.15)",
          borderRadius: "24px",
          padding: "40px 36px",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
        }}
      >
        {/* Back Arrow */}
        <span
          onClick={() => navigate("/")}
          className="inline-flex cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
          style={{
            filter: "drop-shadow(0 0 6px rgba(37,211,102,0.5))",
            color: "#25D366",
          }}
        >
          <FaArrowLeft />
        </span>

        {!verified ? (
          <>
            {/* Header */}
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
                Verify Your Number
              </h1>
              <p
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "14px",
                  marginTop: 4,
                  textAlign: "center",
                }}
              >
                We sent a 4-digit code to
              </p>
              <span
                style={{
                  marginTop: 10,
                  background: "rgba(37,211,102,0.12)",
                  border: "1px solid rgba(37,211,102,0.25)",
                  borderRadius: 20,
                  color: "#25D366",
                  fontSize: 13,
                  fontWeight: 600,
                  padding: "4px 16px",
                }}
              >
                +92 *** *** 7821
              </span>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mb-6">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: otp[i] ? "#25D366" : "rgba(37,211,102,0.2)",
                    transition: "background 0.3s ease",
                  }}
                />
              ))}
            </div>

            {/* OTP Inputs */}
            <div className="flex justify-center gap-3 mb-2">
              {[0, 1, 2, 3].map((idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  className={`otp-input-box ${otp[idx] ? "filled" : ""} ${error ? "error" : ""}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={otp[idx] || ""}
                  placeholder="—"
                  onChange={(e) => handleChange(e, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  onPaste={handlePaste}
                />
              ))}
            </div>

            {/* Error */}
            <p
              style={{
                textAlign: "center",
                color: "#ff6b6b",
                fontSize: 13,
                minHeight: 20,
                marginBottom: 12,
              }}
            >
              {error}
            </p>

            {/* Verify Button */}
            <button
              className="verify-btn w-full text-white font-bold py-4 rounded-xl text-base"
              style={{ letterSpacing: "0.5px" }}
              onClick={handleVerify}
            >
              Verify & Continue
            </button>

            {/* Resend */}
            <p
              style={{
                textAlign: "center",
                color: "rgba(255,255,255,0.35)",
                fontSize: 13,
                marginTop: 16,
              }}
            >
              {countdown > 0 ? (
                <>
                  Resend code in{" "}
                  <span style={{ color: "#25D366" }}>{countdown}s</span>
                </>
              ) : (
                <span
                  style={{ color: "#25D366", cursor: "pointer" }}
                  onClick={startTimer}
                >
                  Resend Code
                </span>
              )}
            </p>
          </>
        ) : (
          /* Success State */
          <div className="flex flex-col items-center gap-4 py-6">
            <div
              className="success-circle flex items-center justify-center"
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #25D366, #128C7E)",
                boxShadow: "0 8px 32px rgba(37,211,102,0.4)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width="40"
                height="40"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="text-white text-2xl font-bold">Verified!</h1>
            <p
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: 14,
                textAlign: "center",
              }}
            >
              Your number has been confirmed.
              <br />
              Welcome to MessageHub!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
