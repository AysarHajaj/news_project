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
import { login, selectLogin } from "../../reducers/authSlice";
import "./style.scss";

function Login() {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const { isLoading, error } = useSelector(selectLogin);

  const [data, setData] = useState({ password: "", email: "" });
  const [showPassword, setShowPassword] = React.useState(false);

  const enableSave = useMemo(
    () => data.email !== "" && data.password !== "",
    [data]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(data));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangeInputs = (e) => {
    const property = e.target.name;
    setData({ ...data, [property]: e.target.value });
  };

  useEffect(() => {
    emailRef?.current?.focus();
  }, []);

  return (
    <section className="login-container">
      <form onSubmit={handleSubmit}>
        <FormHelperText error={!!error}>{error || " "}</FormHelperText>
        <TextField
          id="email"
          name="email"
          value={data.email}
          onChange={handleChangeInputs}
          inputRef={emailRef}
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
        <LoadingButton
          loadingPosition="start"
          startIcon=" "
          loading={isLoading}
          disabled={!enableSave}
          type="submit"
          variant="contained"
        >
          Login
        </LoadingButton>
      </form>
    </section>
  );
}

export default Login;
