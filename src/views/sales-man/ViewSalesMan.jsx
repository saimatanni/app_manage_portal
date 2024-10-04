import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { showToast } from "src/utils/ToastHelper";
import { GetCountryList } from "../accounts/Leads/_redux/action/LeadAction";
import Loader from "src/utils/Loader";
import "./Salesman.css";
import UserInvoiceList from "../user-management/user-details/UserInvoiceList";
import UserLeadList from "../user-management/user-details/UserLeadList";
import UserOpportunitiesList from "../user-management/user-details/UserOpportunitiesList";
import UserApplicationList from "../user-management/user-details/UserApplicationList";
import UserStatementList from "../user-management/user-details/UserStatementList";
import UserAllApplicationList from "../user-management/user-details/UserAllApplicationList";
import { Button } from "react-bootstrap";
const ViewSalesMan = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [UserDetails, setUserDetails] = useState({});
  const countryList = useSelector((state) => state.leadInfo.countryList);
  useEffect(() => {
    setIsLoading(true);
    if (userId) {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}api/v1/auth/user/${userId}/`)
        .then((res) => {
          // setIsLoading(true)

          setUserDetails(res?.data?.data);

          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);

          if (err.response === undefined) {
            showToast("error", "Server error");
          } else {
            const message = JSON.parse(err.request.response).message;
  
            if (
              message === "Invalid token." ||
              JSON.parse(err.request.response).code === 401
            ) {
              showToast("success", "Invalid Token");
              navigate("/login");
            }
          }
        });
    }
    dispatch(GetCountryList());
  }, []);

  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <div>
      <div className="d-flex mb-4 heading justify-content-center align-items-center gap-2">
        {/* <div className="d-flex heading"> */}
        <svg
          width="24"
          height="28"
          viewBox="0 0 24 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3.33464C9.05448 3.33464 6.66667 5.72245 6.66667 8.66797C6.66667 11.6134 9.05448 14.0013 12 14.0013C14.9455 14.0013 17.3333 11.6134 17.3333 8.66797C17.3333 5.72245 14.9455 3.33464 12 3.33464ZM4 8.66797C4 4.24969 7.58172 0.667969 12 0.667969C16.4183 0.667969 20 4.24969 20 8.66797C20 13.0862 16.4183 16.668 12 16.668C7.58172 16.668 4 13.0862 4 8.66797ZM6.66667 22.0013C4.45753 22.0013 2.66667 23.7921 2.66667 26.0013C2.66667 26.7377 2.06971 27.3346 1.33333 27.3346C0.59696 27.3346 0 26.7377 0 26.0013C0 22.3194 2.98477 19.3346 6.66667 19.3346H17.3333C21.0152 19.3346 24 22.3194 24 26.0013C24 26.7377 23.4031 27.3346 22.6667 27.3346C21.9303 27.3346 21.3333 26.7377 21.3333 26.0013C21.3333 23.7921 19.5425 22.0013 17.3333 22.0013H6.66667Z"
            fill="#0D0D0D"
          />
        </svg>
        <h3 className="m-0"> User Details</h3>
        {/* </div> */}
      </div>
      <div className="row">
        <div className=" mb-4  row details-container">
          <div className="col-md-6">
            {/* <h2>Sales Partner</h2> */}
            <div className="detail">
              <span className="label">Name:</span>
              <span className="value">
                {" "}
                {UserDetails?.first_name} {UserDetails?.last_name}{" "}
              </span>
            </div>
            <div className="detail">
              <span className="label">Mobile Number:</span>
              <span className="value">{UserDetails?.mobile}</span>
            </div>
            <div className="detail">
              <span className="label">Email:</span>
              <span className="value">{UserDetails?.email}</span>
            </div>

            <div className="detail">
              <span className="label">Gender:</span>
              <span className="value">
                {UserDetails?.gender === 0
                  ? "Male"
                  : UserDetails?.gender === 1
                  ? "Female"
                  : "Other"}{" "}
              </span>
            </div>
            <div className="detail">
              <span className="label">Agent Number:</span>
              <span className="value">{UserDetails?.agent_id}</span>
            </div>
          </div>
          <div className="col-md-6 ">
            {/* <h2>Sales Partner</h2> */}
            <div className="detail">
              <span className="label">Residual Percentage:</span>
              <span className="value">{UserDetails?.residual_percentage}</span>
            </div>
            <div className="detail">
              <span className="label">Upfront percentage :</span>
              <span className="value">{UserDetails?.upfront_percentage}</span>
            </div>
            <div className="detail">
              <span className="label">CRM Contact ID:</span>
              <span className="value">{UserDetails?.contact_id}</span>
            </div>
            {!location.pathname.includes("view-sales-partner") && (
              <>
                <div className="detail">
                  <span className="label">Partner Number:</span>
                  <span className="value">{UserDetails?.partner_id}</span>
                </div>
              </>
            )}

            <div className="detail">
              <span className="label">Country:</span>
              <span className="value">
                {countryList?.map((item) => {
                  return (
                    <span key={item.id}>
                      {item?.id === UserDetails?.country && item?.name}
                    </span>
                  );
                })}
              </span>
            </div>
          </div>
          {/* {!location.pathname.includes("view-sales-partner") && (
            <div className="col-md-12">
              <div className="detail ">
                <span className="label">Country:</span>
                <span className="value">
                  {countryList?.map((item) => {
                    return (
                      <span key={item?.id}>
                        {item?.id === UserDetails?.country && item?.name}
                      </span>
                    );
                  })}
                </span>
              </div>
            </div>
          )} */}
        </div>

        <div className="col-md-12 ">
          {UserDetails?.id && (
            <>
              <div className="list-box mb-4">
                <UserInvoiceList id={UserDetails?.id} />
              </div>
              <div className="list-box mb-4">
                <UserStatementList id={UserDetails?.id} />
              </div>
              <div className="list-box mb-4">
                <UserLeadList id={UserDetails?.id} />
              </div>
              <div className="list-box mb-4">
                <UserOpportunitiesList id={UserDetails?.id} />
              </div>
              <div className="list-box  mb-4">
                <UserApplicationList id={UserDetails?.id} />
              </div>
              {/* <div className="list-box">
                  <UserAllApplicationList id={UserDetails?.id} />
                </div> */}
            </>
          )}
          {/* <LeadAuditHistory lead={UserDetails} logList={logList} /> */}
        </div>
        <div className="d-flex justify-content-end">
          <Button
            variant="info"
            className=""
            onClick={() => navigate(`/salesman-list`)}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewSalesMan;
