import { NavLink, useNavigate } from "react-router-dom";
import { Mail, Lock, User, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import toast from "react-hot-toast";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const { createUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const [mounted, setMounted] = useState(false);
  const [loadingRedirect, setLoadingRedirect] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
  }, []);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    clearErrors("confirmPassword");

    try {
      await createUser(data.email, data.password);
      const savedUser = {
        name: data.name,
        email: data.email,
        role: "user",
      };

      const response = await axios.post(
        "http://localhost:8157/users",
        savedUser
      );

      if (response.data.insertedId || response.data.acknowledged) {
        toast.success("Account created successfully");
        setLoadingRedirect(true);
        setTimeout(() => navigate("/"), 300); // Allow AuthContext to update
      } else {
        toast.error("User not saved in database");
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.");
      console.error(error);
    }
  };

  const blue = "#64b5f6";
  const blueLight = "#90caf9";
  const darkBg = "#1e1e1e";
  const inputBg = "#2c2c2c";
  const textColor = "#e0e0e0";
  const errorColor = "#ff6b6b";

  const inputWrapperStyle = (hasError) => ({
    position: "relative",
    display: "flex",
    alignItems: "center",
    borderRadius: 24,
    backgroundColor: inputBg,
    border: `2px solid ${hasError ? errorColor : blueLight + "80"}`,
    padding: "12px 16px",
    marginBottom: 8,
    boxShadow: hasError
      ? `inset 2px 2px 5px ${errorColor}, inset -2px -2px 5px #7f0000`
      : `6px 6px 12px #1a1a1a, -6px -6px 12px #393939`,
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  });

  const inputStyle = {
    flex: 1,
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    color: textColor,
    fontSize: 16,
    fontWeight: 500,
    paddingLeft: 12,
    fontFamily: "'Inter', sans-serif",
  };

  const iconStyle = (hasError) => ({
    color: hasError ? errorColor : blue,
    flexShrink: 0,
  });

  const ErrorMessage = ({ message }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        color: errorColor,
        fontSize: 14,
        marginBottom: 8,
        fontWeight: 600,
        fontFamily: "'Inter', sans-serif",
        animation: "fadeIn 0.3s ease forwards",
      }}
    >
      <AlertCircle size={16} />
      <span>{message}</span>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );

  return (
    <div
      className="min-h-screen pt-[96px] flex items-center justify-center px-4"
      style={{ backgroundColor: "#121212", fontFamily: "'Inter', sans-serif" }}
    >
      <title>BookBarn | Sign Up</title>

      <div
        className={`w-full max-w-xl p-10 rounded-3xl shadow-xl border border-white/10 transition-all duration-300 bg-[${darkBg}] ${
          mounted ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        style={{
          backgroundColor: darkBg,
          boxShadow:
            "0 12px 30px rgba(0,0,0,0.7), inset 0 0 10px rgba(0,0,0,0.4)",
          borderRadius: 24,
        }}
      >
        <h2
          className="text-4xl font-bold text-center mb-8 tracking-wide"
          style={{
            color: blue,
            textShadow: `0 0 8px ${blue}88`,
            letterSpacing: "0.02em",
          }}
        >
          Create Your BookBarn Account
        </h2>

        {loadingRedirect ? (
          <div className="text-center text-white text-lg">Redirecting...</div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div style={inputWrapperStyle(errors.name)}>
              <User size={22} style={iconStyle(errors.name)} />
              <input
                type="text"
                {...register("name", { required: "Full Name is required" })}
                placeholder="Full Name"
                style={inputStyle}
              />
            </div>
            {errors.name && <ErrorMessage message={errors.name.message} />}

            {/* Email */}
            <div style={inputWrapperStyle(errors.email)}>
              <Mail size={22} style={iconStyle(errors.email)} />
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email address",
                  },
                  validate: (email) => {
                    const domain = email.split("@")[1]?.toLowerCase() || "";
                    return (
                      domain.includes(".edu") ||
                      "You must use an educational email address"
                    );
                  },
                })}
                placeholder="Educational Email Address"
                style={inputStyle}
              />
            </div>
            {errors.email && <ErrorMessage message={errors.email.message} />}

            {/* Password */}
            <div style={inputWrapperStyle(errors.password)}>
              <Lock size={22} style={iconStyle(errors.password)} />
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="Password"
                style={inputStyle}
              />
            </div>
            {errors.password && (
              <ErrorMessage message={errors.password.message} />
            )}

            {/* Confirm Password */}
            <div style={inputWrapperStyle(errors.confirmPassword)}>
              <Lock size={22} style={iconStyle(errors.confirmPassword)} />
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                })}
                placeholder="Confirm Password"
                style={inputStyle}
              />
            </div>
            {errors.confirmPassword && (
              <ErrorMessage message={errors.confirmPassword.message} />
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-8 w-full py-3 text-sm font-semibold rounded-xl transition"
              style={{
                backgroundColor: blue,
                color: "#121212",
                boxShadow: `0 8px 15px ${blue}aa`,
                userSelect: "none",
                letterSpacing: "0.05em",
                textShadow: `0 0 6px ${blueLight}`,
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = blueLight;
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow = `0 12px 20px ${blueLight}cc`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = blue;
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = `0 8px 15px ${blue}aa`;
              }}
            >
              Sign Up
            </button>
          </form>
        )}

        <p
          className="text-center text-sm mt-6 font-semibold"
          style={{
            color: blue,
            letterSpacing: "0.03em",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="hover:underline"
            style={{ color: blue }}
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
