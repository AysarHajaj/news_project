import * as React from "react";
import Pagination from "@mui/material/Pagination";

export default function BasicPagination({ count, onChange, page = 1 }) {
  return (
    <Pagination
      className="article-pagination"
      onChange={onChange}
      page={page}
      count={count}
      color="primary"
    />
  );
}
