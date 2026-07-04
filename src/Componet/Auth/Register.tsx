import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Select, SelectProps, styled } from "@mui/material";
import { SendButton } from "../../commonFiles/SendButton";
import registrationImage from "../../assets/form_page.png";
import "./registration.css";
import FormControl from "@mui/material/FormControl";
import { CustomMenuItem } from "../../commonFiles/commonTheme";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";

const BaseSelect = styled(Select)(() => ({
  backgroundColor: "#00111C",
  color: "white",
  fontFamily: "cursive",
  "& .MuiSelect-icon": {
    color: "white",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
}));

const StyledSelect = styled(({ className, ...props }: SelectProps) => (
  <BaseSelect {...props} MenuProps={{ PaperProps: { className } }} />
))(() => ({
  backgroundColor: "#00111C",
}));

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    acc_type: "customer",
    name: "",
    age: "",
    breed: "",
    birthdate: "",
    gender: "male",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    breed: "",
  });

  const accountType = ["Business", "Customer"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      breed: "",
    };

    let isValid = true;

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      isValid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username =
        "Username can only contain letters, numbers, and underscores";
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "confirm password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      // we are intentionally making password empty
      setFormData((prev) => ({
        ...prev,
        confirmPassword: "",
      }));
      newErrors.confirmPassword = "Password Mismatch";
      isValid = false;
    }

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Breed validation
    if (!formData.breed.trim()) {
      newErrors.breed = "Breed is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Remove confirmPassword before sending to API
    const { confirmPassword, ...registerData } = formData;
    void confirmPassword;

    const success = await register(registerData);

    if (success) {
      // Redirect to home or dashboard
      navigate("/");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#09212e" }}>
      <div style={{ width: "45%", backgroundColor: "#5b7d8f", padding: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={registrationImage} alt="Registration" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
      </div>
      <div style={{ width: "55%", backgroundColor: "#09212e", padding: "32px 48px", minHeight: "100vh", overflowY: "auto", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ width: "100%", margin: "0 auto", minHeight: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(90deg,#ffb366,#ff7f50)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, color: "#fff" }}>🐾</div>
            <h1 style={{ fontSize: 38, color: "#ffb703", fontStyle: "italic", margin: 0, fontWeight: 700 }}>Join PawBuddy — Create Your Account!</h1>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", minHeight: "calc(100vh - 240px)", justifyContent: "space-between" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div>
                <label style={{ fontSize: 15, color: "#b8c5d0", fontWeight: 700, marginBottom: 10, display: "block" }}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Enter your full name"
                  onChange={handleChange}
                  disabled={isLoading}
                  style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "none", fontSize: 16, background: "#0a1620", color: "#b8c5d0" }}
                  title={errors.name}
                />
                {errors.name && <span style={{ color: "red", fontSize: 12 }}>{errors.name}</span>}
              </div>

              <div>
                <label style={{ fontSize: 15, color: "#b8c5d0", fontWeight: 700, marginBottom: 10, display: "block" }}>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  placeholder="Enter username"
                  onChange={handleChange}
                  disabled={isLoading}
                  style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "none", fontSize: 16, background: "#0a1620", color: "#b8c5d0" }}
                  title={errors.username}
                />
                {errors.username && <span style={{ color: "red", fontSize: 12 }}>{errors.username}</span>}
              </div>

              <div>
                <label style={{ fontSize: 15, color: "#b8c5d0", fontWeight: 700, marginBottom: 10, display: "block" }}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Enter your email"
                  onChange={handleChange}
                  disabled={isLoading}
                  style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "none", fontSize: 16, background: "#0a1620", color: "#b8c5d0" }}
                  title={errors.email}
                />
                {errors.email && <span style={{ color: "red", fontSize: 12 }}>{errors.email}</span>}
              </div>

              <div>
                <label style={{ fontSize: 15, color: "#b8c5d0", fontWeight: 700, marginBottom: 10, display: "block" }}>Breed</label>
                <input
                  type="text"
                  name="breed"
                  value={formData.breed}
                  placeholder="Enter breed"
                  onChange={handleChange}
                  disabled={isLoading}
                  style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "none", fontSize: 16, background: "#0a1620", color: "#b8c5d0" }}
                  title={errors.breed}
                />
                {errors.breed && <span style={{ color: "red", fontSize: 12 }}>{errors.breed}</span>}
              </div>

              <div>
                <label style={{ fontSize: 15, color: "#b8c5d0", fontWeight: 700, marginBottom: 10, display: "block" }}>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="Create a password"
                  onChange={handleChange}
                  disabled={isLoading}
                  style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "none", fontSize: 16, background: "#0a1620", color: "#b8c5d0" }}
                  title={errors.password}
                />
                {errors.password && <span style={{ color: "red", fontSize: 12 }}>{errors.password}</span>}
              </div>

              <div>
                <label style={{ fontSize: 15, color: "#b8c5d0", fontWeight: 700, marginBottom: 10, display: "block" }}>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  placeholder="Confirm password"
                  onChange={handleChange}
                  disabled={isLoading}
                  style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "none", fontSize: 16, background: "#0a1620", color: "#b8c5d0" }}
                  title={errors.confirmPassword}
                />
                {errors.confirmPassword && <span style={{ color: "red", fontSize: 12 }}>{errors.confirmPassword}</span>}
              </div>

              <div>
                <label style={{ fontSize: 15, color: "#b8c5d0", fontWeight: 700, marginBottom: 10, display: "block" }}>Age</label>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  placeholder="Enter age"
                  onChange={handleChange}
                  disabled={isLoading}
                  style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "none", fontSize: 16, background: "#0a1620", color: "#b8c5d0" }}
                />
              </div>

              <div>
                <label style={{ fontSize: 15, color: "#b8c5d0", fontWeight: 700, marginBottom: 10, display: "block" }}>Account Type</label>
                <FormControl sx={{ width: "100%" }} size="small">
                  <StyledSelect
                    id="acc_type"
                    name="acc_type"
                    value={formData.acc_type}
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        acc_type: event.target.value as string,
                      });
                    }}
                    disabled={isLoading}
                    sx={{ backgroundColor: "#0a1620", color: "#b8c5d0", fontSize: 16 }}
                  >
                    {accountType.map((acc_type, index) => (
                      <CustomMenuItem value={acc_type.toLowerCase()} key={`acc_type${acc_type}_${index}`}>
                        {acc_type}
                      </CustomMenuItem>
                    ))}
                  </StyledSelect>
                </FormControl>
              </div>

              <div>
                <label style={{ fontSize: 15, color: "#b8c5d0", fontWeight: 700, marginBottom: 10, display: "block" }}>Birthdate</label>
                <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleChange}
                  disabled={isLoading}
                  style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "none", fontSize: 16, background: "#0a1620", color: "#b8c5d0" }}
                />
              </div>

              <div>
                <label style={{ fontSize: 15, color: "#b8c5d0", fontWeight: 700, marginBottom: 10, display: "block" }}>Gender</label>
                <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
                  <FormControlLabel
                    value="male"
                    control={<Radio sx={{ color: "#ffb703", "&.Mui-checked": { color: "#ffb703" } }} />}
                    label={<Typography style={{ fontSize: 16, color: "#b8c5d0" }}>Male</Typography>}
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio sx={{ color: "#ffb703", "&.Mui-checked": { color: "#ffb703" } }} />}
                    label={<Typography style={{ fontSize: 16, color: "#b8c5d0" }}>Female</Typography>}
                  />
                </RadioGroup>
              </div>
            </div>

            <div style={{ marginTop: 28, textAlign: "center" }}>
              <SendButton
                operationOnData={handleSubmit}
                text={isLoading ? "Creating..." : "SUBMIT"}
                style={{
                  height: 48,
                  width: 220,
                  borderRadius: 12,
                  background: "linear-gradient(90deg,#ff7f50,#ffb366)",
                  color: "white",
                  border: "none",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: isLoading ? "not-allowed" : "pointer",
                  opacity: isLoading ? 0.7 : 1,
                }}
              />
            </div>

            <div style={{ marginTop: 16, textAlign: "center", fontSize: 14, color: "#b8c5d0" }}>
              Already have an account?{" "}
              <Link to="/auth/login" style={{ color: "#ffb703", textDecoration: "none", fontWeight: 700 }}>
                Login here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
