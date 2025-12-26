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
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
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

    const success = await register(registerData);

    if (success) {
      // Redirect to home or dashboard
      navigate("/");
    }
  };

  return (
    <div className="sign-up">
      <div className="out-box">
        <div className="pic">
          <img src={registrationImage} alt="Registration" />
        </div>
        <div className="in-box">
          <div className="details">
            <h1
              style={{
                fontFamily: "cursive",
                padding: "1%",
              }}
            >
              Join <i>PawBuddy</i> - Create Your Account!
            </h1>
          </div>
          <div className="grid">
            <div className="grid1">
              <label style={{ fontFamily: "cursive" }}>Full Name</label>
              <label style={{ fontFamily: "cursive" }}>Username</label>
              <input
                type="text"
                name="name"
                className={errors.name ? "input-error" : ""}
                value={formData.name}
                placeholder={
                  errors.name && !formData.name
                    ? errors.name
                    : "Enter your full name"
                }
                title={errors.name}
                autoComplete="off"
                onChange={handleChange}
                disabled={isLoading}
              />
              <input
                type="text"
                name="username"
                className={errors.username ? "input-error" : ""}
                value={formData.username}
                placeholder={
                  errors.username && !formData.username
                    ? errors.username
                    : "Enter username"
                }
                title={errors.username}
                autoComplete="off"
                onChange={handleChange}
                disabled={isLoading}
              />

              <label style={{ fontFamily: "cursive" }}>Email</label>
              <label style={{ fontFamily: "cursive" }}>Breed</label>
              <input
                type="email"
                name="email"
                className={errors.email ? "input-error" : ""}
                placeholder={
                  errors.email && !formData.email
                    ? errors.email
                    : "Enter your email"
                }
                title={errors.email}
                autoComplete="off"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
              <input
                type="text"
                name="breed"
                className={errors.breed ? "input-error" : ""}
                value={formData.breed}
                placeholder={
                  errors.breed && !formData.breed ? errors.breed : "Enter breed"
                }
                title={errors.breed}
                autoComplete="off"
                onChange={handleChange}
                disabled={isLoading}
              />

              <label style={{ fontFamily: "cursive" }}>Password</label>
              <label style={{ fontFamily: "cursive" }}>Confirm Password</label>
              <input
                type="password"
                name="password"
                className={errors.password ? "input-error" : ""}
                value={formData.password}
                placeholder={
                  errors.password && !formData.password
                    ? errors.password
                    : "Create a password"
                }
                title={errors.password}
                onChange={handleChange}
                disabled={isLoading}
              />
              <input
                type="password"
                name="confirmPassword"
                className={errors.confirmPassword ? "input-error" : ""}
                value={formData.confirmPassword}
                placeholder={
                  errors.confirmPassword && !formData.confirmPassword
                    ? errors.confirmPassword
                    : "Confirm password"
                }
                title={errors.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
              />

              <label style={{ fontFamily: "cursive" }}>Age</label>
              <label style={{ fontFamily: "cursive" }}>Account Type</label>
              <input
                type="text"
                name="age"
                value={formData.age}
                placeholder="Enter age"
                autoComplete="off"
                onChange={handleChange}
                disabled={isLoading}
              />

              <FormControl
                sx={{
                  maxWidth: "50%",
                  "& .MuiInputLabel-root": {
                    color: "white",
                    fontFamily: "cursive",
                    "&.Mui-focused": { color: "white" },
                    "&.MuiInputLabel-shrink": {
                      transform: "translate(14px, -6px) scale(0.75)",
                    },
                  },
                }}
                size="small"
              >
                <StyledSelect
                  labelId="acc-type-label"
                  id="acc_type"
                  name="acc_type"
                  label="Account Type"
                  value={formData.acc_type}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      acc_type: event.target.value as string,
                    });
                  }}
                  disabled={isLoading}
                >
                  {accountType.map((acc_type, index) => (
                    <CustomMenuItem
                      value={acc_type.toLowerCase()}
                      key={`acc_type${acc_type}_${index}`}
                    >
                      {acc_type}
                    </CustomMenuItem>
                  ))}
                </StyledSelect>
              </FormControl>

              <label style={{ fontFamily: "cursive" }}>Birthdate</label>
              <label style={{ fontFamily: "cursive" }}>Gender :</label>
              <input
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                disabled={isLoading}
              />
              <RadioGroup
                row
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="male"
                  control={
                    <Radio
                      sx={{
                        color: "white",
                        "&.Mui-checked": { color: "white" },
                        "& .MuiSvgIcon-root": { fontSize: 18 },
                      }}
                    />
                  }
                  label={
                    <Typography
                      style={{ fontSize: "90%", fontFamily: "cursive" }}
                    >
                      Male
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="female"
                  control={
                    <Radio
                      sx={{
                        color: "white",
                        "&.Mui-checked": { color: "white" },
                        "& .MuiSvgIcon-root": { fontSize: 18 },
                      }}
                    />
                  }
                  label={
                    <Typography
                      style={{ fontSize: "90%", fontFamily: "cursive" }}
                    >
                      Female
                    </Typography>
                  }
                />
              </RadioGroup>
            </div>
          </div>
          <div className="submit-container">
            <SendButton
              operationOnData={handleSubmit}
              text={isLoading ? "Creating..." : "SUBMIT"}
              style={{
                position: "relative",
                fontSize: "16px",
                marginTop: "10px",
                left: "auto",
                bottom: "auto",
              }}
            />
          </div>
          <div
            className="auth-footer"
            style={{
              textAlign: "center",
              marginTop: "10px",
              color: "wheat",
            }}
          >
            <p style={{ fontFamily: "cursive" }}>
              Already have an account?{" "}
              <Link
                to="/auth/login"
                style={{
                  color: "#ffd700",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
