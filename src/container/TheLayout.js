import React from "react";
import { TheContent,  } from "./index";


const TheLayout = () => {

  return (
    <div className="c-app c-default-layout">
      
      <div className="c-wrapper">
      
        <div className="c-body" 
        // style={{ backgroundColor:location.pathname ==="dashboard"? "#fff" : "#eff1f3"}}
        >
          <TheContent />
        </div>
      
      </div>
    </div>
  );
};

export default TheLayout;
