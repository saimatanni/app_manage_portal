import * as Types from "../types/Types";

const initialState = {
  leadInput: {
    lead_products: [
      {
        // connection_type: "",
        // // contact_length: 18,
        // terminal_model: "",
        // provider: "",
        // qty: 1,
        // // country: 74,
        // product: "",
        // lead_id: "",
        // monthly_price: "",
        // product_term: 18,
        // is_deleted: false,
        // terminal_provider: "",
        // epos_provider: "",
        // getway_provider: "",
        // terminal_option: "",
        // integration_availability: "",
        // epos_option: "",
        // website_url: "",
        // service_option: "",
        // integrated_with: "",
        // // product_type: "",
      },
    ],
    terminal_products: [
      // {
      //   connection_type: "",
      //   // contact_length: 18,
      //   terminal_model: "",
      //   qty: 1,
      //   epos_name: "",
      //   product: "",
      //   lead_id: "",
      //   price: "",
      //   product_term: 18,
      //   is_deleted: false,
      //   product_type: "",
      //   epos_provider: "",
      //   epos_option: "",
      //   terminal_option: "",
      //   integration_availability: "",
      //   terminal_provider: "",
      // },
    ],
    ecommerce_products: [
      // {
      //   provider: "",
      //   product_type: "",
      //   lead_id: "",
      //   is_deleted: false,
      //   website_url: "",
      //   getway_provider: "",
      // },
    ],
    epos_products: [
      // {
      //   provider: "",
      //   product_type: "epos",
      //   lead_id: "",
      //   is_deleted: false,
      //   epos_option: "",
      //   epos_provider: "",
      //   one_of_cost: "",
      //   service_option: "",
      //   integrated_with: "",
      // },
    ],
    slug: "",
    client_id: "",
    legal_type: "",

    ptsave_legal_type: "",
    ptsave_oldcardprovider: "",
    lead_source: 1,
    lead_type: "",
    has_old_card_provider: false,
    card_machine_service: false,
    ecom_service: false,
    epos_service: false,
    lead_qualify_id: "",
    flag_code: "GB",
    qualify_id: "",
    // source: '',
    id: "",
    // legal_type: null,
    // lead_stage: null,
    // lead_status: null,
    previous_acquirer: "",
    sales_partner: "",
    partner_manager: "",
    // callback_date: null,
    legal_name: "",
    contact_full_name: "",
    trading_name: null,
    current_ownership_since: null,
    company_house_no: "",
    trading_address: "",
    mcc_code: "",
    website: "",
    website_url: "",
    site_and_trading_address_same: 0,
    note: "",
    first_name: "",
    last_name: "",
    dob: null,
    mobile: "",
    email: "",
    telephone: "",
    secondary_email: "",
    legal_postcode: "",
    legal_address1: "",
    legal_address2: "",
    legal_city: "",
    legal_county: "",
    legal_country: 74,
    trading_postcode: "",
    trading_address1: "",
    trading_address2: "",
    trading_city: "",
    trading_county: "",
    country_name: "",
    trading_country: 74,
    home_postcode: "",
    home_address1: "",
    home_address2: "",
    home_city: "",
    home_county: "",
    home_country: 74,
    is_closed: false,
    user: "",
    industry_type: "",

    visa_debit_pr: "0.350",
    visa_debit_cr: "0.450",
    visa_debit_ts: 0,
    // visa_debit_tr_no: "",
    visa_debit_cc: "0",
    visa_debit_pc: "0",

    mastercard_debit_pr: "0.380",
    mastercard_debit_cr: "0.480",
    mastercard_debit_ts: 0,
    // mastercard_debit_tr_no: "",
    mastercard_debit_cc: "0",
    mastercard_debit_pc: "0",

    visa_credit_pr: "0.650",
    visa_credit_cr: "0.700",
    visa_credit_ts: 0,
    // visa_credit_tr_no: "",
    visa_credit_cc: "0",
    visa_credit_pc: "0",

    mastercard_credit_pr: "0.650",
    mastercard_credit_cr: "0.700",
    mastercard_credit_ts: 0,
    // mastercard_credit_tr_no: "",
    mastercard_credit_cc: "0",
    mastercard_credit_pc: "0",

    visa_business_debit_pr: "1.850",
    visa_business_debit_cr: "1.200",
    visa_business_debit_ts: 0,
    // visa_business_debit_tr_no: "",
    visa_business_debit_cc: "0.000",
    visa_business_debit_pc: "0.000",

    visa_business_credit_pr: "2.300",
    visa_business_credit_cr: "2.100",
    visa_business_credit_ts: "0",
    // visa_business_credit_tr_no: "",
    visa_business_credit_cc: "0.000",
    visa_business_credit_pc: "0.000",

    card_acceptance_fee_pr: "0.000",
    card_acceptance_fee_cr: "0.000",
    card_acceptance_fee_ts: 0,
    // card_acceptance_fee_tr_no: "",
    card_acceptance_fee_cc: "0.000",
    card_acceptance_fee_pc: "0.000",

    card_transaction_fee_cr: "0.000",
    card_transaction_fee_pr: "0.000",
    card_transaction_fee_ts: 0,
    // card_transaction_fee_tr_no: "",
    card_transaction_fee_cc: "0.000",
    card_transaction_fee_pc: "0.000",

    authorization_fee_cr: "0.000",
    authorization_fee_pr: "0.000",
    // authorization_fee_ts: "",
    authorization_fee_tr_no: "0.000",
    authorization_fee_cc: "0.000",
    authorization_fee_pc: "0.000",

    per_transactional_charge_cr: "0.000",
    per_transactional_charge_pr: "0.010",
    per_transactional_charge_ts: 0.0,
    per_transactional_charge_tr_no: 0.0,
    per_transactional_charge_cc: 0.0,
    per_transactional_charge_pc: 0.0,
    portal_reporting_fee_cr: "0.000",
    portal_reporting_fee_pr: "0.000",
    portal_reporting_fee_ts: 0.0,
    portal_reporting_fee_tr_no: 0.0,
    portal_reporting_fee_cc: 0.0,
    portal_reporting_fee_pc: 0.0,
    pci_dss_fee_pr: "4.500",
    pci_dss_fee_cr: "0.000",
    pci_dss_fee_ts: 0.0,
    pci_dss_fee_tr_no: 0.0,
    pci_dss_fee_cc: 0.0,
    pci_dss_fee_pc: 0.0,
    terminal_rental_fee_cr: 0.0,
    terminal_rental_fee_pr: 0.0,
    terminal_rental_fee_ts: 0.0,
    terminal_rental_fee_tr_no: 0.0,
    terminal_rental_fee_cc: 0.0,
    terminal_rental_fee_pc: 0.0,

    mastercard_business_pr: "2.300",
    mastercard_business_cr: "0.000",
    mastercard_business_ts: 0.0,
    mastercard_business_tr_no: 0.0,
    mastercard_business_cc: 0.0,
    mastercard_business_pc: 0.0,

    mastercard_corporate_pr: "2.500",
    mastercard_corporate_cr: "0.000",
    mastercard_corporate_ts: 0.0,
    mastercard_corporate_tr_no: 0.0,
    mastercard_corporate_cc: 0.0,
    mastercard_corporate_pc: 0.0,

    all_non_eea_mastercard_fee_cc: 0.0,
    all_non_eea_mastercard_fee_pr: "3.000",
    all_non_eea_mastercard_fee_pc: "0.000",
    all_non_eea_mastercard_fee_cr: "0.000",
    all_non_eea_mastercard_fee_tr_no: 0,
    all_non_eea_mastercard_fee_ts: 0,

    all_non_eea_visa_fee_cc: "0.000",
    all_non_eea_visa_fee_cr: "0.000",
    all_non_eea_visa_fee_pc: "0.000",
    all_non_eea_visa_fee_pr: "3.000",
    all_non_eea_visa_fee_tr_no: 0,
    all_non_eea_visa_fee_ts: 0,

    amex_cc: "0.000",
    amex_cr: "0.000",
    amex_pc: "0.000",
    amex_sr: "1.900",
    amex_tr_no: 0,
    amex_ts: 0,

    num_of_terminals: 0,
    terminal_provider_pervious: "",
    terminal_provider_current: "",

    parent_entity_code: 0,

    renting_elavon_terminals: "no",
    annual_card_turnover: 0,
    num_of_transaction: 0,
    atv: 0,

    mmsc: 0,
    mobile_code: 74,
    phone_code: 74,
    // incorporated_on: null,
    charity_number: "",
    step: "1",
    active_lead: false,
    active_quote: false,
    active_application: false,

    // -new- product
    product_type: [],
    terminal_option: "",
    integration_availability: "",
    epos_name: "",

    epos_option: "",
  },

  legalTypeInput: {
    limited: "",
    soleTrade: "",
    other: "",
    lead_qualify_id: "",
  },
  afterSuccessLeads: false,
  leadQualify: null,
  companyHouseList: [],
  companyHouseDetails: null,
  companyOfficerDetails: [],
  postCodeList: [],
  addressDetails: null,
  IndustryList: [],
  countryList: [],
  UserList: [],
  afterSuccessqualify: false,
  functionCalled: false,
  leadQualifyCheck: false,
  isLoadLeads: false,
};

const LeadReducer = (state = initialState, action) => {
  const newState = { ...state };
  //Leads
  switch (action.type) {
    case Types.IS_LOAD_LEADS:
      return {
        ...state,
        isLoadLeads: action.payload,
      };
    case Types.SET_FUNCTION_CALLED:
      return {
        ...state,
        functionCalled: action.payload,
      };

    case Types.AFTER_SUCCESS_LEADS:
      return {
        ...state,
        afterSuccessLeads: action.payload,
      };
    case Types.SET_FALSE:
      return {
        ...state,
        afterSuccessLeads: action.payload,
        leadInput: initialState.leadInput,
      };
    case Types.SET_TYPE_FALSE:
      return {
        ...state,
        afterSuccessLeads: action.payload,
        legalTypeInput: initialState.legalTypeInput,
      };
    case Types.AFTER_SUCCESS_UPDATE:
      return {
        ...state,
        afterSuccessUpdate: action.payload,
      };
    case Types.AFTER_SUCCESS_QUALIFY:
      return {
        ...state,
        afterSuccessqualify: action.payload,
      };
    case Types.SET_FALSE_UPDATE_LEADS:
      return {
        ...state,
        afterSuccessUpdate: action.payload,
        afterSuccessqualify: action.payload,

        // leadInput: initialState.leadInput,
      };
    case Types.LEAD_QUALIFY_CHECK_FALSE:
      return {
        ...state,
        leadQualifyCheck: action.payload,
      };
    case Types.GET_QUALIFY_LEAD:
      return {
        ...state,
        leadQualify: action.payload,
      };
    case Types.QUALIFY_STATUS:
      return {
        ...state,
        leadQualifyCheck: action.payload,
      };

    case Types.GET_COUNTRY_LIST:
      return {
        ...state,
        countryList: action.payload,
      };
    case Types.GET_USER_LIST:
      return {
        ...state,
        UserList: action.payload,
      };
    case Types.GET_LEADS_INPUT:
      const leadInput = { ...state.leadInput };
      leadInput[action.payload.name] = action.payload.value;

      return {
        ...state,
        leadInput: leadInput,
      };
    case Types.GET_LEGAL_INPUT:
      const legalTypeInput = { ...state.legalTypeInput };
      legalTypeInput[action.payload.name] = action.payload.value;

      return {
        ...state,
        legalTypeInput: legalTypeInput,
      };

    // ------------company house-----------------
    case Types.GET_COMPANY_HOUSE_LIST:
      return {
        ...state,
        companyHouseList: action.payload,
      };
    case Types.GET_COMPANY_HOUSE_DETAILS:
      return {
        ...state,
        companyHouseDetails: action.payload,
      };
    case Types.GET_COMPANY_OFFICERS_DETAILS:
      return {
        ...state,
        companyOfficerDetails: action.payload,
      };

    // ===post code start==================
    case Types.GET_POST_CODE_LIST:
      return {
        ...state,
        postCodeList: action.payload,
      };
    case Types.GET_POST_CODE_ADDRESS:
      return {
        ...state,
        addressDetails: action.payload,
      };
    case Types.GET_INDUSTRY_LIST:
      return {
        ...state,
        IndustryList: action.payload,
      };

    //  ==================lead products================
    case Types.GET_EPOS_PRODUCT:
      const setEposProductInput = { ...state.leadInput };
      const epos_products = [...state.leadInput.epos_products];

      epos_products[action.payload.index] = {
        ...state.leadInput.epos_products[action.payload.index],
        [action.payload.name]: action.payload.value,
      };

      return {
        ...state,
        leadInput: {
          ...setEposProductInput,
          epos_products,
        },
      };
    case Types.SET_EPOS_PRODUCT:
      const setEposProduct = { ...state.leadInput };
      const newEposProduct = [...state.leadInput.epos_products];

      return {
        ...state,
        leadInput: {
          ...setEposProduct,
          epos_products: [
            ...newEposProduct,
            {
              product_type: "epos",
              epos_provider: null,
              lead_id: "",
              is_deleted: false,
              epos_option: "",
              one_of_cost: "",
              service_option: null,
              integrated_with: "",
              price: "20.99",
            },
          ],
        },
      };
    case Types.REMOVE_EPOS_PRODUCT:
      const removEposProduct = { ...state.leadInput };

      const updateEposProducts = state.leadInput.epos_products.filter(
        (item, index) => {
          return index != action.payload;
        }
      );

      return {
        ...state,
        leadInput: {
          ...removEposProduct,
          epos_products: [
            ...updateEposProducts,
            // removeoptions.splice(1)
          ],
        },
      };
    //  =======
    case Types.GET_ECOMMERCE_PRODUCT:
      const setEcommerceProductInput = { ...state.leadInput };
      const ecommerce_products = [...state.leadInput.ecommerce_products];

      ecommerce_products[action.payload.index] = {
        ...state.leadInput.ecommerce_products[action.payload.index],
        [action.payload.name]: action.payload.value,
      };

      return {
        ...state,
        leadInput: {
          ...setEcommerceProductInput,
          ecommerce_products,
        },
      };

    case Types.SET_ECOMMERCE_PRODUCT:
      const setecommerceProduct = { ...state.leadInput };
      const newEcommerceProduct = [...state.leadInput.ecommerce_products];

      return {
        ...state,
        leadInput: {
          ...setecommerceProduct,
          ecommerce_products: [
            ...newEcommerceProduct,
            {
              product_type: "",
              lead_id: "",
              is_deleted: false,
              website_url: "",
              getway_provider: null,
            },
          ],
        },
      };
    case Types.REMOVE_ECOMMERCE_PRODUCT:
      const removeEcommerceProduct = { ...state.leadInput };

      const updateEcommerceProducts = state.leadInput.ecommerce_products.filter(
        (item, index) => {
          return index != action.payload;
        }
      );

      return {
        ...state,
        leadInput: {
          ...removeEcommerceProduct,
          ecommerce_products: [
            ...updateEcommerceProducts,
            // removeoptions.splice(1)
          ],
        },
      };
    //  ==================lead products================

    case Types.GET_CARD_TERMINAL_PRODUCT:
      const setTerminalProductInput = { ...state.leadInput };
      const terminal_products = [...state.leadInput.terminal_products];

      terminal_products[action.payload.index] = {
        ...state.leadInput.terminal_products[action.payload.index],
        [action.payload.name]: action.payload.value,
      };

      return {
        ...state,
        leadInput: {
          ...setTerminalProductInput,
          terminal_products,
        },
      };

    case Types.SET_CARD_TERMINAL_PRODUCT:
      const setTerminalProduct = { ...state.leadInput };
      const newTerminalProduct = [...state.leadInput.terminal_products];

      return {
        ...state,
        leadInput: {
          ...setTerminalProduct,
          terminal_products: [
            ...newTerminalProduct,
            {
              connection_type: "",
              product_type: "card_terminal",
              terminal_model: "",
              provider: "",
              qty: 1,
              country: 74,
              product: "",
              lead_id: "",
              price: "20.99",
              product_term: 18,
              is_deleted: false,
              terminal_provider: "",
              epos_provider: "",
              epos_option: "",
              epos_name: "",
              terminal_option: "",
              integration_availability: "",
              previous_acquirer: "",
              has_old_card_provider: false,
            },
          ],
        },
      };
    case Types.REMOVE_CARD_TERMINAL_PRODUCT:
      const removeTerminalProduct = { ...state.leadInput };

      const updateTerminalProducts = state.leadInput.terminal_products.filter(
        (item, index) => {
          return index != action.payload;
        }
      );

      return {
        ...state,
        leadInput: {
          ...removeTerminalProduct,
          terminal_products: [
            ...updateTerminalProducts,
            // removeoptions.splice(1)
          ],
        },
      };

    case Types.SET_LEADS_UPDATED:
      const setLeadsInput = { ...state.leadInput };
      // setLeadsInput.source = action.payload.source
      setLeadsInput.id = action.payload.id;
      setLeadsInput.slug = action.payload.slug;
      setLeadsInput.client_id = action.payload.client_id;
      setLeadsInput.lead_type = action.payload.lead_type;
      setLeadsInput.ptsave_oldcardprovider =
        action.payload.ptsave_oldcardprovider;
      setLeadsInput.lead_source = action.payload.lead_source;
      setLeadsInput.site_and_trading_address_same =
        action.payload.site_and_trading_address_same;
      setLeadsInput.lead = action.payload.lead;
      setLeadsInput.flag_code = action.payload.flag_code;
      setLeadsInput.epos_service = action.payload.epos_service;
      setLeadsInput.ecom_service = action.payload.ecom_service;
      setLeadsInput.card_machine_service = action.payload.card_machine_service;
      setLeadsInput.lead_products = action.payload.lead_products || [];

      setLeadsInput.charity_number = action.payload.charity_number;
      setLeadsInput.legal_type = action.payload.legal_type;
      setLeadsInput.lead_stage = action.payload.lead_stage;
      setLeadsInput.lead_status = action.payload.lead_status;
      setLeadsInput.sales_partner = action.payload.sales_partner;
      setLeadsInput.partner_manager = action.payload.partner_manager;
      setLeadsInput.callback_date = action.payload.callback_date;
      setLeadsInput.legal_name = action.payload.legal_name;
      setLeadsInput.contact_full_name = action.payload.contact_full_name;
      setLeadsInput.trading_name = action.payload.trading_name;
      setLeadsInput.current_ownership_since =
        action.payload.current_ownership_since;
      setLeadsInput.company_house_no = action.payload.company_house_no;
      setLeadsInput.trading_address = action.payload.trading_address;
      setLeadsInput.mcc_code = action.payload.mcc_code;
      setLeadsInput.website = action.payload.website;
      setLeadsInput.website_url = action.payload.website_url;
      setLeadsInput.note = action.payload.note;
      setLeadsInput.first_name = action.payload.first_name;
      setLeadsInput.last_name = action.payload.last_name;
      setLeadsInput.dob = action.payload.dob;
      setLeadsInput.mobile = action.payload.mobile;
      setLeadsInput.email = action.payload.email;
      setLeadsInput.telephone = action.payload.telephone;
      setLeadsInput.secondary_email = action.payload.secondary_email;
      setLeadsInput.legal_postcode = action.payload.legal_postcode;
      setLeadsInput.legal_address1 = action.payload.legal_address1;
      setLeadsInput.legal_address2 = action.payload.legal_address2;
      setLeadsInput.legal_city = action.payload.legal_city;
      setLeadsInput.legal_county = action.payload.legal_county;
      setLeadsInput.legal_country = action.payload.legal_country;
      setLeadsInput.trading_postcode = action.payload.trading_postcode;
      setLeadsInput.trading_address1 = action.payload.trading_address1;
      setLeadsInput.trading_address2 = action.payload.trading_address2;
      setLeadsInput.trading_city = action.payload.trading_city;
      setLeadsInput.home_postcode = action.payload.home_postcode;
      setLeadsInput.home_address1 = action.payload.home_address1;
      setLeadsInput.home_address2 = action.payload.home_address2;
      setLeadsInput.home_city = action.payload.home_city;
      setLeadsInput.home_county = action.payload.home_county;
      setLeadsInput.home_country = action.payload.home_country;

      setLeadsInput.secondary_email = action.payload.secondary_email;
      setLeadsInput.trading_county = action.payload.trading_county;
      setLeadsInput.trading_country = action.payload.trading_country;
      setLeadsInput.industry_type = action.payload.industry_type;
      setLeadsInput.user = action.payload.user;
      setLeadsInput.id = action.payload.id;
      setLeadsInput.incorporated_on = action.payload.incorporated_on;

      setLeadsInput.visa_debit_pr = action.payload.visa_debit_pr;
      setLeadsInput.visa_debit_cr = action.payload.visa_debit_cr;
      setLeadsInput.visa_debit_ts = action.payload.visa_debit_ts;
      // setLeadsInput.visa_debit_tr_no = action.payload.visa_debit_tr_no;
      setLeadsInput.visa_debit_cc = action.payload.visa_debit_cc;
      setLeadsInput.visa_debit_pc = action.payload.visa_debit_pc;

      setLeadsInput.mastercard_debit_cr = action.payload.mastercard_debit_cr;
      setLeadsInput.mastercard_debit_pr = action.payload.mastercard_debit_pr;
      setLeadsInput.mastercard_debit_ts = action.payload.mastercard_debit_ts;
      // setLeadsInput.mastercard_debit_tr_no =
      // action.payload.mastercard_debit_tr_no;
      setLeadsInput.mastercard_debit_cc = action.payload.mastercard_debit_cc;
      setLeadsInput.mastercard_debit_pc = action.payload.mastercard_debit_pc;

      setLeadsInput.visa_credit_cr = action.payload.visa_credit_cr;
      setLeadsInput.visa_credit_pr = action.payload.visa_credit_pr;
      setLeadsInput.visa_credit_ts = action.payload.visa_credit_ts;
      // // setLeadsInput.visa_credit_tr_no = action.payload.visa_credit_tr_no;
      setLeadsInput.visa_credit_cc = action.payload.visa_credit_cc;
      setLeadsInput.visa_credit_pc = action.payload.visa_credit_pc;

      setLeadsInput.mastercard_credit_cr = action.payload.mastercard_credit_cr;
      setLeadsInput.mastercard_credit_pr = action.payload.mastercard_credit_pr;
      setLeadsInput.mastercard_credit_ts = action.payload.mastercard_credit_ts;
      // setLeadsInput.mastercard_credit_tr_no =
      // action.payload.mastercard_credit_tr_no;
      setLeadsInput.mastercard_credit_cc = action.payload.mastercard_credit_cc;
      setLeadsInput.mastercard_credit_pc = action.payload.mastercard_credit_pc;

      setLeadsInput.visa_business_debit_cr =
        action.payload.visa_business_debit_cr;
      setLeadsInput.visa_business_debit_pr =
        action.payload.visa_business_debit_pr;
      setLeadsInput.visa_business_debit_ts =
        action.payload.visa_business_debit_ts;
      // setLeadsInput.visa_business_debit_tr_no =
      // action.payload.visa_business_debit_tr_no;
      setLeadsInput.visa_business_debit_cc =
        action.payload.visa_business_debit_cc;
      setLeadsInput.visa_business_debit_pc =
        action.payload.visa_business_debit_pc;

      setLeadsInput.visa_business_credit_cr =
        action.payload.visa_business_credit_cr;
      setLeadsInput.visa_business_credit_pr =
        action.payload.visa_business_credit_pr;
      setLeadsInput.visa_business_credit_ts =
        action.payload.visa_business_credit_ts;
      // setLeadsInput.visa_business_credit_tr_no =
      // action.payload.visa_business_credit_tr_no;
      setLeadsInput.visa_business_credit_cc =
        action.payload.visa_business_credit_cc;
      setLeadsInput.visa_business_credit_pc =
        action.payload.visa_business_credit_pc;

      setLeadsInput.card_acceptance_fee_cr =
        action.payload.card_acceptance_fee_cr;
      setLeadsInput.card_acceptance_fee_pr =
        action.payload.card_acceptance_fee_pr;
      setLeadsInput.card_acceptance_fee_ts =
        action.payload.card_acceptance_fee_ts;
      // setLeadsInput.card_acceptance_fee_tr_no =
      // action.payload.card_acceptance_fee_tr_no;
      setLeadsInput.card_acceptance_fee_cc =
        action.payload.card_acceptance_fee_cc;
      setLeadsInput.card_acceptance_fee_pc =
        action.payload.card_acceptance_fee_pc;

      setLeadsInput.card_transaction_fee_cr =
        action.payload.card_transaction_fee_cr;
      setLeadsInput.card_transaction_fee_pr =
        action.payload.card_transaction_fee_pr;
      setLeadsInput.card_transaction_fee_ts =
        action.payload.card_transaction_fee_ts;
      // setLeadsInput.card_transaction_fee_tr_no =
      // action.payload.card_transaction_fee_tr_no;
      setLeadsInput.card_transaction_fee_cc =
        action.payload.card_transaction_fee_cc;
      setLeadsInput.card_transaction_fee_pc =
        action.payload.card_transaction_fee_pc;

      setLeadsInput.authorization_fee_cr = action.payload.authorization_fee_cr;
      setLeadsInput.authorization_fee_pr = action.payload.authorization_fee_pr;
      // setLeadsInput.authorization_fee_ts = action.payload.authorization_fee_ts;
      setLeadsInput.authorization_fee_tr_no =
        action.payload.authorization_fee_tr_no;
      setLeadsInput.authorization_fee_cc = action.payload.authorization_fee_cc;
      setLeadsInput.authorization_fee_pc = action.payload.authorization_fee_pc;

      setLeadsInput.per_transactional_charge_cr =
        action.payload.per_transactional_charge_cr;
      setLeadsInput.per_transactional_charge_pr =
        action.payload.per_transactional_charge_pr;
      setLeadsInput.per_transactional_charge_ts =
        action.payload.per_transactional_charge_ts;
      setLeadsInput.per_transactional_charge_tr_no =
        action.payload.per_transactional_charge_tr_no;
      setLeadsInput.per_transactional_charge_cc =
        action.payload.per_transactional_charge_cc;
      setLeadsInput.per_transactional_charge_pc =
        action.payload.per_transactional_charge_pc;

      setLeadsInput.portal_reporting_fee_cr =
        action.payload.portal_reporting_fee_cr;
      setLeadsInput.portal_reporting_fee_pr =
        action.payload.portal_reporting_fee_pr;
      setLeadsInput.portal_reporting_fee_ts =
        action.payload.portal_reporting_fee_ts;
      setLeadsInput.portal_reporting_fee_tr_no =
        action.payload.portal_reporting_fee_tr_no;
      setLeadsInput.portal_reporting_fee_cc =
        action.payload.portal_reporting_fee_cc;
      setLeadsInput.portal_reporting_fee_pc =
        action.payload.portal_reporting_fee_pc;

      setLeadsInput.pci_dss_fee_cr = action.payload.pci_dss_fee_cr;
      setLeadsInput.pci_dss_fee_pr = action.payload.pci_dss_fee_pr;
      setLeadsInput.pci_dss_fee_ts = action.payload.pci_dss_fee_ts;
      setLeadsInput.pci_dss_fee_tr_no = action.payload.pci_dss_fee_tr_no;
      setLeadsInput.pci_dss_fee_cc = action.payload.pci_dss_fee_cc;
      setLeadsInput.pci_dss_fee_pc = action.payload.pci_dss_fee_pc;

      setLeadsInput.terminal_rental_fee_cr =
        action.payload.terminal_rental_fee_cr;
      setLeadsInput.terminal_rental_fee_pr =
        action.payload.terminal_rental_fee_pr;
      setLeadsInput.terminal_rental_fee_ts =
        action.payload.terminal_rental_fee_ts;
      setLeadsInput.terminal_rental_fee_tr_no =
        action.payload.terminal_rental_fee_tr_no;
      setLeadsInput.terminal_rental_fee_cc =
        action.payload.terminal_rental_fee_cc;
      setLeadsInput.terminal_rental_fee_pc =
        action.payload.terminal_rental_fee_pc;
      setLeadsInput.num_of_terminals = action.payload.num_of_terminals;
      setLeadsInput.terminal_provider_current =
        action.payload.terminal_provider_current;
      setLeadsInput.terminal_provider_pervious =
        action.payload.terminal_provider_pervious;

      setLeadsInput.mastercard_business_cr =
        action.payload.mastercard_business_cr;
      setLeadsInput.mastercard_business_pr =
        action.payload.mastercard_business_pr;
      setLeadsInput.mastercard_business_ts =
        action.payload.mastercard_business_ts;
      setLeadsInput.mastercard_business_tr_no =
        action.payload.mastercard_business_tr_no;
      setLeadsInput.mastercard_business_cc =
        action.payload.mastercard_business_cc;
      setLeadsInput.mastercard_business_pc =
        action.payload.mastercard_business_pc;

      setLeadsInput.mastercard_corporate_cr =
        action.payload.mastercard_corporate_cr;
      setLeadsInput.mastercard_corporate_pr =
        action.payload.mastercard_corporate_pr;
      setLeadsInput.mastercard_corporate_ts =
        action.payload.mastercard_corporate_ts;
      setLeadsInput.mastercard_corporate_tr_no =
        action.payload.mastercard_corporate_tr_no;
      setLeadsInput.mastercard_corporate_cc =
        action.payload.mastercard_corporate_cr;
      setLeadsInput.mastercard_corporate_pc =
        action.payload.mastercard_corporate_pc;
      // setLeadsInput.mastercard_corporate_ts = action.payload.mastercard_corporate_ts

      setLeadsInput.all_non_eea_mastercard_fee_cc =
        action.payload.all_non_eea_mastercard_fee_cc;
      setLeadsInput.all_non_eea_mastercard_fee_cr =
        action.payload.all_non_eea_mastercard_fee_cr;
      setLeadsInput.all_non_eea_mastercard_fee_pc =
        action.payload.all_non_eea_mastercard_fee_pc;
      setLeadsInput.all_non_eea_mastercard_fee_pr =
        action.payload.all_non_eea_mastercard_fee_pr;
      setLeadsInput.all_non_eea_mastercard_fee_tr_no =
        action.payload.all_non_eea_mastercard_fee_tr_no;
      setLeadsInput.all_non_eea_mastercard_fee_ts =
        action.payload.all_non_eea_mastercard_fee_ts;

      setLeadsInput.all_non_eea_visa_fee_cc =
        action.payload.all_non_eea_visa_fee_cc;
      setLeadsInput.all_non_eea_visa_fee_cr =
        action.payload.all_non_eea_visa_fee_cr;
      setLeadsInput.all_non_eea_visa_fee_pc =
        action.payload.all_non_eea_visa_fee_pc;
      setLeadsInput.all_non_eea_visa_fee_pr =
        action.payload.all_non_eea_visa_fee_pr;
      setLeadsInput.all_non_eea_visa_fee_tr_no =
        action.payload.all_non_eea_visa_fee_tr_no;
      setLeadsInput.all_non_eea_visa_fee_ts =
        action.payload.all_non_eea_visa_fee_ts;

      setLeadsInput.amex_cc = action.payload.amex_cc;
      setLeadsInput.amex_cr = action.payload.amex_cr;
      setLeadsInput.amex_pc = action.payload.amex_pc;
      setLeadsInput.amex_sr = action.payload.amex_sr;
      setLeadsInput.amex_tr_no = action.payload.amex_tr_no;
      setLeadsInput.amex_ts = action.payload.amex_ts;
      setLeadsInput.num_of_transaction = action.payload.num_of_transaction;
      setLeadsInput.annual_card_turnover = action.payload.annual_card_turnover;
      setLeadsInput.atv = action.payload.atv;
      // setLeadsInput.mastercard_corporate_ts = action.payload.mastercard_corporate_ts

      return {
        ...state,
        leadInput: setLeadsInput,
      };

    // ----------
    default:
      break;
  }
  return newState;
};

export default LeadReducer;
