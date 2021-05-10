import React from "react";
import spinnerImg from "../../img/spinner.svg";

function spinner() {
  return (
    <>
      <img className="spinner" alt="loading" src={spinnerImg} />
    </>
  );
}
export default spinner;
