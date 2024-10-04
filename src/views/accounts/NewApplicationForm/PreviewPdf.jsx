import React from "react";

// Plugins

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Worker

import PropTypes from "prop-types";

export const PreviewPdf = ({ pdf, url }) => {
  PreviewPdf.propTypes = {
    pdf: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  };
  console.log(url, "dfd");

  return (
    <div>
      <h4>View PDF</h4>
      <div className="pdf-container">
        {url && url.type === "application/pdf" && (
          <embed
            style={{ height: "100vh", width: "100%" }}
            src={URL.createObjectURL(url)}
            width="500"
            height="300"
            type="application/pdf"
          />
        )}

        {/* if we dont have pdf or viewPdf state is null */}
        {!pdf && <>No pdf file selected</>}
      </div>
    </div>
  );
};

export default PreviewPdf;
