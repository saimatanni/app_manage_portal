import * as Types from "../types/Types";

const initialState = {
  priceQuoteInput: {
    
    quote_products: [
      {
        connection_type: "",

        terminal_model: "",

        qty: 1,
        provider: "",
        product: "",
        quote: "",

        monthly_price: "20.99",
        product_term: 18,

        is_deleted: false,
        service_option: "",
        integrated_with: "",
      },
    ],
    terminal_products: [
     
    ],
    ecommerce_products: [
      // {
      //   product_type: "",
      //   quote: "",
      //   application: "",
      //   is_deleted: false,
      //   website_url: "",
      //   getway_provider: "",
      // },
    ],
    epos_products: [
      // {
      //   application: "",
      //   product_type: "epos",
      //   quote: "",
      //   is_deleted: false,
      //   epos_option: "",
      //   epos_provider: "",
      //   one_of_cost: "",
      //   monthly_price: "",
      //   price: "",
      // },
    ],
   
    slug: '',
    site_and_trading_address_same: 0,
    card_machine_service: false,
    ecom_service: false,
    epos_service: false,
    lead_qualify_id: "",
    is_closed: false,
    qualify_id: "",
    app_qualify_id: "",

    // source: "",
    lead_source: 1,
    incorporated_on: null,
    client_id: "",
    id: undefined,
    legal_type: "",
    existing_mid: "",
    lead_stage: "",
    lead_status: "",
    sales_partner: "",
    sales_partner_name: "",
    partner_manager: "",
    partner_manager_name: "",
    callback_date: "",
    legal_name: "",
    trading_name: "",
    current_ownership_since: "",
    company_house_no: "",
    trading_address: "",
    mcc_code: "",
    website: "",
    note: "",
    first_name: "",
    last_name: "",
    dob: null,
    mobile: "",
    email: "",
    telephone: "",
    secondary_email: "",
    auth_fees: "",
    mmsc: 0,
    // -new-
    product_type: [],
    terminal_option: "",
    integration_availability: "",
    epos_name: "",
    website_url: "",
    epos_option: "",

    visa_credit_sr: "0.70",
    visa_credit_non_sr: "",
    visa_credit_sr_per_tr_fee: "",
    visa_credit_per_non_sr_tr_fee: "",

    master_credit_sr: "0.70",
    master_credit_non_sr: "",
    master_credit_sr_per_tr_fee: "",
    master_credit_non_sr_per_tr_fee: "",

    visa_debit_sr: "0.45",
    visa_debit_non_sr: "",
    visa_debit_sr_per_tr_fee: "",
    visa_debit_non_sr_per_tr_fee: "",

    master_debit_sr: ".48",
    master_debit_non_sr: "",
    master_debit_sr_per_tr_fee: "",
    master_debit_non_sr_per_tr_fee: "",

    visa_business_debit_sr: "1.50",
    visa_business_debit_non_sr: "",
    visa_business_debit_sr_per_tr_fee: "",
    visa_business_debit_non_sr_per_tr_fee: "",

    visa_purchasing_sr: "2.50",
    visa_purchasing_non_sr: "2.769",
    visa_purchasing_sr_per_tr_fee: "",
    visa_purchasing_non_sr_per_tr_fee: "",

    visa_corporate_sr: "2.50",
    visa_corporat_non_sr_per_tr_fee: "",
    visa_corporate_sr_per_tr_fee: "2.769",
    visa_corporate_non_sr: "",

    master_purchasing_sr: "2.50",
    master_purchasing_sr_per_tr_fee: "2.975",
    master_purchasing_non_sr: "",
    master_purchasing_non_sr_per_tr_fee: "",

    master_fleet_sr: "2.50",
    master_fleet_sr_per_tr_fee: "2.984",
    master_fleet_non_sr: "",
    master_fleet_non_sr_per_tr_fee: "",

    master_corporate_sr: "2.50",
    master_corporate_non_sr: "",
    master_corporate_sr_per_tr_fee: "2.984",
    master_corporate_non_sr_per_tr_fee: "",

    master_pre_commercial_sr: "2.50",
    master_pre_commercial_sr_per_tr_fee: "2.805",
    master_pre_commercial_non_sr: "",
    master_pre_commercial_non_sr_per_tr_fee: "",

    non_eea_visa_sr: "3.00",
    non_eea_visa_non_sr: "",
    non_eea_visa_non_sr_per_tr_fee: "",
    non_eea_visa_sr_per_tr_fee: "3.312",

    non_eea_master_sr: "3.00",
    non_eea_master_sr_per_tr_fee: "3.312",
    non_eea_master_non_sr: "",
    non_eea_master_non_sr_per_tr_fee: "",

    visa_v_pay_sr: ".45",
    visa_v_pay_non_sr_per_tr_fee: "",
    visa_v_pay_sr_per_tr_fee: "",
    visa_v_pay_non_sr: "",

    uk_maestro_sr_per_tr_fee: "",
    uk_maestro_non_sr_per_tr_fee: "",
    uk_maestro_sr: "0.48",
    uk_maestro_non_sr: "",

    international_maestro_sr: "1.500",
    international_maestro_non_sr: "",
    international_maestro_sr_per_tr_fee: "",
    international_maestro_non_sr_per_tr_fee: "",

    visa_business_credit_sr: "",
    visa_business_credit_non_sr: "",
    visa_business_credit_non_sr_per_tr_fee: "",
    visa_business_credit_sr_per_tr_fee: "",

    master_business_sr: "2.10",
    master_business_non_sr: "",
    master_business_sr_per_tr_fee: "",
    master_business_non_sr_per_tr_fee: "",

    amex_sr: "1.900",
    amex_non_sr: "2.600",
    amex_sr_per_tr_fee: "0.000",
    amex_non_sr_per_tr_fee: "0.000",

    diners_sr: "2.85",
    jcb_sr: "2.85",
    union_pay_sr: "2.85",
    high_risk_loading_rate: "0.40",

    sales_moto_perc: 0,
    sales_ftf_perc: 0,
    sales_internet_perc: 0,
    entity_code: "",

    atv: 25,
    smtv: "",
    annual_card_turnover: "",
    annual_turnover: "",
    opportunity_stage: "",
    opportunity_status: "",
    price_quote_date: new Date(),
    est_close_date: new Date(),
    bank_name: "",
    bank_sort_code: "",
    bank_account_name: "",
    bank_account_no: "",
    // lead: "",
    user: "",
    industry_type: "",
    attachments: [],

    acquiring_bank: "",

    application_type: "",
    opportunity_id: "",
    opportunity_name: "",
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
    trading_country: 74,
    home_postcode: "",
    home_address1: "",
    home_address2: "",
    home_city: "",
    home_county: "",
    home_country: 74,

    cole_from: "",
    mobile_code: 74,
    phone_code: 74,

    security_check: "N/A",
    payment_service_provider: "",
    internet_service_provider: "",

    dinners: "2.86",
    jcb: "2.85",
    union_pay: "2.85",
    charity_number: "",
  },

  aftersuccessQuote: false,
  afterSuccessQuotequalify: false,
  leadQualifyCheck: false,
  isLoadQuote: false,
};

const PriceQuoteReducer = (state = initialState, action) => {
  const newState = { ...state };
  //Leads
  switch (action.type) {
    // ---------------priceQuote------------------
    case Types.GET_PRICE_QUOTE_INPUT:
      const priceQuoteInput = { ...state.priceQuoteInput };
      priceQuoteInput[action.payload.name] = action.payload.value;
      return {
        ...state,
        priceQuoteInput: priceQuoteInput,
      };
  
    //  // -------------quote-qualify-------------------
    case Types.IS_LOAD_PRICE_QUOTE:
      return {
        ...state,
        isLoadQuote: action.payload,
      };
    case Types.AFTER_SUCCESS_QUOTE_QUALIFY:
      return {
        ...state,
        afterSuccessQuotequalify: action.payload,
      };
    case Types.SET_FALSE_QUOTE_QUALIFY:
      return {
        ...state,
        afterSuccessQuotequalify: action.payload,
        // priceQuoteInput: initialState.leadInput,
      };
    case Types.QUOTE_QUALIFY_CHECK:
      return {
        ...state,
        checkQuoteQualify: action.payload,
      };
    // case Types.SET_FALSE_QUOTE_AFTER_QUALIFY:
    //   return {
    //     ...state,
    //     checkQuoteQualify: action.payload,
    //     // priceQuoteInput: initialState.leadInput,
    //   };
    // -----------------------end qualify---------
    // -----------------------contact------------------
    case Types.UPDATE_QUOTE_OWNER_CONTACT:
      const updatePriceQuoteOwnerContactInput = { ...state.priceQuoteInput };
      const quote_owners_update = [
        ...state.priceQuoteInput.quote_owners[action.payload.index],
      ];
      const quote_owners_contact_update = [
        ...state.priceQuoteInput.quote_owners[action.payload.index]
          .quote_owner_contacts[0],
      ];
      return {
        ...state,
        priceQuoteInput: {
          ...updatePriceQuoteOwnerContactInput,
          quote_owners: [
            ...quote_owners_update,
            {
              quote_owner_contacts: [
                ...quote_owners_contact_update,
                {
                  email_address: "g@g.com",
                  zip_code: "",
                  street_line_1: "",
                  city: "",
                  county_code: "",
                  quote_owner: 0,
                  country_code: 74,
                  locality: "",
                },
              ],
              id: "",
              is_main_principal: false,
              is_beneficial_owner: false,
              is_signatory: false,
              is_responsible_party: true,
              is_director: false,
              is_owner: false,
              owner_title: "",
              owner_first_name: "",
              owner_second_name: "demo",
              owner_surname: "string",
              contact_dob: null,
              owner_email: "",
              ownership_perc: "",
              owner_phone_no: "",
              // owner_alt_phone_no: "",
              owner_fax: "",

              // owner_date_started: "",
              address_date_from: "2022-10-10",
              quote: "",
              owner_phone_code: 74,
              // owner_alt_phone_code: "",
              owner_fax_code: "",
              owner_nationality: 74,
              owner_alt_nationality: "",
              owner_id_num: null,
            },
          ],
        },
      };

    case Types.GET_PRICE_QUOTE_OWNER_CONTACT:
      const setPriceQuoteOwnerContactInput = { ...state.priceQuoteInput };
      const r_quote_owners = [...state.priceQuoteInput.quote_owners];
      r_quote_owners[action.payload.index] = {
        ...state.priceQuoteInput.quote_owners[action.payload.index],
        quote_owner_contacts: [
          {
            email_address: action.payload.name,
            zip_code: "",
            street_line_1: "sdfdsf",
            city: "",
            county_code: "",
            quote_owner: 0,
            country_code: 74,
            locality: "",
          },
        ],
        id: "",
        is_main_principal: false,
        is_beneficial_owner: false,
        is_signatory: false,
        is_responsible_party: true,
        is_director: false,
        is_owner: false,
        owner_title: "",
        owner_first_name: "",
        owner_second_name: "demo",
        owner_surname: "",
        contact_dob: null,
        owner_email: "",
        ownership_perc: "",
        owner_phone_no: "",
        // owner_alt_phone_no: "",
        owner_fax: "",

        // owner_date_started: "",
        address_date_from: "2022-10-10",
        // quote: parseInt(leadId),
        owner_phone_code: 74,
        // owner_alt_phone_code: "",
        owner_fax_code: "",
        owner_nationality: 74,
        owner_alt_nationality: "",
        owner_id_num: null,
      };

      return {
        ...state,
        priceQuoteInput: {
          ...setPriceQuoteOwnerContactInput,
          quote_owners: r_quote_owners,
        },
      };

    case Types.SET_QUOTE_OWNER_CONTACT_INPUT:
      const setQuoteOwnerContactInput = { ...state.priceQuoteInput };
      // const quote_owner = [...state.priceQuoteInput.quote_owners];
      // const quote_owners2 = [
      //   ...state.priceQuoteInput.quote_owners[action.payload.index]
      //     .quote_owner_contacts,
      // ];
      const newOwnerContact = [
        ...state.priceQuoteInput.quote_owners[action.payload.index]
          .quote_owner_contacts,
      ];

      return {
        ...state,
        priceQuoteInput: {
          ...setQuoteOwnerContactInput,

          quote_owner_contacts: [
            ...newOwnerContact,
            {
              email_address: "g@g.com",
              zip_code: "",
              street_line_1: "",
              city: "",
              county_code: "",
              quote_owner: 0,
              country_code: 0,
              locality: "",
            },
          ],
        },
      };
    //  ==================lead products================
    case Types.GET_QUOTE_EPOS_PRODUCT:
      const setEposProductInput = { ...state.priceQuoteInput };
      const epos_products = [...state.priceQuoteInput.epos_products];

      epos_products[action.payload.index] = {
        ...state.priceQuoteInput.epos_products[action.payload.index],
        [action.payload.name]: action.payload.value,
      };

      return {
        ...state,
        priceQuoteInput: {
          ...setEposProductInput,
          epos_products,
        },
      };
    case Types.SET_QUOTE_EPOS_PRODUCT:
      const setEposProduct = { ...state.priceQuoteInput };
      const newEposProduct = [...state.priceQuoteInput.epos_products];

      return {
        ...state,
        priceQuoteInput: {
          ...setEposProduct,
          epos_products: [
            ...newEposProduct,
            {
              product_type: "epos",
              epos_provider: "",
              quote: "",
              monthly_price: " 20.99",
              price: "20.99",
              service_option:"",
              integration_availability:"",
              integrated_with:"",
              is_deleted: false,
              epos_option: "",
              one_of_cost: "",
              application: "",
            },
          ],
        },
      };
    case Types.REMOVE_QUOTE_EPOS_PRODUCT:
      const removEposProduct = { ...state.priceQuoteInput };

      const updateEposProducts = state.priceQuoteInput.epos_products.filter(
        (item, index) => {
          return index !== action.payload;
        }
      );

      return {
        ...state,
        priceQuoteInput: {
          ...removEposProduct,
          epos_products: [
            ...updateEposProducts,
            // removeoptions.splice(1)
          ],
        },
      };
    //  =======
    case Types.GET_QUOTE_ECOMMERCE_PRODUCT:
      const setEcommerceProductInput = { ...state.priceQuoteInput };
      const ecommerce_products = [...state.priceQuoteInput.ecommerce_products];

      ecommerce_products[action.payload.index] = {
        ...state.priceQuoteInput.ecommerce_products[action.payload.index],
        [action.payload.name]: action.payload.value,
      };

      return {
        ...state,
        priceQuoteInput: {
          ...setEcommerceProductInput,
          ecommerce_products,
        },
      };

    case Types.SET_QUOTE_ECOMMERCE_PRODUCT:
      const setecommerceProduct = { ...state.priceQuoteInput };
      const newEcommerceProduct = [...state.priceQuoteInput.ecommerce_products];

      return {
        ...state,
        priceQuoteInput: {
          ...setecommerceProduct,
          ecommerce_products: [
            ...newEcommerceProduct,
            {
              product_type: "",
              quote: "",
              is_deleted: false,
              website_url: "",
              getway_provider: "",
              application: "",
            },
          ],
        },
      };
    case Types.REMOVE_QUOTE_ECOMMERCE_PRODUCT:
      const removeEcommerceProduct = { ...state.priceQuoteInput };

      const updateEcommerceProducts =
        state.priceQuoteInput.ecommerce_products.filter((item, index) => {
          return index !== action.payload;
        });

      return {
        ...state,
        priceQuoteInput: {
          ...removeEcommerceProduct,
          ecommerce_products: [
            ...updateEcommerceProducts,
            // removeoptions.splice(1)
          ],
        },
      };
    //  ==================lead products================

    case Types.GET_QUOTE_CARD_TERMINAL_PRODUCT:
      const setTerminalProductInput = { ...state.priceQuoteInput };
      const terminal_products = [...state.priceQuoteInput.terminal_products];

      terminal_products[action.payload.index] = {
        ...state.priceQuoteInput.terminal_products[action.payload.index],
        [action.payload.name]: action.payload.value,
      };

      return {
        ...state,
        priceQuoteInput: {
          ...setTerminalProductInput,
          terminal_products,
        },
      };

    case Types.SET_QUOTE_CARD_TERMINAL_PRODUCT:
      const setTerminalProduct = { ...state.priceQuoteInput };
      const newTerminalProduct = [...state.priceQuoteInput.terminal_products];

      return {
        ...state,
        priceQuoteInput: {
          ...setTerminalProduct,
          terminal_products: [
            ...newTerminalProduct,
            {
              connection_type: "18",
              product_type: "card_terminal",
              terminal_model: "",
              application: "",
              qty: 1,
              country: 74,
              product: "",
              quote: "",
              price: "20.99",
              monthly_price: "20.99",
              ptsave_oldcardprovider:"",
              product_term: 18,
              is_deleted: false,
              provider: "",
              epos_provider: "",
              epos_option: "",
              epos_name: "",
              terminal_option: "",
              integration_availability: "",
              has_old_card_provider: false,
              previous_acquirer: "",
            },
          ],
        },
      };
    case Types.REMOVE_QUOTE_CARD_TERMINAL_PRODUCT:
      const removeTerminalProduct = { ...state.priceQuoteInput };

      const updateTerminalProducts =
        state.priceQuoteInput.terminal_products.filter((item, index) => {
          return index !== action.payload;
        });

      return {
        ...state,
        priceQuoteInput: {
          ...removeTerminalProduct,
          terminal_products: [
            ...updateTerminalProducts,
            // removeoptions.splice(1)
          ],
        },
      };
    case Types.AFTER_SUCCESS_PRICE_QUOTE:
      return {
        ...state,
        aftersuccessQuote: action.payload,
      };
    case Types.SET_PRICE_QUOTE_FALSE:
      return {
        ...state,
        aftersuccessQuote: action.payload,
        priceQuoteInput: initialState.priceQuoteInput,
        checkQuoteQualify: action.payload,
        afterSuccessQuotequalify: action.payload,
      };

    case Types.SET_PRICEQUOTE_UPDATED:
      const setPriceQuoteInput = { ...state.priceQuoteInput };
      setPriceQuoteInput.slug = action.payload.slug;
      setPriceQuoteInput.quote_owners = action.payload.quote_owners || [];
      setPriceQuoteInput.quote_owners.quote_owner_contacts =
        action.payload.quote_owners.quote_owner_contacts || [];
      // setPriceQuoteInput.source = action.payload.source;
      setPriceQuoteInput.quote_docs = action.payload.quote_docs || [];
      setPriceQuoteInput.quote_products = action.payload.quote_products || [];
      setPriceQuoteInput.card_machine_service =
        action.payload.card_machine_service;
      setPriceQuoteInput.site_and_trading_address_same =
        action.payload.site_and_trading_address_same;
      setPriceQuoteInput.slug = action.payload.slug;
      setPriceQuoteInput.ecom_service = action.payload.ecom_service;
      setPriceQuoteInput.epos_service = action.payload.epos_service;
      setPriceQuoteInput.charity_number = action.payload.charity_number;
      setPriceQuoteInput.security_check = action.payload.security_check;
      setPriceQuoteInput.lead_source = action.payload.lead_source;
      setPriceQuoteInput.lead = action.payload.lead;
      setPriceQuoteInput.client_id = action.payload.client_id;
      setPriceQuoteInput.legal_type = action.payload.legal_type;
      setPriceQuoteInput.internet_service_provider =
        action.payload.internet_service_provider;
      setPriceQuoteInput.payment_service_provider =
        action.payload.payment_service_provider;
      setPriceQuoteInput.existing_mid = action.payload.existing_mid;
      setPriceQuoteInput.lead_stage = action.payload.lead_stage;
      setPriceQuoteInput.lead_status = action.payload.lead_status;
      setPriceQuoteInput.sales_partner_name = action.payload.sales_partner_name;
      setPriceQuoteInput.sales_partner = action.payload.sales_partner;
      setPriceQuoteInput.partner_manager = action.payload.partner_manager;
      setPriceQuoteInput.partner_manager_name =
        action.payload.partner_manager_name;
      setPriceQuoteInput.callback_date = action.payload.callback_date;
      setPriceQuoteInput.legal_name = action.payload.legal_name;
      setPriceQuoteInput.trading_name = action.payload.trading_name;
      setPriceQuoteInput.current_ownership_since =
        action.payload.current_ownership_since;
      setPriceQuoteInput.company_house_no = action.payload.company_house_no;
      setPriceQuoteInput.trading_address = action.payload.trading_address;
      setPriceQuoteInput.mcc_code = action.payload.mcc_code;
      setPriceQuoteInput.website = action.payload.website;
      setPriceQuoteInput.note = action.payload.note;
      setPriceQuoteInput.first_name = action.payload.first_name;
      setPriceQuoteInput.last_name = action.payload.last_name;
      setPriceQuoteInput.dob = action.payload.dob;
      setPriceQuoteInput.mobile = action.payload.mobile;
      setPriceQuoteInput.email = action.payload.email;
      setPriceQuoteInput.telephone = action.payload.telephone;
      setPriceQuoteInput.secondary_email = action.payload.secondary_email;
      setPriceQuoteInput.incorporated_on = action.payload.incorporated_on;
      setPriceQuoteInput.legal_postcode = action.payload.legal_postcode;
      setPriceQuoteInput.legal_address1 = action.payload.legal_address1;
      setPriceQuoteInput.legal_address2 = action.payload.legal_address2;
      setPriceQuoteInput.legal_city = action.payload.legal_city;
      setPriceQuoteInput.legal_county = action.payload.legal_county;
      setPriceQuoteInput.legal_country = action.payload.legal_country;

      setPriceQuoteInput.trading_postcode = action.payload.trading_postcode;
      setPriceQuoteInput.trading_city = action.payload.trading_city;
      setPriceQuoteInput.trading_address1 = action.payload.trading_address1;
      setPriceQuoteInput.trading_address2 = action.payload.trading_address2;
      setPriceQuoteInput.trading_county = action.payload.trading_county;
      setPriceQuoteInput.trading_country = action.payload.trading_country;

      setPriceQuoteInput.industry_type = action.payload.industry_type;
      setPriceQuoteInput.user = action.payload.user;
      setPriceQuoteInput.id = action.payload.id;

      setPriceQuoteInput.home_postcode = action.payload.home_postcode;
      setPriceQuoteInput.home_address1 = action.payload.home_address1;
      setPriceQuoteInput.home_address2 = action.payload.home_address2;
      setPriceQuoteInput.home_city = action.payload.home_city;
      setPriceQuoteInput.home_county = action.payload.home_county;
      setPriceQuoteInput.home_country = action.payload.home_country;

      setPriceQuoteInput.visa_debit_sr = action.payload.visa_debit_sr;
      setPriceQuoteInput.visa_debit_non_sr = action.payload.visa_debit_non_sr;
      setPriceQuoteInput.visa_debit_sr_per_tr_fee =
        action.payload.visa_debit_sr_per_tr_fee;
      setPriceQuoteInput.visa_debit_non_sr_per_tr_fee =
        action.payload.visa_debit_non_sr_per_tr_fee;

      setPriceQuoteInput.master_debit_sr = action.payload.master_debit_sr;
      setPriceQuoteInput.master_debit_non_sr =
        action.payload.master_debit_non_sr;
      setPriceQuoteInput.master_debit_sr_per_tr_fee =
        action.payload.master_debit_sr_per_tr_fee;
      setPriceQuoteInput.master_debit_non_sr_per_tr_fee =
        action.payload.master_debit_non_sr_per_tr_fee;

      setPriceQuoteInput.master_credit_sr = action.payload.master_credit_sr;
      setPriceQuoteInput.master_credit_non_sr =
        action.payload.master_credit_non_sr;
      setPriceQuoteInput.master_credit_sr_per_tr_fee =
        action.payload.master_credit_sr_per_tr_fee;
      setPriceQuoteInput.master_credit_non_sr_per_tr_fee =
        action.payload.master_credit_non_sr_per_tr_fee;

      setPriceQuoteInput.visa_business_debit_sr =
        action.payload.visa_business_debit_sr;
      setPriceQuoteInput.visa_business_debit_non_sr =
        action.payload.visa_business_debit_non_sr;
      setPriceQuoteInput.visa_business_debit_sr_per_tr_fee =
        action.payload.visa_business_debit_sr_per_tr_fee;
      setPriceQuoteInput.visa_business_debit_non_sr_per_tr_fee =
        action.payload.visa_business_debit_non_sr_per_tr_fee;

      setPriceQuoteInput.visa_credit_sr = action.payload.visa_credit_sr;
      setPriceQuoteInput.visa_credit_non_sr = action.payload.visa_credit_non_sr;
      setPriceQuoteInput.visa_credit_sr_per_tr_fee =
        action.payload.visa_credit_sr_per_tr_fee;
      setPriceQuoteInput.visa_credit_per_non_sr_tr_fee =
        action.payload.visa_credit_per_non_sr_tr_fee;

      setPriceQuoteInput.visa_purchasing_sr = action.payload.visa_purchasing_sr;
      setPriceQuoteInput.visa_purchasing_non_sr =
        action.payload.visa_purchasing_non_sr;
      setPriceQuoteInput.visa_purchasing_sr_per_tr_fee =
        action.payload.visa_purchasing_sr_per_tr_fee;
      setPriceQuoteInput.visa_purchasing_non_sr_per_tr_fee =
        action.payload.visa_purchasing_non_sr_per_tr_fee;

      setPriceQuoteInput.visa_corporate_sr = action.payload.visa_corporate_sr;
      setPriceQuoteInput.visa_corporate_sr_per_tr_fee =
        action.payload.visa_corporate_sr_per_tr_fee;
      setPriceQuoteInput.visa_corporate_non_sr =
        action.payload.visa_corporate_non_sr;
      setPriceQuoteInput.visa_corporat_non_sr_per_tr_fee =
        action.payload.visa_corporat_non_sr_per_tr_fee;

      setPriceQuoteInput.master_purchasing_sr =
        action.payload.master_purchasing_sr;
      setPriceQuoteInput.master_purchasing_sr_per_tr_fee =
        action.payload.master_purchasing_sr_per_tr_fee;
      setPriceQuoteInput.master_purchasing_non_sr =
        action.payload.master_purchasing_non_sr;
      setPriceQuoteInput.master_purchasing_non_sr_per_tr_fee =
        action.payload.master_purchasing_non_sr_per_tr_fee;

      setPriceQuoteInput.master_fleet_sr = action.payload.master_fleet_sr;
      setPriceQuoteInput.master_fleet_sr_per_tr_fee =
        action.payload.master_fleet_sr_per_tr_fee;

      setPriceQuoteInput.master_fleet_non_sr =
        action.payload.master_fleet_non_sr;
      setPriceQuoteInput.master_fleet_non_sr_per_tr_fee =
        action.payload.master_fleet_non_sr_per_tr_fee;

      setPriceQuoteInput.master_corporate_sr =
        action.payload.master_corporate_sr;
      setPriceQuoteInput.master_corporate_non_sr =
        action.payload.master_corporate_non_sr;
      setPriceQuoteInput.master_corporate_sr_per_tr_fee =
        action.payload.master_corporate_sr_per_tr_fee;
      setPriceQuoteInput.master_corporate_non_sr_per_tr_fee =
        action.payload.master_corporate_non_sr_per_tr_fee;

      setPriceQuoteInput.master_pre_commercial_sr =
        action.payload.master_pre_commercial_sr;
      setPriceQuoteInput.master_pre_commercial_sr_per_tr_fee =
        action.payload.master_pre_commercial_sr_per_tr_fee;
      setPriceQuoteInput.master_pre_commercial_non_sr =
        action.payload.master_pre_commercial_non_sr;
      setPriceQuoteInput.master_pre_commercial_non_sr_per_tr_fee =
        action.payload.master_pre_commercial_non_sr_per_tr_fee;

      setPriceQuoteInput.non_eea_visa_sr = action.payload.non_eea_visa_sr;
      setPriceQuoteInput.non_eea_visa_sr_per_tr_fee =
        action.payload.non_eea_visa_sr_per_tr_fee;

      setPriceQuoteInput.non_eea_visa_non_sr =
        action.payload.non_eea_visa_non_sr;
      setPriceQuoteInput.non_eea_visa_non_sr_per_tr_fee =
        action.payload.non_eea_visa_non_sr_per_tr_fee;

      setPriceQuoteInput.non_eea_master_sr = action.payload.non_eea_master_sr;
      setPriceQuoteInput.non_eea_master_sr_per_tr_fee =
        action.payload.non_eea_master_sr_per_tr_fee;
      setPriceQuoteInput.non_eea_master_non_sr =
        action.payload.non_eea_master_non_sr;
      setPriceQuoteInput.non_eea_master_non_sr_per_tr_fee =
        action.payload.non_eea_master_non_sr_per_tr_fee;

      setPriceQuoteInput.diners_sr = action.payload.diners_sr;
      setPriceQuoteInput.jcb_sr = action.payload.jcb_sr;
      setPriceQuoteInput.union_pay_sr = action.payload.union_pay_sr;
      setPriceQuoteInput.high_risk_loading_rate =
        action.payload.high_risk_loading_rate;

      setPriceQuoteInput.master_business_sr = action.payload.master_business_sr;
      setPriceQuoteInput.master_business_non_sr =
        action.payload.master_business_non_sr;
      setPriceQuoteInput.master_business_sr_per_tr_fee =
        action.payload.master_business_sr_per_tr_fee;
      setPriceQuoteInput.master_business_non_sr_per_tr_fee =
        action.payload.master_business_non_sr_per_tr_fee;

      setPriceQuoteInput.visa_business_credit_sr =
        action.payload.visa_business_credit_sr;
      setPriceQuoteInput.visa_business_credit_non_sr =
        action.payload.visa_business_credit_non_sr;
      setPriceQuoteInput.visa_business_credit_sr_per_tr_fee =
        action.payload.visa_business_credit_sr_per_tr_fee;
      setPriceQuoteInput.visa_business_credit_non_sr_per_tr_fee =
        action.payload.visa_business_credit_non_sr_per_tr_fee;

      setPriceQuoteInput.visa_v_pay_sr = action.payload.visa_v_pay_sr;
      setPriceQuoteInput.visa_v_pay_non_sr = action.payload.visa_v_pay_non_sr;
      setPriceQuoteInput.visa_v_pay_sr_per_tr_fee =
        action.payload.visa_v_pay_sr_per_tr_fee;
      setPriceQuoteInput.visa_v_pay_non_sr_per_tr_fee =
        action.payload.visa_v_pay_non_sr_per_tr_fee;

      setPriceQuoteInput.uk_maestro_sr_per_tr_fee =
        action.payload.uk_maestro_sr_per_tr_fee;
      setPriceQuoteInput.uk_maestro_sr = action.payload.uk_maestro_sr;
      setPriceQuoteInput.uk_maestro_non_sr = action.payload.uk_maestro_non_sr;
      setPriceQuoteInput.uk_maestro_non_sr_per_tr_fee =
        action.payload.uk_maestro_non_sr_per_tr_fee;

      setPriceQuoteInput.international_maestro_sr =
        action.payload.international_maestro_sr;
      setPriceQuoteInput.international_maestro_non_sr =
        action.payload.international_maestro_non_sr;
      setPriceQuoteInput.international_maestro_sr_per_tr_fee =
        action.payload.international_maestro_sr_per_tr_fee;
      setPriceQuoteInput.international_maestro_non_sr_per_tr_fee =
        action.payload.international_maestro_non_sr_per_tr_fee;

      setPriceQuoteInput.mmsc = action.payload.mmsc;
      setPriceQuoteInput.auth_fees = action.payload.auth_fees;

      setPriceQuoteInput.acquiring_bank = action.payload.acquiring_bank;
      setPriceQuoteInput.annual_card_turnover =
        action.payload.annual_card_turnover;
      setPriceQuoteInput.annual_turnover = action.payload.annual_turnover;
      setPriceQuoteInput.atv = action.payload.atv;
      setPriceQuoteInput.smtv = action.payload.smtv;
      setPriceQuoteInput.bank_name = action.payload.bank_name;
      setPriceQuoteInput.bank_sort_code = action.payload.bank_sort_code;

      setPriceQuoteInput.opportunity_name = action.payload.opportunity_name;
      setPriceQuoteInput.opportunity_stage = action.payload.opportunity_stage;
      setPriceQuoteInput.opportunity_id = action.payload.opportunity_id;
      // setPriceQuoteInput.source = action.payload.source;
      setPriceQuoteInput.application_type = action.payload.application_type;
      setPriceQuoteInput.price_quote_date = action.payload.price_quote_date;

      setPriceQuoteInput.est_close_date = action.payload.est_close_date;
      setPriceQuoteInput.opportunity_status = action.payload.opportunity_status;
      setPriceQuoteInput.phone_code = action.payload.phone_code;
      setPriceQuoteInput.mobile_code = action.payload.mobile_code;
      setPriceQuoteInput.bank_account_name = action.payload.bank_account_name;
      setPriceQuoteInput.bank_account_no = action.payload.bank_account_no;

      setPriceQuoteInput.security_other_check =
        action.payload.security_other_check;
      setPriceQuoteInput.security_max_amt_check =
        action.payload.security_max_amt_check;
      setPriceQuoteInput.security_ip_geo_check =
        action.payload.security_ip_geo_check;
      setPriceQuoteInput.security_velocity_check =
        action.payload.security_velocity_check;
      setPriceQuoteInput.security_bin_check = action.payload.security_bin_check;
      setPriceQuoteInput.payment_service_provider =
        action.payload.payment_service_provider;
      setPriceQuoteInput.internet_service_provider =
        action.payload.internet_service_provider;
      return {
        ...state,
        priceQuoteInput: setPriceQuoteInput,
      };

    // ----------
    default:
      break;
  }
  return newState;
};

export default PriceQuoteReducer;
