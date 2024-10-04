import React from "react";
import "./Loader.css";


const Loader = () => {
  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center "
        style={{ minHeight: "70vh", backgroundColor: "white",  }}
      >
        <div className="spinner-6">

          {/* <img  src={logo} alt="" className="spinner-image spinner-image-animation"  /> */}
        </div>
      </div>
      
    </>
  );
};

export default Loader;
