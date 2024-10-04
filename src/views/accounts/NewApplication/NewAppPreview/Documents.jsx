import React, { useState } from "react";
import pen from "../../../../assets/img/pen.svg";
import detailIcon from "../../../../assets/img/detail-icon.svg";
import newDocumenent from "../../../../assets/img/new document icon.svg";
import pdf from "../../../../assets/img/pdf.png";
import { FaEye } from "react-icons/fa";
import PropTypes from "prop-types";
import { FaDownload } from "react-icons/fa";
import { useSelector } from "react-redux";

import Modal from "react-bootstrap/Modal";
import { saveAs } from "file-saver";
import PreviewPdf from "../../NewApplicationForm/PreviewPdf";
const INPUT = ({ id, documentTitle, name, file, doc, index }) => {
  INPUT.propTypes = {
    id: PropTypes.string.isRequired,
    documentTitle: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    file: PropTypes.string.isRequired,
    doc: PropTypes.string.isRequired,
    index: PropTypes.string.isRequired,
  };

  const [show, setShow] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [URL, setURL] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (url) => {
    if (url.includes(".pdf")) {
      window.open(url, "_blank");
    } else {
      setShow(true);
      setPdfFile(url);
    }
  };
  const downloadImage = (image_url) => {
    saveAs(image_url, "document_image"); // Put your image url here.
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body id="contained-modal-title-vcenter">
          {pdfFile && pdfFile?.includes("data:application/pdf") ? (
            <PreviewPdf pdf={pdfFile} />
          ) : (
            <>
              <img
                style={{
                  cursor: "pointer",
                  height: "100%",
                  width: "100%",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
                src={pdfFile}
                alt=""
              />
              <div
                className="d-flex justify-content-end mt-4"
                onClick={() => downloadImage(pdfFile)}
              >
                <button className="save-btn">
                  <FaDownload />
                </button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
      <div key={id} style={{ margin: "40px 0px" }}>
        <div style={{ marginBottom: "25px" }} className="d-flex ">
          <img
            style={{ width: "18px", height: "24px", marginRight: "6px" }}
            src={newDocumenent}
            alt=""
          />
          <p style={{ marginLeft: "10px" }}>
            {documentTitle}
            <span className="required">*</span>
          </p>
        </div>

        {file.map((file, i) => {
          return (
            <div
              key={i}
              className="upload-box my-3"
              style={{ cursor: "pointer" }}
              onClick={() => handleShow(file)}
            >
              {URL === "" ? (
                file?.includes(".pdf") || file?.includes("/pdf") ? (
                  <img
                    src={pdf}
                    alt=""
                    style={{
                      cursor: "pointer",
                      width: "100%",
                      height: "150px",
                      padding: "10px 15px",
                    }}
                  />
                ) : (
                  <img
                    src={file}
                    alt=""
                    style={{
                      cursor: "pointer",
                      width: "100%",
                      height: "150px",
                      padding: "10px 15px",
                    }}
                  />
                )
              ) : URL.includes(".pdf") ? (
                <img
                  src={pdf}
                  alt=""
                  style={{
                    cursor: "pointer",
                    width: "100%",
                    height: "150px",
                    padding: "10px 15px",
                  }}
                />
              ) : (
                <img
                  src={file}
                  alt=""
                  style={{
                    cursor: "pointer",
                    width: "100%",
                    height: "150px",
                    padding: "10px 15px",
                  }}
                />
              )}

              <div className="hover-box">
                <FaEye className="doc_icon" />
                {/* <img src={frame} alt="" /> */}
                <p>View File</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
const Documents = ({ toggleDocuments }) => {
  Documents.propTypes = {
    toggleDocuments: PropTypes.string.isRequired,
  };
  const applicationInput = useSelector(
    (state) => state.applicationInfo.applicationInput
  );
  // const allUrls = applicationInput.application_docs.flatMap(
  //   (doc) => doc.doc_urls
  // );
  // const handleDownloadClick = () => {
  //   downloadFiles(allUrls);
  // };
  // function downloadFiles(fileUrls) {
  //   fileUrls.forEach((url, index) => {
  //     fetch(url)
  //       .then((response) => response.blob())
  //       .then((blob) => {
  //         const filename = `file_${index}${url.substr(url.lastIndexOf("."))}`;
  //         saveAs(blob, filename);
  //       })
  //       .catch((error) => console.error("Error downloading file:", error));
  //   });
  // }
  return (
    <div
      style={{ marginTop: "40px", marginBottom: "40px" }}
      className="buisness-detail customar-detail w-100"
    >
      <div className="customar-detail-head w-100 fees-box">
        <div className="head-first">
          <img src={detailIcon} alt="" />
          <h4 style={{ color: "white" }}>Document</h4>
        </div>
        <div className="button-box">
          {/* <div className="button-box">
          <button className="custom-btn" style={{background:"#3399ff"}} onClick={handleDownloadClick}>
              <FaDownload/>
              Download All{" "}
            </button>
          </div> */}
          <div className="mx-2">
            <button className="   custom-btn  flex " onClick={toggleDocuments}>
              <img src={pen} style={{ marginRight: "7px" }} alt="" />
              Edit
            </button>
          </div>
        </div>
      </div>
      <div className="document-box ">
        {applicationInput.application_docs.map(
          (document, index) =>
            document.is_deleted === false && (
              <INPUT
                key={document.id}
                id={document.id}
                name={document.category}
                documentTitle={document.category}
                file={document.doc_urls}
                doc={document}
                index={index}
              />
            )
        )}
      </div>
    </div>
  );
  // return (
  //   <div
  //     style={{ marginTop: "40px", marginBottom: "40px" }}
  //     className="buisness-detail customar-detail w-100 "
  //   >
  //     <div className="customar-detail-head w-100 fees-box">
  //       <div className="head-first">
  //         <img src={detailIcon} alt="" />
  //         <h4 style={{ color: "white" }}>Documents</h4>
  //       </div>
  //       <div className="button-box">
  //         <button className="   custom-btn  flex " onClick={toggleDocuments}>
  //           <img src={pen} style={{ marginRight: "7px" }} alt="" />
  //           Edit
  //         </button>
  //       </div>
  //     </div>
  //     <div className="document-box ">
  //       <div style={{ margin: "40px 0px" }}>
  //         <div style={{ marginBottom: "25px" }} className="d-flex ">
  //           <img
  //             style={{ width: "18px", height: "24px", marginRight: "6px" }}
  //             src={newDocumenent}
  //             alt=""
  //           />
  //           <p style={{ marginLeft: "10px" }}>
  //             {"documentTitle"}
  //             <span className="required">*</span>
  //           </p>
  //         </div>
  //         <div className="upload-box" style={{ cursor: "pointer" }}>
  //           <img
  //             src={pdf}
  //             alt=""
  //             style={{
  //               cursor: "pointer",
  //               width: "100%",
  //               height: "150px",
  //               padding: "10px 15px",
  //             }}
  //           />
  //           <div className="hover-box">
  //           <FaEye className="doc_icon"/>
  //           {/* <img src={frame} alt="" /> */}
  //           <p>View File</p>
  //         </div>
  //         </div>
  //       </div>
  //       <div style={{ margin: "40px 0px" }}>
  //         <div style={{ marginBottom: "25px" }} className="d-flex ">
  //           <img
  //             style={{ width: "18px", height: "24px", marginRight: "6px" }}
  //             src={newDocumenent}
  //             alt=""
  //           />
  //           <p style={{ marginLeft: "10px" }}>
  //             {"documentTitle"}
  //             <span className="required">*</span>
  //           </p>
  //         </div>
  //         <div className="upload-box" style={{ cursor: "pointer" }}>
  //           <img
  //             src={pdf}
  //             alt=""
  //             style={{
  //               cursor: "pointer",
  //               width: "100%",
  //               height: "150px",
  //               padding: "10px 15px",
  //             }}
  //           />
  //           <div className="hover-box">
  //           <FaEye className="doc_icon"/>
  //           {/* <img src={frame} alt="" /> */}
  //           <p>View File</p>
  //         </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Documents;
