import React from "react";

const ViewMoreButton = ({ viewLoading, showMoreItems, hide }) => {
  return (
    <div>
      <button
        className="btn btn-primary btn-block mt-3 mb-3 btn-lg"
        type="submit"
        disabled={viewLoading}
        style={{ margin: "auto", width: "30%", display: hide ? "none" : "" }}
        onClick={showMoreItems}
      >
        <span
          className={viewLoading ? "spinner-border spinner-border-sm" : ""}
          role="status"
          aria-hidden="true"
        ></span>
        {viewLoading ? "Loading..." : "View more"}
      </button>
    </div>
  );
};

export default ViewMoreButton;
