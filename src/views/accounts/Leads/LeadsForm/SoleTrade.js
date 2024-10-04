import React, { useEffect } from 'react'
import addressImg from '../../../../assets/img/address.svg'
import postCodeImg from '../../../../assets/img/password (2).svg'
import locationImg from '../../../../assets/img/loction icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import {
 
  GetCountryList,
  GetIndustryList,
  GetLeadsnput,

} from '../_redux/action/LeadAction'
import LeadPostCode from '../leadCreate/LeadPostCode'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'; // Import js-cookie
export default function SoleTrade() {
  const navigate = useNavigate();
  React.useEffect(() => {
      const is_ps_logged_in = Cookies.get('is_ps_logged_in') || 'false'
     
      if (is_ps_logged_in === 'false') {
          // history.push("/my_business");
          navigate('/login')
      }
  }, []);
  const dispatch = useDispatch()
  const requiredstyle = {
    color: ' #dd2c00',
  }
  const countryList = useSelector((state) => state.leadInfo.countryList)
  const IndustryList = useSelector((state) => state.leadInfo.IndustryList)
  const leadInput = useSelector((state) => state.leadInfo.leadInput)

  const handleChangeInput = (name, value, e) => {
    dispatch(GetLeadsnput(name, value, e))
  }
 


 
  useEffect(() => {
    dispatch(GetIndustryList(1))
    dispatch(GetCountryList(1))
  }, [])
  const getIndustryIndex = () => {
    var index = -1
    IndustryList.map((opt) => {
      if (parseInt(opt.ptsave_industrytypeid) === parseInt(leadInput.industry_type)) {
        index = IndustryList.indexOf(opt)
      }
    })
    return index
  }
  const getTradingcountryIndex = () => {
    var index = -1;
    countryList.map((opt) => {
      if (
        parseInt(opt.id) ===
        parseInt(leadInput.trading_country)
      ) {
        index = countryList.indexOf(opt);
      }
    });
    return index;
  };
  return (
    <>
      <div>
        <strong style={{color:"#3c4b64"}}>
          Business Trading Name
          <span style={requiredstyle}> *</span>
        </strong>
        <div className="input-group my-3">
          <input
            type="text"
            className="form-control border-end-0"
            name="trading_name"
            value={leadInput.trading_name}
            onChange={(e) => handleChangeInput('trading_name', e.target.value)}
          />
          <div className="input-group-append">
            <span className="input-group-text bg-white" id="basic-addon2">
              <img src={addressImg} width="21" alt="" />
            </span>
          </div>
        </div>
      </div>
      <div className="my-3">
        <strong style={{color:"#3c4b64"}}>
          Industry Type
          <span style={requiredstyle}> *</span>
        </strong>
        
        <Autocomplete
          className=" mt-3"
          id="country-select-demo"
          size="small"
          options={IndustryList}
          autoHighlight
          getOptionLabel={(option) => option.ptsave_name}
          value={IndustryList?.[getIndustryIndex()] || null}
          onChange={(event, newValue) => {
            if(newValue){
              IndustryList.map((item) => {
                if (item.ptsave_industrytypeid === newValue.ptsave_industrytypeid) {
                  dispatch(GetLeadsnput('mcc_code', item.ptsave_code))
                }
              })
              handleChangeInput('industry_type', newValue.ptsave_industrytypeid)
            }
            else{
             
                  dispatch(GetLeadsnput('mcc_code', ''))
                
              handleChangeInput('industry_type', '')
            }
           
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
        />
      </div>
      {/* Trading Address */}
      <div className="row">
        <div className="col-md-12">
          <strong style={{color:"#3c4b64"}}>Trading Address</strong>
        </div>
      </div>
      {/* Post Code */}
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="mb-3">
            <label>
              <strong style={{color:"#3c4b64"}}>
                Post Code <span style={requiredstyle}>*</span>
              </strong>
            </label>
            <div className="input-group my-3">
              <LeadPostCode
                name="trading_postcode"
                value={leadInput.trading_postcode}
                details="lead_trading_postcode"
              />
              {/* <input type="text" className="form-control border-end-0" /> */}
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={postCodeImg} width="21" alt="" />
                </span>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label>
              <strong style={{color:"#3c4b64"}}>Address 2 </strong>
            </label>
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control border-end-0"
                name="trading_address2"
                value={leadInput.trading_address2}
                onChange={(e) => handleChangeInput('trading_address2', e.target.value)}
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={addressImg} width="21" alt="" />
                </span>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label>
              <strong style={{color:"#3c4b64"}}>County </strong>
            </label>
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control border-end-0"
                name="trading_county"
                value={leadInput.trading_county}
                onChange={(e) => handleChangeInput('trading_county', e.target.value)}
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={locationImg} width="21" alt="" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label>
              <strong style={{color:"#3c4b64"}}>
                Address 1 <span style={requiredstyle}>*</span>
              </strong>
            </label>
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control border-end-0"
                name="trading_address1"
                value={leadInput.trading_address1}
                onChange={(e) => handleChangeInput('trading_address1', e.target.value)}
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={addressImg} width="21" alt="" />
                </span>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label>
              <strong style={{color:"#3c4b64"}}>
                City/Town <span style={requiredstyle}>*</span>
              </strong>
            </label>
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control border-end-0"
                name="trading_city"
                value={leadInput.trading_city}
                onChange={(e) => handleChangeInput('trading_city', e.target.value)}
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={locationImg} width="21" alt="" />
                </span>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label>
              <strong style={{color:"#3c4b64"}}>
                Country <span style={requiredstyle}>*</span>
              </strong>
            </label>
            <div className=" my-3">
              <Autocomplete
                id="country-select-demo"
                size="small"
                options={countryList}
                onChange={(event, newValue) => handleChangeInput('trading_country', newValue === null ? null : newValue.id)}
                value={ countryList?.[getTradingcountryIndex()] || null}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                    name="trading_country"
                    
                  />
                )}
              />
              {/* <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={locationImg} width="21" alt="" />
                </span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
