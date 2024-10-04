// import * as Types from "../types/Types";
import * as Types from "../types/Types";


const initialState = {
  applicationInput: {
    application_docs: [
      {
        id: "",
        category: "PROOF_OF_ID",
        doc_type: "",
        document: [],
        doc_urls: [],
        application: "",
        is_deleted: false,
        // issue_date: null,
        // expiry_date: null,
        // country: 74,
        document_id: "",
        // sur_name: "",
        // first_name: "",
        issuer_id: "",
        doc_contact: "",
      },
    ],
    application_products: [
      // {
      //   connection_type: "",
      //   contact_length: 18,
      //   terminal_model: "",
      //   provider: "",
      //   manufecturer_name: "",
      //   qty: 1,
      //   product: "",
      //   application: "",
      //   monthly_price: 20.99,
      //   is_deleted: false,
      //   has_old_card_provider: false,
      //   previous_acquirer: "",
      // },
    ],
    business_owners: [
      // {
      //   business_owner_contacts: [
      //     {
      //       email_address: "g@g.com",
      //       zip_code: "",
      //       street_line_1: "",
      //       city: "",
      //       county_code: "",
      //       business_owner: "",
      //       country_code: 74,
      //     },
      //   ],
      //   id: "",
      //   quote_qualify_id: "",
      //   is_main_principal: false,
      //   is_beneficial_owner: false,
      //   is_signatory: false,
      //   is_responsible_party: false,
      //   is_director: false,
      //   is_owner: false,
      //   is_partnership: false,
      //   owner_title: null,
      //   owner_first_name: "",
      //   owner_second_name: "t",
      //   owner_surname: "",
      //   contact_dob: null,
      //   owner_email: null,
      //   ownership_perc: 0,
      //   owner_phone_no: "",
      //   // owner_alt_phone_no: "",
      //   owner_fax: "",
      //   owner_issue_date: null,
      //   owner_expiry_date: null,
      //   owner_id_num: "",
      //   is_deleted: false,
      //   // owner_date_started: "",
      //   address_date_from: "2022-10-10",
      //   application: "",
      //   owner_phone_code: 74,
      //   owner_alt_phone_code: 74,
      //   owner_fax_code: "",
      //   owner_nationality: 74,
      //   owner_alt_nationality: "",
      //   issuer_id: "",
      //   // document: "",
      // },
    ],
    debit_bank_info: [
      {
        id: "",
        debit_bank_name: "",
        debit_bank_sort_code: "",
        debit_bank_account_name: "",
        debit_bank_account_no: "",
        application: "",
      },
    ],
    id: "",
    slug: "",
 
    epos_service: false,
    ecom_service: false,
    card_machine_service: false,
    is_submitted_to_ps: false,
    app_qualify_id: "",
    acquiring_bank: "0",
    application_type: 1,
    // opportunity_id: "",
    incorporated_on: null,
    opportunity_name: "",
    dob: null,
    legal_type: "",
    legal_name: "",
    company_house_no: "",
    trading_name: "",
    current_ownership_since: null,
    mcc_code: null,
    mobile: "",
    telephone: "",
    mobile_code: 74,
    phone_code: 74,
    contact: "",
    store_number: 0,
    email: "",
    secondary_email: "",
    // email_address: "",
    website: "",
    // applicaiton_stage: 1,
    // application_status: 0,
    callback_date: null,
    appliation_price_quote: null,
    application_close_date: null,
    note: "",
    site_and_trading_address_same: 0,
    legal_postcode: "",
    legal_address1: "",
    legal_address2: "",
    legal_city: "",
    legal_county: "",
    trading_postcode: "",
    trading_address1: "",
    trading_address2: "",
    trading_city: "",
    trading_county: "",
    home_postcode: "",
    home_address1: "",
    home_address2: "",
    home_city: "",
    home_county: "",
    bank_name: "",
    bank_account_name: "",
    bank_account_no: "",
    bank_sort_code: "",

    bank_account_type: "ALL",
    bank_settlement_method: "GROSS",
    bank_faster_payments: "1",
    // bank_name_de: "",
    // account_holder_name_de: "",
    // bank_account_number_de: "",
    // bank_sort_code_de: "",
    // // bank_account_type_de: "",
    // // bank_settlement_method_de: "",
    // bank_faster_payments_de: "",
    // -new- product
    product_type: [],
    terminal_option: "",
    integration_availability: "",
    epos_name: "",
    website_url: "",
    epos_option: "",
    // -new- product

    visa_credit_sr: "0.650",
    visa_credit_non_sr: "0.000",
    visa_credit_sr_per_tr_fee: "0.000",
    visa_credit_per_non_sr_tr_fee: "0.000",

    master_credit_sr: "0.650",
    master_credit_non_sr: "1.200",
    master_credit_sr_per_tr_fee: "0.000",
    master_credit_non_sr_per_tr_fee: "0.000",

    visa_debit_sr: "0.350",
    visa_debit_non_sr: "0.000",
    visa_debit_sr_per_tr_fee: "0.000",
    visa_debit_non_sr_per_tr_fee: "0.000",

    master_debit_sr: "0.380",
    master_debit_non_sr: "0.980",
    master_debit_sr_per_tr_fee: "0.000",
    master_debit_non_sr_per_tr_fee: "0.000",

    visa_business_debit_sr: "1.850",
    visa_business_debit_non_sr: "2.000",
    visa_business_debit_sr_per_tr_fee: "0.000",
    visa_business_debit_non_sr_per_tr_fee: "0.000",

    visa_purchasing_sr: "2.500",
    visa_purchasing_non_sr: "2.770",
    visa_purchasing_sr_per_tr_fee: "0.000",
    visa_purchasing_non_sr_per_tr_fee: "0.000",

    visa_corporate_sr: "2.500",
    visa_corporat_non_sr_per_tr_fee: "0.000",
    visa_corporate_sr_per_tr_fee: "0.000",
    visa_corporate_non_sr: "2.984",

    master_purchasing_sr: "2.500",
    master_purchasing_sr_per_tr_fee: "0.000",
    master_purchasing_non_sr: "2.975",
    master_purchasing_non_sr_per_tr_fee: "0.000",

    master_fleet_sr: "2.500",
    master_fleet_sr_per_tr_fee: "0.000",
    master_fleet_non_sr: "2.985",
    master_fleet_non_sr_per_tr_fee: "0.000",

    master_corporate_sr: "2.500",
    master_corporate_non_sr: "2.984",
    master_corporate_sr_per_tr_fee: "0.000",
    master_corporate_non_sr_per_tr_fee: "0.000",

    master_pre_commercial_sr: "2.500",
    master_pre_commercial_sr_per_tr_fee: "0.000",
    master_pre_commercial_non_sr: "2.805",
    master_pre_commercial_non_sr_per_tr_fee: "0.000",

    non_eea_visa_sr: "3.000",
    non_eea_visa_non_sr: "3.312",
    non_eea_visa_non_sr_per_tr_fee: "0.000",
    non_eea_visa_sr_per_tr_fee: "0.000",

    non_eea_master_sr: "3.000",
    non_eea_master_sr_per_tr_fee: "0.000",
    non_eea_master_non_sr: "3.312",
    non_eea_master_non_sr_per_tr_fee: "0.000",

    visa_v_pay_sr: "0.350",
    // visa_v_pay_sr: "0.450",
    visa_v_pay_non_sr_per_tr_fee: "0.000",
    visa_v_pay_sr_per_tr_fee: "0.000",
    visa_v_pay_non_sr: "0.950",

    uk_maestro_sr_per_tr_fee: "0.000",
    uk_maestro_non_sr_per_tr_fee: "0.000",
    uk_maestro_sr: "0.380",
    // uk_maestro_sr: "0.480",
    uk_maestro_non_sr: "0.980",

    international_maestro_sr: "1.500",
    international_maestro_non_sr: "2.000",
    international_maestro_sr_per_tr_fee: "0.000",
    international_maestro_non_sr_per_tr_fee: "0.000",

    visa_business_credit_sr: "2.550",
    visa_business_credit_non_sr: "2.600",
    visa_business_credit_non_sr_per_tr_fee: "0.000",
    visa_business_credit_sr_per_tr_fee: "0.000",

    master_business_sr: "2.550",
    master_business_non_sr: "2.600",
    master_business_sr_per_tr_fee: "0.000",
    master_business_non_sr_per_tr_fee: "0.000",

    amex_sr: "1.900",
    amex_non_sr: "0.000",
    amex_sr_per_tr_fee: "0.000",
    amex_non_sr_per_tr_fee: "0.000",

    diners_sr: "3.000",
    jcb_sr: "2.900",
    union_pay_sr: "2.900",
    high_risk_loading_rate: "0.40",

    auth_fees: "0.00",
    mmsc: "0",
    atv: 25,
    smtv: "0.00",
    average_transaction_value: "0.00",
    annual_turnover: "0.00",
    annual_card_turnover: "0.00",
    sales_moto_perc: 0,
    sales_ftf_perc: 0,
    sales_internet_perc: 0,
    sof_notes: "",
    take_deposit: 0,
    advance_supply_full_payment: 0,
    perc_annual_upfront_of_turnover: "",
    // has_full_pmnt_bef_del: "",
    deposit_perc_transaction_value: "",
    seasonal_sales: "no",
    tax_id: "",
    registration_county_code: "",
    registration_zip_code: "",

    registration_house_number: "",
    registration_house_name: "",
    registration_street: "",
    registration_locality: "",
    registration_city: "",
    trading_address: "",
    s_customer_lives: 2,
    s_location_type: "OTHER",
    s_location_environment: "RETAIL",
    s_condition_of_vicinity: "WELL_KEPT",
    s_squire_meters: "251_500",
    s_general_appearance: "VERY_GOOD",
    s_ownership: 2,
    s_is_business_open: true,
    s_business_start_date: null,
    s_is_sufficient_stock: true,
    s_sufficient_stock_comment: "",
    s_is_reflect_business_type: true,
    s_reflect_comment: "",
    s_is_card_decels_visible: false,
    s_is_installed_at_visit: false,
    s_name_of_individual: "",
    // s_individual_position: "",
    s_individual_start_date: null,

    s_individual_sales_representatives: "",
    s_individual_printed_name: "",
    s_individual_date: null,
    representative_terms_accept: false,
    representative_privacy_accept: false,
    representative_signature: "",
    representative_fullname: "",
    representative_start_date: null,
    marchent_terms_accept: false,
    marchent_privacy_accept: false,
    marchent_signature: "",
    marchent_fullname: "",
    marchent_start_date: null,
    sattel_debit_same: false,
    // source: "",
    lead_source: 1,
    industry_type: "",
   
    // user: '',
    sales_partner: "",
    partner_manager: "",
    partner_manager_name: "",
    sales_partner_name: "",
    lead_owner: "",
    lead_owner_name: "",

    processed_by: "",
    submitted_by: "",
    legal_country: 74,
    trading_country: 74,
    home_country: 74,
    registration_country_code: "",
    vat_enabled: 1,
    vat_amount: "",
    vat_notes: "",
    // missing value?
    // renting_terminal: false,
    // card_processing: "yes",
    amex_mid: "false",
    amex_type: "",
    amex_no: "",
    oct_to_dec: "",
    jul_to_sep: "",
    apr_to_jun: "",
    jan_to_mar: "",
    location_type: "",

    // settelment_method:"GROSS",
    vat_override: false,
    account_type: "all",
    lives_permission: "false",
    far_advance: "",
    is_partnership: "",
    cashback: false,
    secured_by_elavon: "SECURED_PCI",
    product_per_month_amt: "4.50",
    non_compliance_per_month: "40.00",
    customer_value_per_month: "N/A",
    avg_cashback_amount: "",
    supply_day: "",
    supply_week: "",
    supply_month: "",
    deposite_month: "",
    deposite_week: "",
    deposite_day: "",
    payment_method: "ALB",
    security_check: "N/A",
    internet_service_provider: "",
    payment_service_provider: "",
    desc_of_service: "",
    funding_frequesncy: "DAILY",
    funding_day: "",
    delay_days: "",
    billing_frequesncy: "MONTHLY",
    billing_day: "",
    renting_elavon_terminals: false,
    advance_supply_deposite_taken: "",
    perc_annual_deposite_of_turnover: "",
    time_btw_deposite_and_remaining_payment: "",
    take_full_payment: true,
    security_bin_check: false,
    security_velocity_check: false,
    security_ip_geo_check: false,
    security_max_amt_check: false,
    security_other_check: false,

    // --new-------/
    parent_entity_code: "53265",
    switching_contribution: false,

    existing_mid: "",
    cole_from: "",
    new_to_card_proccessing: true,
    previous_acquirer: "",
    charity_number: "",
    contact_full_name: "",
    s_specific_location: "HIGH STREET",
    application_errors: "",
    pdf_url: "",
   
  },

  submitApplicationInput: {
    application_id: "",
  },
  siginingInput: {
    application_id: "",
    // pdf_url: "",
  },
  pdfInput: {
    application_id: "",
    pdf_url: "",
  },
  siteVisitPdfInput: {
    application_id: "",
    pdf_url: "",
  },

  ApplicationQualify: null,
  bankDetails: [],
  debitBankDetails: [],
  applicationList: null,
  vatList: null,
  applicationDetails: null,
  isLoadApplication: false,
  isLoadBusiness: false,
  isLoadSign: false,
  afterSuccessAplication: false,
  afterSuccessApplicationqualify: false,
  afterSuccessUpdate: false,
  aftersuccessQuote: false,
  leadsPagination: null,
  priceQuotePagination: null,
  isAddressChecked: false,
  bankInfoChecked: false,
  applicationProductList: null,
  contactList: null,
  isApplicationOwnerDeleted: null,
  isSuccessDoc: false,
  afterSuccessSigning: false,
  afterFailedSigning: false,
  afterSuccessPdf: false,
  afterSuccessSigningTwo: false,
  afterSubmitBank: false,
  companyHouseList: [],
  companyHouseDetails: null,
  companyOfficerDetails: [],
  allProductList: null,
};

const ApplicationReducer = (state = initialState, action) => {
  const newState = { ...state };
  //Leads
  switch (action.type) {
    case Types.AFTER_SUCCESS_APPLICATION:
      return {
        ...state,
        afterSuccessAplication: action.payload,
      };
    case Types.SET_APPLICATION_FALSE:
      return {
        ...state,
        afterSuccessAplication: action.payload,
        applicationInput: initialState.applicationInput,
      };
    case Types.SET_APPLICATION_STATUS_FALSE:
      return {
        ...state,
        afterSuccessAplication: action.payload,
        // applicationInput: initialState.applicationInput,
      };
    case Types.SET_APPLICATION_INPUT_FALSE:
      return {
        ...state,
        afterSuccessAplication: action.payload,
        applicationInput: initialState.applicationInput,
      };
    // ======debit bank account----------------
    case Types.ADD_NEW_BANK:
      const setNewBankInput = { ...state.applicationInput };
      const debit_bank_info = [...state.applicationInput.debit_bank_info];

      debit_bank_info[action.payload.index] = {
        ...state.applicationInput.debit_bank_info[action.payload.index],
        [action.payload.name]: action.payload.value,
      };

      return {
        ...state,
        applicationInput: { ...setNewBankInput, debit_bank_info },
      };

    // ---------------------------------sining request-------------------------------?
    case Types.SEND_SIGNING_REQUEST:
      const siginingInput = { ...state.siginingInput };
      siginingInput[action.payload.name] = action.payload.value;
      return {
        ...state,
        siginingInput: siginingInput,
      };
    case Types.AFTER_SUCCESS_SIGNING:
      return {
        ...state,
        afterSuccessSigning: action.payload,
      };
    case Types.AFTER_FAILED_SIGNING:
      return {
        ...state,
        afterFailedSigning: action.payload,
      };
    case Types.SET_SIGINING_FALSE:
      return {
        ...state,
        afterSuccessSigning: action.payload,
        afterFailedSigning: action.payload,
        siginingInput: initialState.siginingInput,
      };
    // ----------------------doc-----------------

    case Types.ADD_NEW_DOC:
      const setNewDocInput = { ...state.applicationInput };
      const application_docs = [...state.applicationInput.application_docs];

      application_docs[action.payload.index] = {
        ...state.applicationInput.application_docs[action.payload.index],
        [action.payload.name]: action.payload.value,
      };

      return {
        ...state,
        applicationInput: { ...setNewDocInput, application_docs },
      };

    case Types.SET_NEW_DOC_INPUT:
      const setApplicationDocInput = { ...state.applicationInput };
      const newDoc = [...state.applicationInput.application_docs];

      return {
        ...state,
        applicationInput: {
          ...setApplicationDocInput,
          application_docs: [
            ...newDoc,
            {
              category: "",
              doc_type: "",
              // application: parseInt(priceQId),
              application: "",
              document: [],
              doc_urls: [],
              is_deleted: false,
              // issue_date: null,
              // expiry_date: null,
              // country: 74,
              // document_id: "",
              // sur_name: "",
              // first_name: "",
              issuer_id: "",
              doc_contact: "",
            },
          ],
        },
      };

    case Types.DELETE_DOC:
      const removeDoc = { ...state.applicationInput };
      const removeoptions = [...state.applicationInput.application_docs];
      const updatedquote_owners =
        state.applicationInput.application_docs.filter((item, index) => {
          return index != action.payload;
        });

      return {
        ...state,
        applicationInput: {
          ...removeDoc,
          application_docs: [...updatedquote_owners],
        },
      };

    case Types.GET_QUALIFY_APPLICATION:
      return {
        ...state,
        ApplicationQualify: action.payload,
      };
    case Types.AFTER_SUCCESS_APPLICATION_QUALIFY:
      return {
        ...state,
        afterSuccessApplicationqualify: action.payload,
      };
    case Types.SET_FALSE_APPLICATION_QUALIFY:
      return {
        ...state,
        afterSuccessApplicationqualify: action.payload,
        applicationInput: initialState.applicationInput,
      };

    // -----------------------end qualify----------------------

    case Types.GET_APPLICATION_LIST:
      return {
        ...state,
        applicationList: action.payload,
      };

    case Types.GET_VAT_LIST:
      return {
        ...state,
        vatList: action.payload,
      };

    case Types.IS_LOAD_APP:
      return {
        ...state,
        isLoadApplication: action.payload,
      };
    case Types.IS_LOAD_BUSINESS:
      return {
        ...state,
        isLoadBusiness: action.payload,
      };
    case Types.IS_LOAD_SIGN:
      return {
        ...state,
        isLoadSign: action.payload,
      };
    case Types.GET_APPLICATION_DETAILS:
      return {
        ...state,
        applicationDetails: action.payload,
      };
    case Types.GET_APPLICATION_INPUT:
      const applicationInput = { ...state.applicationInput };
      applicationInput[action.payload.name] = action.payload.value;
      return {
        ...state,
        applicationInput: applicationInput,
      };

    // case Types.IS_ADDRESS_CHECKED:
    //   return {
    //     ...state,
    //     isAddressChecked: action.payload,
    //   };
    // case Types.BANK_INFO_CHECKED:
    //   return {
    //     ...state,
    //     bankInfoChecked: action.payload,
    //   };

    // -----owner-------------
    // case Types.GET_QUOTE_OWNER:
    //   const setApplicationOwnInput = { ...state.applicationInput };
    //   const business_owners = [...state.applicationInput.business_owners];
    //   if (action.payload.contact === "business_owner_contacts") {
    //     business_owners[action.payload.index] = {
    //       ...state.applicationInput.business_owners[action.payload.index],
    //       [action.payload.contact]: [
    //         {
    //           ...business_owners[action.payload.index][
    //             action.payload.contact
    //           ][0],
    //           [action.payload.name]: action.payload.value,
    //         },
    //       ],
    //     };
    //   } else {
    //     business_owners[action.payload.index] = {
    //       ...state.applicationInput.business_owners[action.payload.index],
    //       [action.payload.name]: action.payload.value,
    //     };
    //   }

    //   return {
    //     ...state,
    //     applicationInput: { ...setApplicationOwnInput, business_owners },
    //   };
    case Types.GET_QUOTE_OWNER:
      const setApplicationOwnInput = { ...state.applicationInput };
      let business_owners = state.applicationInput.business_owners || [];
      if (!business_owners[action.payload.index]) {
        business_owners[action.payload.index] = {};
      }

      if (action.payload.contact === "business_owner_contacts") {
        if (!business_owners[action.payload.index][action.payload.contact]) {
          business_owners[action.payload.index][action.payload.contact] = [];
        }

        if (!business_owners[action.payload.index][action.payload.contact][0]) {
          business_owners[action.payload.index][action.payload.contact][0] = {};
        }

        business_owners[action.payload.index] = {
          ...state.applicationInput.business_owners[action.payload.index],
          [action.payload.contact]: [
            {
              ...business_owners[action.payload.index][
                action.payload.contact
              ][0],
              [action.payload.name]: action.payload.value,
            },
          ],
        };
      } else {
        business_owners[action.payload.index] = {
          ...state.applicationInput.business_owners[action.payload.index],
          [action.payload.name]: action.payload.value,
        };
      }

      return {
        ...state,
        applicationInput: { ...setApplicationOwnInput, business_owners },
      };

    case Types.SET_QUOTE_OWNER:
      const setApplicationOwnerInput = { ...state.applicationInput };
      const newOwner = [...state.applicationInput.business_owners];

      return {
        ...state,
        applicationInput: {
          ...setApplicationOwnerInput,
          business_owners: [
            ...newOwner,
            {
              business_owner_contacts: [
                {
                  email_address: "g@g.com",
                  zip_code: "",
                  street_line_1: "",
                  city: "",
                  county_code: "",
                  business_owner: "",
                  country_code: 74,
                },
              ],
              is_main_principal: false,
              is_beneficial_owner: false,
              is_signatory: false,
              is_responsible_party: false,
              is_director: false,
              is_owner: false,
              is_partnership: false,
              owner_title: null,
              owner_first_name: "",
              owner_second_name: "t",
              owner_surname: "",
              contact_dob: null,
              owner_email: "",
              ownership_perc: 0,
              owner_phone_no: "",
              // owner_alt_phone_no: "",
              owner_fax: "",
              owner_issue_date: null,
              owner_expiry_date: null,
              owner_id_num: "",
              // owner_date_started: "",
              address_date_from: "2022-10-10",
              // application: parseInt(priceQId),
              application: "",
              owner_phone_code: 74,
              owner_alt_phone_code: "",
              owner_fax_code: "",
              owner_nationality: 74,
              issuer_id: "",
              is_deleted: false,
            },
          ],
        },
      };
    case Types.REMOVE_APPLICATION_OWNER:
      const RemoveOwnerInput = { ...state.applicationInput };
      // const removeoptions =[...applicationInput];

      const removeOwner = [...state.applicationInput.business_owners];
      const updatedOwner = state.applicationInput.business_owners.filter(
        (item, index) => {
          return index != action.payload;
        }
      );
      console.log("updatedOptions", updatedOwner, action.payload);

      // removeoptions.splice(i,1)
      return {
        ...state,
        applicationInput: {
          ...RemoveOwnerInput,
          business_owners: [
            ...updatedOwner,
            // removeoptions.splice(1)
          ],
        },
      };
    case Types.IS_APPLICATION_OWNER_DELETED:
      return {
        ...state,
        isApplicationOwnerDeleted: action.payload,
      };
    case Types.GET_BANK_DETAILS:
      return {
        ...state,
        bankDetails: action.payload,
      };
    case Types.GET_DEBIT_BANK_DETAILS:
      return {
        ...state,
        debitBankDetails: action.payload,
      };
    case Types.SET_APPLICATION_UPDATED:
      const setApplicationInput = { ...state.applicationInput };
      setApplicationInput.id = action.payload.id;
      setApplicationInput.slug = action.payload.slug;
     
      setApplicationInput.is_submitted_to_ps =
        action.payload.is_submitted_to_ps;
      setApplicationInput.charity_number = action.payload.charity_number;
      setApplicationInput.contact_full_name = action.payload.contact_full_name;
      setApplicationInput.debit_bank_info =
        action.payload.debit_bank_info || [];
      setApplicationInput.client_id = action.payload.client_id;
      setApplicationInput.incorporated_on = action.payload.incorporated_on;
      // // setApplicationInput.source = action.payload.source;
      setApplicationInput.lead_source = action.payload.lead_source;
      setApplicationInput.business_owners =
        action.payload.business_owners || [];
      setApplicationInput.application_docs =
        action.payload.application_docs || [];
      setApplicationInput.application_products =
        action.payload.application_products || [];
      setApplicationInput.card_machine_service =
        action.payload.card_machine_service;
      setApplicationInput.ecom_service = action.payload.ecom_service;
      setApplicationInput.epos_service = action.payload.epos_service;
      setApplicationInput.security_other_check =
        action.payload.security_other_check;
      setApplicationInput.security_max_amt_check =
        action.payload.security_max_amt_check;
      setApplicationInput.security_ip_geo_check =
        action.payload.security_ip_geo_check;
      setApplicationInput.security_velocity_check =
        action.payload.security_velocity_check;
      setApplicationInput.security_bin_check =
        action.payload.security_bin_check;
      setApplicationInput.payment_service_provider =
        action.payload.payment_service_provider;
      setApplicationInput.internet_service_provider =
        action.payload.internet_service_provider;
      setApplicationInput.acquiring_bank = action.payload.acquiring_bank;
      setApplicationInput.application_type = action.payload.application_type;
      // setApplicationInput.opportunity_id = action.payload.opportunity_id;
      setApplicationInput.opportunity_name = action.payload.opportunity_name;
      setApplicationInput.dob = action.payload.dob;
      setApplicationInput.legal_type = action.payload.legal_type;
      setApplicationInput.legal_name = action.payload.legal_name.toUpperCase();
      setApplicationInput.company_house_no = action.payload.company_house_no;
      setApplicationInput.trading_name =
        action.payload.trading_name.toUpperCase();
      setApplicationInput.current_ownership_since =
        action.payload.current_ownership_since;
      setApplicationInput.company_house_no = action.payload.company_house_no;
      setApplicationInput.telephone = action.payload.telephone;
      setApplicationInput.phone_code = action.payload.phone_code;
      setApplicationInput.mobile_code = action.payload.mobile_code;
      setApplicationInput.mcc_code = action.payload.mcc_code;
      setApplicationInput.mobile = action.payload.mobile || "";
      setApplicationInput.contact = action.payload.contact;
      setApplicationInput.store_number = action.payload.store_number;
      setApplicationInput.email = action.payload.email;
      setApplicationInput.secondary_email = action.payload.secondary_email;
      setApplicationInput.website = action.payload.website;
      setApplicationInput.applicaiton_stage = action.payload.applicaiton_stage;
      setApplicationInput.application_status =
        action.payload.application_status;
      setApplicationInput.callback_date = action.payload.callback_date;
      setApplicationInput.appliation_price_quote =
        action.payload.appliation_price_quote;
      setApplicationInput.application_close_date =
        action.payload.application_close_date;
      setApplicationInput.note = action.payload.note;
      setApplicationInput.site_and_trading_address_same =
        action.payload.site_and_trading_address_same;
      setApplicationInput.legal_postcode = action.payload.legal_postcode;
      setApplicationInput.legal_address1 =
        action.payload.legal_address1.toUpperCase();
      setApplicationInput.legal_address2 = action.payload.legal_address2;
      setApplicationInput.legal_city = action.payload.legal_city.toUpperCase();
      setApplicationInput.legal_county = action.payload.legal_county;
      setApplicationInput.trading_postcode = action.payload.trading_postcode;
      setApplicationInput.trading_address1 =
        action.payload.trading_address1.toUpperCase();
      setApplicationInput.trading_address2 = action.payload.trading_address2;
      setApplicationInput.trading_city =
        action.payload.trading_city.toUpperCase();
      setApplicationInput.trading_county = action.payload.trading_county;
      setApplicationInput.home_postcode = action.payload.home_postcode;
      setApplicationInput.home_address1 = action.payload.home_address1;
      setApplicationInput.home_address2 = action.payload.home_address2;
      setApplicationInput.home_city = action.payload.home_city;
      setApplicationInput.home_county = action.payload.home_county;
      setApplicationInput.bank_name = action.payload.bank_name;
      setApplicationInput.bank_account_name = action.payload.bank_account_name;
      setApplicationInput.bank_account_no = action.payload.bank_account_no;

      setApplicationInput.bank_sort_code = action.payload.bank_sort_code;
      setApplicationInput.bank_faster_payments =
        action.payload.bank_faster_payments;

      setApplicationInput.diners_sr = action.payload.diners_sr;
      setApplicationInput.jcb_sr = action.payload.jcb_sr;
      setApplicationInput.union_pay_sr = action.payload.union_pay_sr;
      setApplicationInput.high_risk_loading_rate =
        action.payload.high_risk_loading_rate;

      setApplicationInput.mmsc = action.payload.mmsc;
      setApplicationInput.atv = action.payload.atv;
      setApplicationInput.smtv = action.payload.smtv;
      setApplicationInput.annual_turnover = action.payload.annual_turnover;
      setApplicationInput.annual_card_turnover =
        action.payload.annual_card_turnover;
      setApplicationInput.sales_moto_perc = action.payload.sales_moto_perc;

      setApplicationInput.sales_ftf_perc = action.payload.sales_ftf_perc;
      setApplicationInput.sales_internet_perc =
        action.payload.sales_internet_perc;
      setApplicationInput.sof_notes = action.payload.sof_notes;
      setApplicationInput.take_deposit = action.payload.take_deposit;
      setApplicationInput.advance_supply_full_payment =
        action.payload.advance_supply_full_payment;
      setApplicationInput.perc_annual_upfront_of_turnover =
        action.payload.perc_annual_upfront_of_turnover;

      setApplicationInput.has_full_pmnt_bef_del =
        action.payload.has_full_pmnt_bef_del;
      setApplicationInput.deposit_perc_transaction_value =
        action.payload.deposit_perc_transaction_value;
      setApplicationInput.seasonal_sales = action.payload.seasonal_sales;
      setApplicationInput.tax_id = action.payload.tax_id;
      setApplicationInput.vat_enabled = action.payload.vat_enabled;
      setApplicationInput.parent_entity_code =
        action.payload.parent_entity_code;
      setApplicationInput.registration_county_code =
        action.payload.registration_county_code;
      setApplicationInput.registration_zip_code =
        action.payload.registration_zip_code;

      setApplicationInput.registration_house_number =
        action.payload.registration_house_number;
      setApplicationInput.registration_house_name =
        action.payload.registration_house_name;
      setApplicationInput.registration_street =
        action.payload.registration_street;
      setApplicationInput.registration_locality =
        action.payload.registration_locality;
      setApplicationInput.registration_city = action.payload.registration_city;
      setApplicationInput.trading_address = action.payload.trading_address;

      setApplicationInput.s_customer_lives = action.payload.s_customer_lives;
      setApplicationInput.s_location_type = action.payload.s_location_type;
      setApplicationInput.s_location_environment =
        action.payload.s_location_environment;
      setApplicationInput.s_condition_of_vicinity =
        action.payload.s_condition_of_vicinity;
      setApplicationInput.s_squire_meters = action.payload.s_squire_meters;
      setApplicationInput.s_general_appearance =
        action.payload.s_general_appearance;

      setApplicationInput.s_ownership = action.payload.s_ownership;
      setApplicationInput.s_is_business_open =
        action.payload.s_is_business_open;
      setApplicationInput.s_business_start_date =
        action.payload.s_business_start_date;
      setApplicationInput.s_is_sufficient_stock =
        action.payload.s_is_sufficient_stock;
      setApplicationInput.s_sufficient_stock_comment =
        action.payload.s_sufficient_stock_comment;
      setApplicationInput.s_is_reflect_business_type =
        action.payload.s_is_reflect_business_type;

      setApplicationInput.s_reflect_comment = action.payload.s_reflect_comment;
      setApplicationInput.s_is_card_decels_visible =
        action.payload.s_is_card_decels_visible;
      setApplicationInput.s_is_installed_at_visit =
        action.payload.s_is_installed_at_visit;
      setApplicationInput.s_name_of_individual =
        action.payload.s_name_of_individual;
      setApplicationInput.s_individual_position =
        action.payload.s_individual_position;
      setApplicationInput.s_individual_start_date =
        action.payload.s_individual_start_date;

      setApplicationInput.s_individual_sales_representatives =
        action.payload.s_individual_sales_representatives;
      setApplicationInput.s_individual_printed_name =
        action.payload.s_individual_printed_name;
      setApplicationInput.s_individual_date = action.payload.s_individual_date;
      setApplicationInput.representative_terms_accept =
        action.payload.representative_terms_accept;
      setApplicationInput.representative_privacy_accept =
        action.payload.representative_privacy_accept;
      setApplicationInput.representative_signature =
        action.payload.representative_signature;

      setApplicationInput.representative_fullname =
        action.payload.representative_fullname;
      setApplicationInput.representative_start_date =
        action.payload.representative_start_date;
      setApplicationInput.marchent_terms_accept =
        action.payload.marchent_terms_accept;
      setApplicationInput.marchent_privacy_accept =
        action.payload.marchent_privacy_accept;
      setApplicationInput.marchent_signature =
        action.payload.marchent_signature;
      setApplicationInput.marchent_fullname = action.payload.marchent_fullname;

      setApplicationInput.marchent_start_date =
        action.payload.marchent_start_date;
      setApplicationInput.industry_type = action.payload.industry_type;
      setApplicationInput.partner_manager = action.payload.partner_manager;
      setApplicationInput.partner_manager_name =
        action.payload.partner_manager_name;
      setApplicationInput.sales_partner = action.payload.sales_partner;
      setApplicationInput.sales_partner_name =
        action.payload.sales_partner_name;
      setApplicationInput.lead_owner = action.payload.lead_owner;
      setApplicationInput.lead_owner_name = action.payload.lead_owner_name;

      setApplicationInput.processed_by = action.payload.processed_by;
      setApplicationInput.submitted_by = action.payload.submitted_by;
      setApplicationInput.legal_country = action.payload.legal_country;

      setApplicationInput.trading_country = action.payload.trading_country;
      setApplicationInput.home_country = action.payload.home_country;
      setApplicationInput.registration_country_code =
        action.payload.registration_country_code;
      setApplicationInput.cole_from = action.payload.cole_from;
      setApplicationInput.switching_contribution =
        action.payload.switching_contribution;
      setApplicationInput.new_to_card_proccessing =
        action.payload.new_to_card_proccessing;
      setApplicationInput.previous_acquirer = action.payload.previous_acquirer;
      setApplicationInput.security_check = action.payload.security_check;
      setApplicationInput.funding_day = action.payload.funding_day;
      setApplicationInput.funding_frequesncy =
        action.payload.funding_frequesncy;
      setApplicationInput.delay_days = action.payload.delay_days;
      setApplicationInput.billing_frequesncy =
        action.payload.billing_frequesncy;
      setApplicationInput.billing_day = action.payload.billing_day;
      setApplicationInput.payment_method = action.payload.payment_method;
      setApplicationInput.renting_elavon_terminals =
        action.payload.renting_elavon_terminals;

      // -----------------------new value------------------
      setApplicationInput.visa_debit_sr = action.payload.visa_debit_sr;
      setApplicationInput.visa_debit_non_sr = action.payload.visa_debit_non_sr;
      setApplicationInput.visa_debit_sr_per_tr_fee =
        action.payload.visa_debit_sr_per_tr_fee;
      setApplicationInput.visa_debit_non_sr_per_tr_fee =
        action.payload.visa_debit_non_sr_per_tr_fee;

      setApplicationInput.master_debit_sr = action.payload.master_debit_sr;
      setApplicationInput.master_debit_non_sr =
        action.payload.master_debit_non_sr;
      setApplicationInput.master_debit_sr_per_tr_fee =
        action.payload.master_debit_sr_per_tr_fee;
      setApplicationInput.master_debit_non_sr_per_tr_fee =
        action.payload.master_debit_non_sr_per_tr_fee;

      setApplicationInput.master_credit_sr = action.payload.master_credit_sr;
      setApplicationInput.master_credit_non_sr =
        action.payload.master_credit_non_sr;
      setApplicationInput.master_credit_sr_per_tr_fee =
        action.payload.master_credit_sr_per_tr_fee;
      setApplicationInput.master_credit_non_sr_per_tr_fee =
        action.payload.master_credit_non_sr_per_tr_fee;

      setApplicationInput.visa_business_debit_sr =
        action.payload.visa_business_debit_sr;
      setApplicationInput.visa_business_debit_non_sr =
        action.payload.visa_business_debit_non_sr;
      setApplicationInput.visa_business_debit_sr_per_tr_fee =
        action.payload.visa_business_debit_sr_per_tr_fee;
      setApplicationInput.visa_business_debit_non_sr_per_tr_fee =
        action.payload.visa_business_debit_non_sr_per_tr_fee;

      setApplicationInput.visa_credit_sr = action.payload.visa_credit_sr;
      setApplicationInput.visa_credit_non_sr =
        action.payload.visa_credit_non_sr;
      setApplicationInput.visa_credit_sr_per_tr_fee =
        action.payload.visa_credit_sr_per_tr_fee;
      setApplicationInput.visa_credit_per_non_sr_tr_fee =
        action.payload.visa_credit_per_non_sr_tr_fee;

      setApplicationInput.visa_purchasing_sr =
        action.payload.visa_purchasing_sr;
      setApplicationInput.visa_purchasing_non_sr =
        action.payload.visa_purchasing_non_sr;
      setApplicationInput.visa_purchasing_sr_per_tr_fee =
        action.payload.visa_purchasing_sr_per_tr_fee;
      setApplicationInput.visa_purchasing_non_sr_per_tr_fee =
        action.payload.visa_purchasing_non_sr_per_tr_fee;

      setApplicationInput.visa_corporate_sr = action.payload.visa_corporate_sr;
      setApplicationInput.visa_corporate_sr_per_tr_fee =
        action.payload.visa_corporate_sr_per_tr_fee;
      setApplicationInput.visa_corporate_non_sr =
        action.payload.visa_corporate_non_sr;
      setApplicationInput.visa_corporat_non_sr_per_tr_fee =
        action.payload.visa_corporat_non_sr_per_tr_fee;

      setApplicationInput.master_purchasing_sr =
        action.payload.master_purchasing_sr;
      setApplicationInput.master_purchasing_sr_per_tr_fee =
        action.payload.master_purchasing_sr_per_tr_fee;
      setApplicationInput.master_purchasing_non_sr =
        action.payload.master_purchasing_non_sr;
      setApplicationInput.master_purchasing_non_sr_per_tr_fee =
        action.payload.master_purchasing_non_sr_per_tr_fee;

      setApplicationInput.master_fleet_sr = action.payload.master_fleet_sr;
      setApplicationInput.master_fleet_sr_per_tr_fee =
        action.payload.master_fleet_sr_per_tr_fee;

      setApplicationInput.master_fleet_non_sr =
        action.payload.master_fleet_non_sr;
      setApplicationInput.master_fleet_non_sr_per_tr_fee =
        action.payload.master_fleet_non_sr_per_tr_fee;

      setApplicationInput.master_corporate_sr =
        action.payload.master_corporate_sr;
      setApplicationInput.master_corporate_non_sr =
        action.payload.master_corporate_non_sr;
      setApplicationInput.master_corporate_sr_per_tr_fee =
        action.payload.master_corporate_sr_per_tr_fee;
      setApplicationInput.master_corporate_non_sr_per_tr_fee =
        action.payload.master_corporate_non_sr_per_tr_fee;

      setApplicationInput.master_pre_commercial_sr =
        action.payload.master_pre_commercial_sr;
      setApplicationInput.master_pre_commercial_sr_per_tr_fee =
        action.payload.master_pre_commercial_sr_per_tr_fee;
      setApplicationInput.master_pre_commercial_non_sr =
        action.payload.master_pre_commercial_non_sr;
      setApplicationInput.master_pre_commercial_non_sr_per_tr_fee =
        action.payload.master_pre_commercial_non_sr_per_tr_fee;

      setApplicationInput.non_eea_visa_sr = action.payload.non_eea_visa_sr;
      setApplicationInput.non_eea_visa_sr_per_tr_fee =
        action.payload.non_eea_visa_sr_per_tr_fee;

      setApplicationInput.non_eea_visa_non_sr =
        action.payload.non_eea_visa_non_sr;
      setApplicationInput.non_eea_visa_non_sr_per_tr_fee =
        action.payload.non_eea_visa_non_sr_per_tr_fee;

      setApplicationInput.non_eea_master_sr = action.payload.non_eea_master_sr;
      setApplicationInput.non_eea_master_sr_per_tr_fee =
        action.payload.non_eea_master_sr_per_tr_fee;
      setApplicationInput.non_eea_master_non_sr =
        action.payload.non_eea_master_non_sr;
      setApplicationInput.non_eea_master_non_sr_per_tr_fee =
        action.payload.non_eea_master_non_sr_per_tr_fee;

      setApplicationInput.master_business_sr =
        action.payload.master_business_sr;
      setApplicationInput.master_business_non_sr =
        action.payload.master_business_non_sr;
      setApplicationInput.master_business_sr_per_tr_fee =
        action.payload.master_business_sr_per_tr_fee;
      setApplicationInput.master_business_non_sr_per_tr_fee =
        action.payload.master_business_non_sr_per_tr_fee;

      setApplicationInput.visa_business_credit_sr =
        action.payload.visa_business_credit_sr;
      setApplicationInput.visa_business_credit_non_sr =
        action.payload.visa_business_credit_non_sr;
      setApplicationInput.visa_business_credit_sr_per_tr_fee =
        action.payload.visa_business_credit_sr_per_tr_fee;
      setApplicationInput.visa_business_credit_non_sr_per_tr_fee =
        action.payload.visa_business_credit_non_sr_per_tr_fee;

      setApplicationInput.visa_v_pay_sr = action.payload.visa_v_pay_sr;
      setApplicationInput.visa_v_pay_non_sr = action.payload.visa_v_pay_non_sr;
      setApplicationInput.visa_v_pay_sr_per_tr_fee =
        action.payload.visa_v_pay_sr_per_tr_fee;
      setApplicationInput.visa_v_pay_non_sr_per_tr_fee =
        action.payload.visa_v_pay_non_sr_per_tr_fee;

      setApplicationInput.uk_maestro_sr_per_tr_fee =
        action.payload.uk_maestro_sr_per_tr_fee;
      setApplicationInput.uk_maestro_sr = action.payload.uk_maestro_sr;
      setApplicationInput.uk_maestro_non_sr = action.payload.uk_maestro_non_sr;
      setApplicationInput.uk_maestro_non_sr_per_tr_fee =
        action.payload.uk_maestro_non_sr_per_tr_fee;

      setApplicationInput.international_maestro_sr =
        action.payload.international_maestro_sr;
      setApplicationInput.international_maestro_non_sr =
        action.payload.international_maestro_non_sr;
      setApplicationInput.international_maestro_sr_per_tr_fee =
        action.payload.international_maestro_sr_per_tr_fee;
      setApplicationInput.international_maestro_non_sr_per_tr_fee =
        action.payload.international_maestro_non_sr_per_tr_fee;

      setApplicationInput.amex_sr = action.payload.amex_sr;
      setApplicationInput.amex_sr_per_tr_fee =
        action.payload.amex_sr_per_tr_fee;

      setApplicationInput.auth_fees = action.payload.auth_fees;
      setApplicationInput.desc_of_service = action.payload.desc_of_service;
      setApplicationInput.customer_value_per_month =
        action.payload.customer_value_per_month;
      setApplicationInput.non_compliance_per_month =
        action.payload.non_compliance_per_month;
      setApplicationInput.product_per_month_amt =
        action.payload.product_per_month_amt;
      setApplicationInput.secured_by_elavon = action.payload.secured_by_elavon;
      setApplicationInput.cashback = action.payload.cashback;
      setApplicationInput.avg_cashback_amount =
        action.payload.avg_cashback_amount;
      setApplicationInput.cashback = action.payload.cashback;
      setApplicationInput.existing_mid = action.payload.existing_mid;
      setApplicationInput.vat_amount = action.payload.vat_amount;
      setApplicationInput.vat_notes = action.payload.vat_notes;
      setApplicationInput.amex_mid = action.payload.amex_mid;
      setApplicationInput.amex_type = action.payload.amex_type;
      setApplicationInput.amex_no = action.payload.amex_no;
      setApplicationInput.jan_to_mar = action.payload.jan_to_mar;
      setApplicationInput.apr_to_jun = action.payload.apr_to_jun;
      setApplicationInput.oct_to_dec = action.payload.oct_to_dec;
      setApplicationInput.jul_to_sep = action.payload.jul_to_sep;
      setApplicationInput.advance_supply_deposite_taken =
        action.payload.advance_supply_deposite_taken;
      setApplicationInput.perc_annual_deposite_of_turnover =
        action.payload.perc_annual_deposite_of_turnover;
      setApplicationInput.time_btw_deposite_and_remaining_payment =
        action.payload.time_btw_deposite_and_remaining_payment;
      setApplicationInput.take_full_payment = action.payload.take_full_payment;
      setApplicationInput.advance_supply_full_payment =
        action.payload.advance_supply_full_payment;
      setApplicationInput.advance_supply_full_payment =
        action.payload.advance_supply_full_payment;
      setApplicationInput.perc_annual_upfront_of_turnover =
        action.payload.perc_annual_upfront_of_turnover;
      setApplicationInput.vat_override = action.payload.vat_override;
      setApplicationInput.s_specific_location =
        action.payload.s_specific_location;
      setApplicationInput.bank_account_type = action.payload.bank_account_type;

      setApplicationInput.application_errors =
        action.payload.application_errors;
      // setApplicationInput.sign_back_pdf_url = action.payload.sign_back_pdf_url;
      // setApplicationInput.envelope_id = action.payload.envelope_id;

      return {
        ...state,
        applicationInput: setApplicationInput,
      };

    case Types.SET_BUSINESS_UPDATED:
      const setApplicationInput2 = { ...state.applicationInput };
      setApplicationInput2.legal_name = action.payload.lead.companyname;
      setApplicationInput2.id = action.payload.accountid;
     
      setApplicationInput2.client_id = action.payload.opportunity.name;
     

      setApplicationInput2.acquiring_bank =
        action.payload.opportunity?.[
          "ptsave_acquiring_bank@OData.Community.Display.V1.FormattedValue"
        ] || 0;
     
      setApplicationInput2.query_details = action.payload.query_details;
      // setApplicationInput2.opportunity_id = action.payload.opportunity_id;
      setApplicationInput2.opportunity_name = action.payload.opportunity_name;
      setApplicationInput2.dob = action.payload.contact.birthdate;
      setApplicationInput2.legal_type =
        action.payload.opportunity?.ptsave_legal_type;
      setApplicationInput2.legal_name = action.payload.lead.companyname;
      setApplicationInput2.company_house_no = action.payload.company_house_no;
      setApplicationInput2.trading_name =
        action.payload.opportunity.ptsave_trading_name;
      setApplicationInput2.current_ownership_since =
        action.payload.current_ownership_since;
      setApplicationInput2.company_house_no =
        action.payload.opportunity.ptsave_companyhouseno;
      setApplicationInput2.telephone = action.payload.telephone || "";
      setApplicationInput2.phone_code = action.payload.phone_code;
      setApplicationInput2.mobile_code = action.payload.mobile_code;
      setApplicationInput2.mcc_code = action.payload.lead.ptsave_mcc_code;
      setApplicationInput2.mobile = action.payload.lead?.telephone3 || "";
    
      setApplicationInput2.store_number = action.payload.store_number;
      setApplicationInput2.email = action.payload.opportunity.ptsave_email;
      setApplicationInput2.secondary_email =
        action.payload.opportunity.emailaddress || "";
      setApplicationInput2.website = action.payload.lead.ptsave_website;
 
      setApplicationInput2.callback_date = action.payload.callback_date;
      setApplicationInput2.est_close_date = action.payload.est_close_date;
      setApplicationInput2.appliation_price_quote =
        action.payload.appliation_price_quote;
      setApplicationInput2.application_close_date =
        action.payload.application_close_date;
      setApplicationInput2.note = action.payload.opportunity.description;
      setApplicationInput2.site_and_trading_address_same =
        action.payload.site_and_trading_address_same;
      setApplicationInput2.legal_postcode =
        action.payload.lead.address1_postalcode;
      setApplicationInput2.legal_address1 = action.payload.lead.address1_line1;
      setApplicationInput2.legal_address2 = action.payload.lead.address1_line2;
      setApplicationInput2.legal_city = action.payload.lead.address1_city;
      setApplicationInput2.legal_county = action.payload.lead.address1_county;
      setApplicationInput2.legal_country = 74;
      setApplicationInput2.trading_country = 74;
      setApplicationInput2.trading_postcode =
        action.payload.lead.ptsave_trading_zippostalcode;
      setApplicationInput2.trading_address1 =
        action.payload.lead.ptsave_trading_street1;
      setApplicationInput2.trading_address2 =
        action.payload.lead.ptsave_trading_street2;
      setApplicationInput2.trading_city =
        action.payload.lead.ptsave_trading_city;
      setApplicationInput2.trading_county =
        action.payload.lead.ptsave_trading_stateprovince;
      setApplicationInput2.home_postcode = action.payload.home_postcode;
      setApplicationInput2.home_address1 = action.payload.home_address1;
      setApplicationInput2.home_address2 = action.payload.home_address2;
      setApplicationInput2.home_city = action.payload.home_city;
      setApplicationInput2.home_county = action.payload.home_county;
      setApplicationInput2.bank_name =
        action.payload.opportunity.ptsave_bank_name;
      setApplicationInput2.bank_account_name =
        action.payload.opportunity.ptsave_bank_account_name;
      setApplicationInput2.bank_account_no =
        action.payload.opportunity.ptsave_account_number;

      setApplicationInput2.bank_sort_code =
        action.payload.opportunity.ptsave_sort_code;
      setApplicationInput2.bank_faster_payments =
        action.payload.bank_faster_payments;

 

      setApplicationInput2.mmsc = action.payload.opportunity?.["ptsave_mmsc"];
      setApplicationInput2.atv = action.payload.opportunity?.["ptsave_atv"];
      // setApplicationInput2.smtv = action.payload.smtv;
      setApplicationInput2.annual_turnover =
        action.payload.opportunity?.ptsave_annual_business_turnover_base;
      setApplicationInput2.annual_card_turnover =
        action.payload.account?.["ptsave_annualcardturnover"];
      setApplicationInput2.sales_moto_perc =
        action.payload.opportunity?.["ptsave_cardacceptanceratio_cnpmoto"];

      setApplicationInput2.sales_ftf_perc =
        action.payload.opportunity?.["ptsave_cardacceptanceratio_face2face"];
      setApplicationInput2.sales_internet_perc =
        action.payload.opportunity?.["ptsave_cardacceptanceratio_ecommerce"];
      setApplicationInput2.sof_notes =
        action.payload.opportunity?.["description"];
      setApplicationInput2.take_deposit =
        action.payload.opportunity.ptsave_doyoutakedeposit === false ? 0 : 1;
      setApplicationInput2.advance_supply_full_payment =
        action.payload.advance_supply_full_payment;
      setApplicationInput2.perc_annual_upfront_of_turnover =
        action.payload.perc_annual_upfront_of_turnover;

      setApplicationInput2.has_full_pmnt_bef_del =
        action.payload.has_full_pmnt_bef_del;
      setApplicationInput2.deposit_perc_transaction_value =
        action.payload.opportunity.deposit_perc_transaction_value;
      setApplicationInput2.seasonal_sales =
        action.payload.opportunity.ptsave_seasonalsales;
      setApplicationInput2.tax_id =
        action.payload.opportunity?.["ptsave_vatnumber"];
      setApplicationInput2.vat_enabled = action.payload.opportunity.ptsave_vat;
      setApplicationInput2.parent_entity_code =
        action.payload.parent_entity_code;
      setApplicationInput2.registration_county_code =
        action.payload.registration_county_code;
      setApplicationInput2.registration_zip_code =
        action.payload.registration_zip_code;

      setApplicationInput2.registration_house_number =
        action.payload.registration_house_number;
      setApplicationInput2.registration_house_name =
        action.payload.registration_house_name;
      setApplicationInput2.registration_street =
        action.payload.registration_street;
      setApplicationInput2.registration_locality =
        action.payload.registration_locality;
      setApplicationInput2.registration_city = action.payload.registration_city;
      setApplicationInput2.trading_address = action.payload.trading_address;

      // setApplicationInput2.industry_type =
      //   action.payload.lead?.[
      //     "_ptsave_industry_type_value@OData.Community.Display.V1.FormattedValue"
      //   ];
      setApplicationInput2.partner_manager = action.payload.partner_manager;
      setApplicationInput2.sales_partner = action.payload.sales_partner;
      setApplicationInput2.sales_partner_name =
        action.payload.lead?.[
          "_ptsave_partner_value@OData.Community.Display.V1.FormattedValue"
        ];
      // setApplicationInput2.user = action.payload.user;
      setApplicationInput2.processed_by = action.payload.processed_by;
      setApplicationInput2.submitted_by = action.payload.submitted_by;
      setApplicationInput2.legal_country = action.payload.legal_country;

      setApplicationInput2.trading_country = action.payload.trading_country;
      setApplicationInput2.home_country = action.payload.home_country;
      setApplicationInput2.registration_country_code =
        action.payload.registration_country_code;
      setApplicationInput2.cole_from = action.payload.cole_from;
      setApplicationInput2.switching_contribution =
        action.payload.switching_contribution;
      setApplicationInput2.new_to_card_proccessing =
        action.payload.account?.[
          "ptsave_oldcardprovider1@OData.Community.Display.V1.FormattedValue"
        ] === "N/A"
          ? false
          : true;
      setApplicationInput2.previous_acquirer =
        action.payload.account?.ptsave_oldcardprovidername;
      setApplicationInput2.security_check = action.payload.security_check;
      setApplicationInput2.funding_day = action.payload.funding_day;
      setApplicationInput2.funding_frequesncy =
        action.payload.funding_frequesncy;
      setApplicationInput2.delay_days = action.payload.delay_days;
      setApplicationInput2.billing_frequesncy =
        action.payload.billing_frequesncy;
      setApplicationInput2.billing_day = action.payload.billing_day;
      setApplicationInput2.payment_method =
        action.payload.oppurtinity?.ptsave_paymentmethod;
      setApplicationInput2.renting_elavon_terminals =
        action.payload.renting_elavon_terminals;
      setApplicationInput2.amex_mid =
        action.payload.opportunity.ptsave_amex_mid === false ? "false" : "true";
      setApplicationInput2.amex_type =
        action.payload.opportunity.ptsave_amex_mid_type;
      setApplicationInput2.amex_no =
        action.payload.opportunity.ptsave_amex_mid_no;
      setApplicationInput2.jan_to_mar =
        action.payload.opportunity.ptsave_seasonalsales_janfebmar;
      setApplicationInput2.apr_to_jun =
        action.payload.opportunity.ptsave_seasonalsalesaprmayjun;
      setApplicationInput2.oct_to_dec =
        action.payload.opportunity.ptsave_seasonalsalesoctnovdec;
      setApplicationInput2.jul_to_sep =
        action.payload.opportunity.ptsave_seasonalsalesjulaugsep;
      setApplicationInput2.auth_fees =
        action.payload.opportunity?.["ptsave_auth_decline_fee"];
      setApplicationInput2.desc_of_service =
        action.payload.opportunity.ptsave_descriptionofgoodsorservices;
      setApplicationInput2.customer_value_per_month =
        action.payload.customer_value_per_month;
      setApplicationInput2.non_compliance_per_month =
        action.payload.non_compliance_per_month;
      setApplicationInput2.product_per_month_amt =
        action.payload.product_per_month_amt;
      setApplicationInput2.secured_by_elavon = action.payload.secured_by_elavon;
      setApplicationInput2.cashback =
        action.payload.account?.["ptsave_cashback"];
      setApplicationInput2.avg_cashback_amount =
        action.payload.opportunity?.[
          "ptsave_cashback@OData.Community.Display.V1.FormattedValue"
        ];

      setApplicationInput2.application_errors =
        action.payload.application_errors;
      // setApplicationInput2.sign_back_pdf_url = action.payload.sign_back_pdf_url;
      setApplicationInput2.card_machine_service =
        action.payload.card_machine_service;
      setApplicationInput2.ecom_service = action.payload.ecom_service || false;
      setApplicationInput2.epos_service = action.payload.epos_service;

      return {
        ...state,
        applicationInput: setApplicationInput2,
      };

    // ---------------------------------submit to bank-------------------------------?
    case Types.SUBMIT_APPLICATION_TO_BANK:
      const submitApplicationInput = { ...state.submitApplicationInput };
      submitApplicationInput[action.payload.name] = action.payload.value;
      return {
        ...state,
        submitApplicationInput: submitApplicationInput,
      };
    case Types.AFTER_SUBMIT_BANK:
      return {
        ...state,
        afterSubmitBank: action.payload,
      };
    case Types.SET_SUBMIT_FALSE:
      return {
        ...state,
        afterSubmitBank: action.payload,
      };

    default:
      break;
  }
  return newState;
};

export default ApplicationReducer;
