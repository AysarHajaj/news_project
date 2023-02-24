import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import "./style.scss";

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

function Filters({ filters, sources, categories, onSubmit, isLoading }) {
  const [data, setData] = useState({
    category: filters.category,
    sources: filters.sources,
    search_text: "",
    from_date: "",
    to_date: "",
  });

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

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="filters-form">
      <TextField
        className="search-input"
        id="search_text"
        name="search_text"
        value={data.search_text}
        onChange={(e) => {
          setData({ ...data, search_text: e.target.value });
        }}
        fullWidth
        placeholder="Search"
        margin="dense"
      />
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
                return source && <Chip key={source.id} label={source.label} />;
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
          onChange={handleChange}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className="date-container">
        <label htmlFor="from">From Date</label>
        <input
          onChange={handleChange}
          id="from"
          name="from_date"
          className="date-picker"
          type="date"
        />
      </div>
      <div className="date-container">
        <label htmlFor="to">To Date</label>
        <input
          onChange={handleChange}
          id="to"
          name="to_date"
          className="date-picker"
          type="date"
        />
      </div>
      <Button
        disabled={isLoading}
        type="submit"
        variant="contained"
        sx={{ marginLeft: "auto" }}
      >
        Apply
      </Button>
    </form>
  );
}

export default Filters;
