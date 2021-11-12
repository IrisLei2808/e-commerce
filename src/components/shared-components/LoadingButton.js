import React from "react";

const LoadingButton = ({ loading, title }) => {
  return (
    <div>
      <button
        className="btn btn-primary btn-block mt-3"
        type="submit"
        disabled={loading}
      >
        <span
          className={loading ? "spinner-border spinner-border-sm" : ""}
          role="status"
          aria-hidden="true"
        ></span>
        {loading ? "Loading..." : title}
      </button>
    </div>
  );
};

export default LoadingButton;
