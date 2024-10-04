import React, { useState, useEffect } from "react";
import { CButton, CCard, CCardBody, CCol, CRow } from "@coreui/react";
import pdf from "../../assets/img/pdf.png";
import video from "../../assets/img/video.jpg";
import file from "../../assets/img/file.jpg";
import ppt from "../../assets/img/ppt.jpg";
import { Modal } from "react-bootstrap";
import { BsDownload } from "react-icons/bs";

import { saveAs } from "file-saver";
import CookieService from "src/services/CookiService";
import { decodeToken } from "../common/_redux/action/CommonAction";
import { videoFormats, imageFormats, pptFormats } from "../common/Dropdown";
import Loader from "src/utils/Loader";
export default function InformationHub() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const [hubList, setHubList] = useState([]);
  const [hubDetails, setHubDetails] = useState("");
  const encodedToken = CookieService.getCookie("access_token");
  const GethubList = (url) => {
    setIsLoading2(true);
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Token ${decodeToken(encodedToken)}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading2(false);
        setHubList(data.data.results);
      });
  };
  useEffect(() => {
    GethubList(
      `${process.env.REACT_APP_BASE_URL}api/v1/information-hub/get/categories/`
    );
  }, []);

  const getRandomColor = () => {
    const colors = ["#ffe786", "#87CEEB", "#90EE90", "#FFA07A", "#FFC0CB"]; // Add more colors as needed
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  //details
  const [infoList, setInfoList] = useState([]);
  const GetInfoList = (url) => {
    setIsLoading(true);
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Token ${decodeToken(encodedToken)}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setInfoList(data.data.results);
      });
    // setIsLoading(false);
  };
  useEffect(() => {
    if (hubDetails.id) {
      GetInfoList(
        `${process.env.REACT_APP_BASE_URL}api/v1/information-hub/get/informations/?category=${hubDetails.id}`
      );
    }
  }, [hubDetails.id]);

  const [show, setShow] = useState(false);

  const [Image, setImage] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (url) => {
    // const isPdf = url.includes("pdf");
    // const isVideo = videoFormats.some((format) => url.includes(format));
    // const isImage = imageFormats.some((format) => url.includes(format));
    window.open(url, "_blank");
    // if (isPdf || isVideo || isImage) {
    //   window.open(url, "_blank");
    // } else {
    //   setShow(true);
    //   setImage(url);
    // }
  };
  const downloadImage = (image_url) => {
    saveAs(image_url, "hub-image"); // Put your image url here.
  };
  return (
    <div>
      <div>
        <CRow className="align-items-center">
          <CCol className="mb-3 mb-xl-0 d-grid d-flex justify-content-evenly flex-wrap gap-2">
            {isLoading2 ? (
              <div className="w-100">
                <Loader />
              </div>
            ) : hubList.length < 1 ? (
              <div className=" p-3 card w-100 text-center ">
                <strong>Sorry, No data found !</strong>
              </div>
            ) : (
              <>
                {hubList.map((item) => {
                  return (
                    <CButton
                      key={item.id}
                      onClick={() => setHubDetails(item)}
                      className="info-btn"
                      style={{
                        minWidth: "200px",
                        height: "150px",
                        borderRadius: "20px",
                        backgroundColor: getRandomColor(),

                        borderColor: getRandomColor(),
                        color: "#212121",
                        fontSize: "14px",

                        position: "relative", // Required for positioning the icon
                      }}
                    >
                      {" "}
                      <strong> {item.title}</strong>
                    </CButton>
                  );
                })}
              </>
            )}
          </CCol>
        </CRow>
      </div>
      {hubDetails && (
        <div className="mt-5">
          <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>
            {" "}
            {hubDetails.title}
          </h2>
          <CCard
            style={{
              boxShadow:
                "0px 2px 2px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.12)",
            }}
          >
            <CCardBody>
              {infoList?.length < 1 ? (
                <>
                  <strong>Sorry, No data found !</strong>
                </>
              ) : (
                <>
                  {infoList.map((item) => {
                    return (
                      <>
                        {isLoading ? (
                          <Loader />
                        ) : (
                          <CRow key={item.id} className="align-items-center">
                            <CCol col-8>
                              <h4
                                style={{
                                  fontSize: "21px",
                                  color: "#3c4b64",
                                  marginBottom: 0,
                                }}
                              >
                                {item.info_title}
                              </h4>
                            </CCol>
                            <CCol col-4>
                              <div className="image-box">
                                {item.doc_urls.map((url) => {
                                  const isPdf = url.includes("pdf");
                                  const isVideo = videoFormats.some((format) =>
                                    url.includes(format)
                                  );
                                  const isImage = imageFormats.some((format) =>
                                    url.includes(format)
                                  );
                                  const isppt = pptFormats.some((format) =>
                                    url.includes(format)
                                  );
                                  return (
                                    // eslint-disable-next-line react/jsx-key
                                    <>
                                      <div
                                        className="image-cell"
                                        onClick={() => {
                                          handleShow(url);
                                          // setShowImageModal(true);
                                          // setModalImage(url);
                                        }}
                                      >
                                        <img
                                          style={{ objectFit: "contain" }}
                                          src={
                                            isPdf
                                              ? pdf
                                              : isVideo
                                              ? video
                                              : isImage
                                              ? url
                                              : isppt
                                              ? ppt
                                              : file
                                          }
                                          alt=""
                                        />
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            </CCol>
                          </CRow>
                        )}

                        <hr />
                      </>
                    );
                  })}
                </>
              )}
            </CCardBody>
          </CCard>
        </div>
      )}

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body id="contained-modal-title-vcenter">
          <>
            <img
              style={{
                cursor: "pointer",
                height: "100%",
                width: "100%",
                borderRadius: "8px",
                objectFit: "cover",
              }}
              src={Image}
              alt=""
            />
            <div
              className="d-flex justify-content-end mt-4"
              onClick={() => downloadImage(Image)}
            >
              <CButton color="primary">
                <BsDownload />
              </CButton>
            </div>
          </>
        </Modal.Body>
      </Modal>
    </div>
  );
}
