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
import { updateProfile, selectUpdate } from "../../reducers/profileSlice";
import { useAuth } from "../../hooks/useAuth";
import "./style.scss";

function Profile() {
  const { user: initialData } = useAuth();
  const { isLoading, error } = useSelector(selectUpdate);
  const dispatch = useDispatch();
  const nameRef = useRef();

  const [data, setData] = useState({
    password: "",
    password_confirmation: "",
    email: initialData.email,
    name: initialData.name,
  });
  const [showPassword, setShowPassword] = React.useState(false);

  const enableSave = useMemo(() => {
    if (data.password !== "" && data.password === data.password_confirmation) {
      return true;
    } else {
      if (data.email !== initialData.email || data.name !== initialData.name) {
        return true;
      }
      return false;
    }
  }, [data, initialData]);

  useEffect(() => {
    nameRef?.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(data));
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
    <section className="profile-container">
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
          Save
        </LoadingButton>
      </form>
    </section>
  );
}

export default Profile;
