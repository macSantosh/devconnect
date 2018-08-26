import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="text-center container">
      <h1>
        <strong>Page Not Found</strong>{" "}
      </h1>
      <span class="mute">Sorry, Page you are looking for is not found. </span>
      <br />
      <Link to="/" class="btn btn-secondary mt-3">
        Home
      </Link>
    </div>
  );
};

export default PageNotFound;
