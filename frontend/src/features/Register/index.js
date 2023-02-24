import React, { useState, useEffect, useMemo, useRef } from "react";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import LoadingButton from "@mui/lab/LoadingButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { register, selectRegister } from "../../reducers/authSlice";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, NavLink } from "react-router-dom";
import paths from "../../routes/paths";
import { Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./style.scss";

function Register() {
  const { isAuthenticated } = useAuth();
  const { isLoading, error } = useSelector(selectRegister);
  const dispatch = useDispatch();
  const nameRef = useRef();

  const [data, setData] = useState({
    password: "",
    email: "",
    password_confirmation: "",
    name: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);

  const enableSave = useMemo(
    () =>
      data.email !== "" &&
      data.password !== "" &&
      data.password_confirmation !== "" &&
      data.name !== "" &&
      data.password === data.password_confirmation,
    [data]
  );

  useEffect(() => {
    nameRef?.current?.focus();
  }, []);

  if (isAuthenticated) {
    return <Navigate to={paths.HOME} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(data));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangeInputs = (e) => {
    const property = e.target.name;
    setData({ ...data, [property]: e.target.value });
  };

  return (
    <section className="register-container">
      <form onSubmit={handleSubmit}>
        <FormHelperText error={!!error}>{error || " "}</FormHelperText>
        <TextField
          id="name"
          name="name"
          value={data.name}
          onChange={handleChangeInputs}
          inputRef={nameRef}
          placeholder="Name"
          required
          margin="dense"
        />
        <TextField
          id="email"
          name="email"
          value={data.email}
          onChange={handleChangeInputs}
          placeholder="Email"
          required
          margin="dense"
        />
        <FormControl>
          <OutlinedInput
            id="password"
            name="password"
            value={data.password}
            onChange={handleChangeInputs}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            margin="dense"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl>
          <OutlinedInput
            id="password_confirmation"
            name="password_confirmation"
            value={data.password_confirmation}
            onChange={handleChangeInputs}
            type={showPassword ? "text" : "password"}
            placeholder="Password Confirmation"
            required
            margin="dense"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <LoadingButton
          loadingPosition="start"
          startIcon=" "
          loading={isLoading}
          disabled={!enableSave}
          type="submit"
          variant="contained"
        >
          Register
        </LoadingButton>
        <NavLink className="nav-link-item" to={paths.LOGIN}>
          <ArrowBackIcon />
          <Typography>Already Has Account! Back To Login</Typography>
        </NavLink>
      </form>
    </section>
  );
}

export default Register;
