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
import {
  selectOptions,
  getSettingsOptions,
} from "../../reducers/settingsSlice";
import { useAuth } from "../../hooks/useAuth";
import "./style.scss";
import { Box, Chip, InputLabel, MenuItem, Select } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Settings() {
  const {
    user: { setting: initialData },
  } = useAuth();
  const { isLoading, error, sources, categories } = useSelector(selectOptions);
  const dispatch = useDispatch();
  const nameRef = useRef();

  const [data, setData] = useState({
    category: initialData.category,
    sources: initialData.sources,
  });

  const enableSave = useMemo(() => {
    if (
      data.category !== initialData.category ||
      [...data.sources].sort().toString() !==
        [...initialData.sources].sort().toString()
    ) {
      return true;
    }
    return false;
  }, [data, initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(updateProfile(data));
  };

  const handleChangeMultiSelect = (event) => {
    const {
      target: { value },
    } = event;
    if (value.length !== 0) {
      setData({
        ...data,
        sources: typeof value === "string" ? value.split(",") : value,
      });
    }
  };

  useEffect(() => {
    dispatch(getSettingsOptions());
  }, [dispatch]);

  return (
    <section className="settings-container">
      <form onSubmit={handleSubmit}>
        <FormHelperText error={!!error}>{error || " "}</FormHelperText>
        <FormControl style={{ marginTop: "15px" }}>
          <InputLabel id="sources_label">Sources</InputLabel>
          <Select
            labelId="sources_label"
            id="demo-multiple-chip"
            multiple
            value={data.sources}
            onChange={handleChangeMultiSelect}
            input={<OutlinedInput id="select-multiple-chip" label="Sources" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => {
                  const source = sources.find((item) => item.id === value);
                  return (
                    source && <Chip key={source.id} label={source.label} />
                  );
                })}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {sources.map((source) => (
              <MenuItem key={source.id} value={source.id}>
                {source.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl style={{ marginTop: "15px" }}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            label="Category"
            name="category"
            value={data.category}
            onChange={(e) => {
              data.category = e.target.name;
            }}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.label}
              </MenuItem>
            ))}
          </Select>
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

export default Settings;
