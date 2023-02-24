import { Box, Divider } from "@mui/material";
import React from "react";

function ContentCard({ article }) {
  return (
    <Box>
      <div className="article-title">{article.title}</div>
      <Divider />

      <div className="author">
        <span>Author:</span>
        <span> {article.author || "Unknown"}</span>
      </div>
      {article.category && (
        <div className="category">
          <span>Category:</span> <span> {article.category}</span>
        </div>
      )}
      {article.source && (
        <div className="source">
          <span>Source:</span>
          <span> {article.source}</span>
        </div>
      )}
      <div className="card-footer">
        <div className="date">{article.date}</div>
        <div className="article-url">
          <a href={article.url} target="_blank" rel="noreferrer">
            View Article
          </a>
        </div>
      </div>
    </Box>
  );
}

export default ContentCard;
