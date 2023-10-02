import React from "react";

const AddHeaders = () => {
  return {
    params: {
      key: "b07131600ee34def946ad3228a9a8af4",
    },
    headers: {
      "Content-type": "application/json",
      authorization: "Bearer " + sessionStorage.getItem("rms-bearertoken"),
    },
  };
};

export default AddHeaders;
