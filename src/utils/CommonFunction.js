import { utcToZonedTime } from "date-fns-tz";
import { showToast } from "./ToastHelper";
import { dateTimeZone } from "src/views/accounts/NewApplication/_redux/action/ApplicationAction";
export const getTimeFormat = (data) => {
  const date = new Date(data);
  const timezone = "Europe/London"; // Replace this with the correct timezone for your data

  // Convert the date to the specified timezone
  const zonedDate = utcToZonedTime(date, timezone);

  // Extract day, month, year, and time
  const day = zonedDate.getDate().toString().padStart(2, "0");
  const month = (zonedDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed, so adding 1
  const year = zonedDate.getFullYear();
  const time =
    zonedDate.getHours().toString().padStart(2, "0") +
    ":" +
    zonedDate.getMinutes().toString().padStart(2, "0");

  const formattedDate = `${day}-${month}-${year}`;
  const formattedTime = time;

  return `${formattedDate} , ${formattedTime}`;
};

export const lazyRetry = function (componentImport) {
  return new Promise((resolve, reject) => {
    // try to import the component
    componentImport()
      .then((component) => {
        resolve(component);
      })
      .catch((error) => {
        alert("error");
        reject(error); // there was an error
      });
  });
};

export const getChartData2 = (data, dateOf, turnover) => {
  const currentYear = new Date().getUTCFullYear();
  const filteredArray = data?.filter((obj) => {
    const createdAtYear = new Date(obj?.dateOf).getUTCFullYear();
    return createdAtYear === currentYear;
  });
  const commissionSumArray = Array(12).fill(0);

  filteredArray.forEach((obj) => {
    const createdAt = new Date(obj?.dateOf);
    const monthIndex = createdAt.getUTCMonth();
    const commission = Number(obj?.turnover?.split("£")[1]) || 0;
    commissionSumArray[monthIndex] += commission;
  });

  return commissionSumArray;
};

export const onBoarddateFormat = (inputDate) => {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Month is zero-based, so adding 1
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedDate = `${day}/${month}/${year} at ${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
  return formattedDate;
};
export const applicationValidation = (
  data,
  file,
  handleSigingRequest,
  not_submit
) => {
  console.log("data12", data);
  delete data.created_at;
  data.phone_code = 74;
  data.mobile_code = 74;
  data.sales_moto_perc = parseInt(data.sales_moto_perc);
  data.sales_ftf_perc = parseInt(data.sales_ftf_perc);
  data.sales_internet_perc = parseInt(data.sales_internet_perc);
  var expression =
    /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  // var regex = new RegExp(expression);
  let regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const requiredDocumentTypes = [
    "PROOF_OF_ID",
    "PROOF_OF_BUSINESS",
    "PROOF_OF_BANK",
    "PROOF_OF_ADDRESS",
  ];

  const documentTypes = [];
  if (data.appliation_price_quote) {
    data.appliation_price_quote = dateTimeZone(data.appliation_price_quote);
  }
  if (data.callback_date) {
    data.callback_date = dateTimeZone(data.callback_date);
  }

  if (data.est_close_date) {
    data.est_close_date = dateTimeZone(data.est_close_date);
  }
  if (data.incorporated_on) {
    data.incorporated_on = dateTimeZone(data.incorporated_on);
  }
  if (data.current_ownership_since) {
    data.current_ownership_since = dateTimeZone(data.current_ownership_since);
  }
  if (data.dob) {
    data.dob = dateTimeZone(data.dob);
  }
  if (data.s_business_start_date) {
    data.s_business_start_date = dateTimeZone(data.s_business_start_date);
  }

  if (data.s_individual_start_date) {
    data.s_individual_start_date = dateTimeZone(data.s_individual_start_date);
  }
  if (data.s_individual_date) {
    data.s_individual_date = dateTimeZone(data.s_individual_date);
  }

  for (const doc of data.business_owners) {
    if (doc.owner_issue_date) {
      doc.owner_issue_date = dateTimeZone(doc.owner_issue_date);
    }
    if (doc.owner_expiry_date) {
      doc.owner_expiry_date = dateTimeZone(doc.owner_expiry_date);
      // doc.owner_expiry_date = fomDate;
    }
    if (doc.contact_dob) {
      doc.contact_dob = dateTimeZone(doc.contact_dob);
    }
  }
  var validation = false;

  var Sum = 0;
  for (let index = 0; index < data.business_owners.length; index++) {
    if (data.business_owners[index].is_deleted === false) {
      Sum += parseInt(data.business_owners[index].ownership_perc);
      data.business_owners[index].owner_phone_code = 74;
    }
  }

  if (data.legal_type !== "PART" && !data.business_owners[0].owner_phone_no) {
    showToast("error", "1st owner phone no shouldn't be empty");
    validation = true;
  }
  if (
    // data.legal_type !== "PART" &&
    data.business_owners[0].is_main_principal === false
  ) {
    showToast("error", "1st owner is main principle should be yes");
    validation = true;
  }

  for (const business_owner of data.business_owners) {
    business_owner.owner_second_name = business_owner.owner_surname;
    business_owner.business_owner_contacts[0].email_address =
      business_owner.owner_email;
    if (business_owner.is_deleted === false) {
      if (!business_owner?.owner_first_name) {
        showToast("error", "Owner Frist name shouldn't be empty");
        validation = true;
      }
      if (!business_owner?.owner_title) {
        showToast("error", "Owner Title name shouldn't be empty");
        validation = true;
      }

      if (!business_owner?.owner_issue_date) {
        showToast("error", "Owner Issue date shouldn't be empty");
        validation = true;
      }
      if (!business_owner?.owner_expiry_date) {
        showToast("error", "Owner Expire date shouldn't be empty");
        validation = true;
      }
      if (
        (new Date(business_owner.owner_expiry_date).getFullYear() -
          new Date().getFullYear()) *
          12 +
          (new Date(business_owner.owner_expiry_date).getMonth() -
            new Date().getMonth()) <
        3
      ) {
        showToast(
          "error",
          "The minimum gap between current date and expiry date should be 3 months."
        );
        validation = true;
      }
      if (!business_owner?.owner_id_num) {
        showToast("error", "Owner ID number shouldn't be empty");
        validation = true;
      }

      if (data.legal_type === "PART" && !business_owner?.owner_email) {
        showToast("error", "Owner Email shouldn't be empty");
        validation = true;
      }

      if (
        data.legal_type === "PART" &&
        !parseInt(business_owner.owner_phone_no)
      ) {
        showToast("error", "Owner Phone number shouldn't be empty");
        validation = true;
      }
      // if (
      //   data.legal_type === "PART" &&
      //   business_owner.owner_phone_no.length !== 10
      // ) {
      //   showToast("error", "Invalid Owner phone number");
      //   validation = true;
      // }
      if (data.legal_type === "ST") {
        business_owner.is_director = false;
      }
      if (!business_owner.owner_surname) {
        showToast("error", "Owner Last name shouldn't be empty");
        validation = true;
      }
      if (!business_owner.contact_dob) {
        showToast("error", "Owner Date of birth shouldn't be empty");
        validation = true;
      }
      if (
        business_owner.owner_nationality === "" ||
        business_owner.owner_nationality === null
      ) {
        showToast("error", "Owner Nationality shouldn't be empty");
        validation = true;
      }

      if (
        new Date().getFullYear() -
          new Date(business_owner.contact_dob).getFullYear() <
        10
      ) {
        showToast("error", "Invalid owner DOB");
        validation = true;
      }
      if (
        data.legal_type === "LLP" ||
        data.legal_type === "L" ||
        data.legal_type === "PL"
      ) {
        if (
          parseInt(business_owner.ownership_perc) > 100 &&
          parseInt(business_owner.ownership_perc) < 10
        ) {
          showToast(
            "error",
            "Ownership Percentage must less than 100 and greater than 10"
          );
          validation = true;
        }
      }
      if (!business_owner.business_owner_contacts[0].zip_code) {
        showToast("error", "Owner Zip code should not be empty");
        validation = true;
      }
      if (
        business_owner.business_owner_contacts[0].country_code === "" ||
        business_owner.business_owner_contacts[0].country_code === null
      ) {
        showToast("error", "Owner Country should not be empty");
        validation = true;
      }

      if (business_owner.business_owner_contacts[0].street_line_1) {
        business_owner.business_owner_contacts[0].street_line_1 =
          business_owner.business_owner_contacts[0].street_line_1.toUpperCase();
      }
      if (!business_owner.business_owner_contacts[0].street_line_1) {
        showToast("error", "Owner address1 should not be empty");
        validation = true;
      }
      if (!business_owner.business_owner_contacts[0].city) {
        showToast("error", "Owner town/city should not be empty");
        validation = true;
      }
      const containsContactSpecialCharacters = /[!@#*$%^']+/.test(
        business_owner.business_owner_contacts[0].city
      );

      if (containsContactSpecialCharacters) {
        showToast(
          "error",
          "Coontact city cannot contain special characters like -, *, %, ', !, @, #, etc."
        );
        validation = true;
      }
      if (business_owner.business_owner_contacts[0].city) {
        business_owner.business_owner_contacts[0].city =
          business_owner.business_owner_contacts[0].city.toUpperCase();
      }
      if (business_owner.business_owner_contacts[0].zip_code.length < 5) {
        showToast(
          "error",
          "Please enter at least 5 digit  zip code in owner contact"
        );
        validation = true;
      }
    }

    //  if (!business_owner.business_owner_contacts[0].country_code) {
    //   showToast("error", "Owner Country  shouldn't be empty");
    //  validation = true;
    // }
  }
  for (const product of data.application_products) {
    if (!product.application) delete product.application;
    if (product.getway_provider === "" || product.getway_provider === null)
      delete product.getway_provider;
    // if (!product.one_of_cost) delete product.one_of_cost;
    if (
      data.card_machine_service === true &&
      product.product_type === "card_terminal" &&
      (product?.provider === null || product?.provider === "")
    ) {
      showToast("error", "Terminal provider shouldn't be empty");
      validation = true;
    }
    if (
      data.card_machine_service === true &&
      product.product_type === "card_terminal" &&
      (product?.terminal_option === null || product?.terminal_option === "")
    ) {
      showToast("error", "Terminal option shouldn't be empty");
      validation = true;
    }
    if (
      data.card_machine_service === true &&
      product.product_type === "card_terminal" &&
      (product?.integration_availability === null ||
        product?.integration_availability === "")
    ) {
      showToast("error", "Integration availablity  shouldn't be empty");
      validation = true;
    }
    if (
      data.card_machine_service === true &&
      product.product_type === "card_terminal" &&
      product?.integration_availability === "INTEGRATED" &&
      (product?.epos_name === "" || product?.epos_name === null)
    ) {
      showToast("error", "Epos name  shouldn't be empty");
      validation = true;
    }
    if (
      data.card_machine_service === true &&
      product.product_type === "card_terminal" &&
      (product?.product === "" || product?.product === null)
    ) {
      showToast("error", "Product  shouldn't be empty");
      validation = true;
    }
    // ====ecom product===========
    // if (data.ecom_service === true &&  (product?.product_type === null || product?.product_type === "" )) {
    //   showToast("error", "Terminal provider shouldn't be empty");
    //   validation = true;
    // }
    if (
      data.ecom_service === true &&
      (product.product_type === "ecom" ||
        product?.product_type === "VT" ||
        product?.product_type === "ecom_VT") &&
      (product?.getway_provider === "" || product?.getway_provider === null)
    ) {
      showToast("error", "Getway provider shouldn't be empty");
      validation = true;
    }
    if (
      data.ecom_service === true &&
      (product.product_type === "ecom" ||
        // product?.product_type === "VT" ||
        product?.product_type === "ecom_VT") &&
      (product?.website_url === "" || product?.website_url === null)
    ) {
      showToast("error", "Website url  shouldn't be empty");
      validation = true;
    }

    // =======epos=============
    if (
      data.epos_service === true &&
      product.product_type === "epos" &&
      (product?.epos_option === null || product?.epos_option === "")
    ) {
      showToast("error", "Epos option shouldn't be empty");
      validation = true;
    }
    if (
      data.epos_service === true &&
      product.product_type === "epos" &&
      (product?.epos_provider === null || product?.epos_provider === "")
    ) {
      showToast("error", "Epos provider shouldn't be empty");
      validation = true;
    }
    if (
      data.epos_service === true &&
      product.product_type === "epos" &&
      product.integration_availability === "INTEGRATED" &&
      (product?.integrated_with === null || product?.integrated_with === "")
    ) {
      showToast("error", "Integrated with shouldn't be empty");
      validation = true;
    }
    if (
      data.epos_service === true &&
      product.product_type === "epos" &&
      (product?.price === null || product?.price === "")
    ) {
      showToast("error", "Monthly shouldn't be empty");
      validation = true;
    }
    if (
      data.epos_service === true &&
      product.product_type === "epos" &&
      (product?.product_term === null || product?.product_term === "")
    ) {
      showToast("error", "Contact length be empty");
      validation = true;
    }
  }

  for (let doc of data.application_docs) {
    if (!doc.is_deleted && !documentTypes.includes(doc.category)) {
      documentTypes.push(doc.category);
    }
  }
  if (file !== "doc") {
    if (
      documentTypes.length < 4 ||
      !requiredDocumentTypes.every((type) => documentTypes.includes(type))
    ) {
      showToast(
        "error",
        "Add at least 4 types of documents (PROOF OF ID, PROOF OF ADDRESS, PROOF OF BANK, & PROOF OF BUSINESS)."
      );
      validation = true;
    }
  }
  let applicationTypeCount = 0;
  for (const document of data.application_docs) {
    if (document.is_deleted === false) {
      // Additional check for "application type"
      if (document.category === "APPLICATION_DOCUMENTS") {
        applicationTypeCount += 1;

        if (applicationTypeCount > 1 || document.document.length > 1) {
          showToast(
            "error",
            "Application type and application Document  should appear only once."
          );
          return; // Stop further processing if an error is found
        }
      }

      if (document.document.length === 0) {
        showToast("error", `${document.category + " file shouldn't be empty"}`);
        validation = true;
      }
      if (!document.category) {
        showToast("error", "File name shouldn't be empty");
        validation = true;
      }
      if (!document.doc_type) {
        showToast("error", "Document Type shouldn't be empty");
        validation = true;
      }

      if (document.category === "PROOF_OF_ID" && !document?.issuer_id) {
        showToast("error", "Document owner issuer ID shouldn't be empty");
        validation = true;
      }
      if (
        document.category === "PROOF_OF_ID" &&
        (document?.doc_contact === "" || document?.doc_contact === null)
      ) {
        showToast("error", "Contact name shouldn't be empty");
        validation = true;
      }
    }
  }
  if (!data.lead_source) {
    showToast("error", "Lead source shouldn't be empty");
    validation = true;
  }
  if (!data.legal_name) {
    showToast("error", "Legal name shouldn't be empty");
    validation = true;
  }
  if (!data.application_type) {
    showToast("error", "Application type shouldn't be empty");
    validation = true;
  }

  if (!data.legal_type) {
    showToast("error", "Legal type shouldn't be empty");
    validation = true;
  }
  if (
    data.legal_type === "LLP" ||
    data.legal_type === "L" ||
    data.legal_type === "PL"
  ) {
    if (!data.company_house_no) {
      showToast("error", "Company house number shouldn't be empty");
      validation = true;
    }
  }

  if (data.vat_enabled === 0) {
    if (!data.tax_id) {
      showToast("error", "Vat number shouldn't be empty");
      validation = true;
    }
  }
  if (!data.trading_name) {
    showToast("error", "Trading name shouldn't be empty");
    validation = true;
  }
  if (data.industry_type === "" || data.industry_type === null) {
    showToast("error", "Industry type shouldn't be empty");
    validation = true;
  }
  if (data.mcc_code === "" || data.mcc_code === null) {
    showToast("error", "Mcc code shouldn't be empty");
    validation = true;
  }
  if (!data.current_ownership_since) {
    showToast("error", "Date of ownership shouldn't be empty");
    validation = true;
  }

  if (
    !regEmail.test(data.secondary_email) &&
    data.secondary_email !== "" &&
    data.secondary_email !== null
  ) {
    showToast("error", "Enter a vaild secondery email ");
    validation = true;
  }
  //  if (data.mobile.substring(0, 1) === "0" || data.mobile.length !== 10) {
  if (!data.desc_of_service) {
    showToast("error", "Description of goods  shouldn't be empty !");
    validation = true;
  }
  if (data.desc_of_service) {
    data.desc_of_service = data.desc_of_service?.toUpperCase();
  }
  if (!data.mobile) {
    showToast("error", "Mobile number shouldn't be empty !");
    validation = true;
  }
  if (!data.s_individual_sales_representatives) {
    showToast("error", "Sales representative name shouldn't be empty !");
    validation = true;
  }
  if (!data.sales_partner) {
    showToast("error", "Sales partner name shouldn't be empty !");
    validation = true;
  }
  if (!data.s_name_of_individual) {
    showToast(
      "error",
      "Name of the individual met at the premises shouldn't be empty !"
    );
    validation = true;
  }
  if (!data.s_individual_start_date) {
    showToast("error", "Date of the site visit  shouldn't be empty !");
    validation = true;
  }
  if (!data.s_individual_date) {
    showToast("error", "Individual date shouldn't be empty !");
    validation = true;
  }

  if (
    parseFloat(data.annual_turnover) < parseFloat(data.annual_card_turnover)
  ) {
    showToast(
      "error",
      "Annual turnover must be greater  than annual card turnover !"
    );
    validation = true;
  }
  //  else if (!data.store_number) {
  //   showToast("error", "Store number shouldn't be empty !");
  //  validation = true;
  // }
  if (!data.bank_account_no) {
    showToast("error", "Bank account shouldn't be empty !");
    validation = true;
  }
  if (data.bank_account_no && data.bank_account_no.length !== 8) {
    showToast("error", "Please enter 8 digit account number !");
    validation = true;
  }
  if (!data.bank_sort_code) {
    showToast("error", "Sort code shouldn't be empty !");
    validation = true;
  }
  if (data.bank_sort_code && data.bank_sort_code.length !== 6) {
    showToast("error", "Please enter 6 digit sort code !");
    validation = true;
  }
  if (!data.legal_postcode) {
    showToast("error", "Legal post code shouldn't be empty !");
    validation = true;
  }
  if (data.legal_postcode.length < 5) {
    showToast("error", "Please enter at least 5 digit legal post code !");
    validation = true;
  }
  if (data.legal_country === "" || data.legal_country === null) {
    showToast("error", "Legal country shouldn't be empty !");
    validation = true;
  }
  if (data.legal_address1 === "" || data.legal_address1 === null) {
    showToast("error", "Legal country shouldn't be empty !");
    validation = true;
  }
  if (data.legal_city === "" || data.legal_city === null) {
    showToast("error", "Legal country shouldn't be empty !");
    validation = true;
  }
  const containsSpecialCharacters = /[!@#*$%^'-]+/.test(data.legal_city);

  if (containsSpecialCharacters) {
    showToast(
      "error",
      "Legal city cannot contain special characters like -, *, %, ', !, @, #, etc."
    );
    validation = true;
  }

  // Continue with your code if legal_city is valid

  if (!data.trading_postcode) {
    showToast("error", "Trading postcode shouldn't be empty !");
    validation = true;
  }
  if (data.trading_postcode.length < 5) {
    showToast("error", "Please enter at least 5 digit trading post code!");
    validation = true;
  }
  if (data.trading_country === "" || data.trading_country === null) {
    showToast("error", "Trading country shouldn't be empty !");
    validation = true;
  }
  if (data.trading_address1 === "" || data.trading_address1 === null) {
    showToast("error", "Trading country shouldn't be empty !");
    validation = true;
  }
  if (data.trading_city === "" || data.trading_city === null) {
    showToast("error", "Trading country shouldn't be empty !");
    validation = true;
  }
  const containsTradingSpecialCharacters = /[!@#*$%^'-]+/.test(
    data.trading_city
  );

  if (containsTradingSpecialCharacters) {
    showToast(
      "error",
      "Trading city cannot contain special characters like -, *, %, ', !, @, #, etc."
    );
    validation = true;
  }

  // Continue with your code if legal_city is valid

  
  //  if (data.website.match(regex) !== true) {
  // if (
 
  //   data.website !== "" &&
  //   data.website !== null
  // ) {
  //   showToast("error", "Please enter a valid website!");
  //   validation = true;
  // }
  if (parseInt(data.sales_internet_perc) > 0 && data.website === "") {
    showToast("error", "For Ecom app website shouldn't be empty !");
    validation = true;
  }
  if (parseInt(data.sales_internet_perc) > 0 && data.website === null) {
    showToast("error", "For Ecom app website shouldn't be empty !");
    validation = true;
  }

  if (parseInt(data.perc_annual_upfront_of_turnover) > 100) {
    showToast("error", "Annual upfront turnover Percentage must less than 100");
    validation = true;
  }
  if (parseInt(data.deposit_perc_transaction_value) > 100) {
    showToast("error", "Deposite Percentage must less than 100");
    validation = true;
  }
  if (
    parseInt(data.sales_ftf_perc) +
      parseInt(data.sales_moto_perc) +
      parseInt(data.sales_internet_perc) !==
    100
  ) {
    showToast("error", "Card acceptence ratio must be 100");
    validation = true;
  }
  if (
    data.visa_credit_sr.includes(".") &&
    data.visa_credit_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Visa credit secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.visa_credit_non_sr.includes(".") &&
    data.visa_credit_non_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Visa Credit non secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.master_credit_sr.includes(".") &&
    data.master_credit_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Master credit secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.master_credit_non_sr.includes(".") &&
    data.master_credit_non_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Master Credit non secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.visa_debit_sr.includes(".") &&
    data.visa_debit_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Visa debit secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.visa_debit_non_sr.includes(".") &&
    data.visa_debit_non_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Visa debit non secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.master_debit_sr.includes(".") &&
    data.master_debit_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Master debit secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.master_debit_non_sr.includes(".") &&
    data.master_debit_non_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Master debit non secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.international_maestro_sr.includes(".") &&
    data.international_maestro_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "International mestro secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.international_maestro_non_sr.includes(".") &&
    data.international_maestro_non_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "International mestro non secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.visa_v_pay_sr.includes(".") &&
    data.visa_v_pay_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Visa v pay secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.visa_v_pay_non_sr.includes(".") &&
    data.visa_v_pay_non_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Visa v pay non secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.uk_maestro_sr.includes(".") &&
    data.uk_maestro_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "UK mestro secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.uk_maestro_non_sr.includes(".") &&
    data.uk_maestro_non_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "UK mestro non secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.visa_business_credit_sr.includes(".") &&
    data.visa_business_credit_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Visa business credit secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.visa_business_credit_non_sr.includes(".") &&
    data.visa_business_credit_non_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Visa business credit non secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.visa_business_debit_sr.includes(".") &&
    data.visa_business_debit_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Visa business debit secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.visa_business_debit_non_sr.includes(".") &&
    data.visa_business_debit_non_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Visa business debit non secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.visa_purchasing_sr.includes(".") &&
    data.visa_purchasing_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Visa purching secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.visa_purchasing_non_sr.includes(".") &&
    data.visa_purchasing_non_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Visa purching non secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.visa_corporate_sr.includes(".") &&
    data.visa_corporate_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Visa corporate credit secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.visa_corporate_non_sr.includes(".") &&
    data.visa_corporate_non_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Visa corporate credit non secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.master_business_sr.includes(".") &&
    data.master_business_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Master business  secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.master_business_non_sr.includes(".") &&
    data.master_business_non_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Master business  non secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.master_purchasing_sr.includes(".") &&
    data.master_purchasing_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Master purching secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.master_purchasing_non_sr.includes(".") &&
    data.master_purchasing_non_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Master purching non secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.master_fleet_sr.includes(".") &&
    data.master_fleet_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Master fleet secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.master_fleet_non_sr.includes(".") &&
    data.master_fleet_non_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Master fleet non secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.master_corporate_sr.includes(".") &&
    data.master_corporate_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Master Corporate  secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.master_corporate_non_sr.includes(".") &&
    data.master_corporate_non_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Master Corporate  non secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.master_pre_commercial_sr.includes(".") &&
    data.master_pre_commercial_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Master pre commercial secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.master_pre_commercial_non_sr.includes(".") &&
    data.master_pre_commercial_non_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Master pre commercial non secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.non_eea_visa_sr.includes(".") &&
    data.non_eea_visa_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Non EEE visa secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.non_eea_visa_non_sr.includes(".") &&
    data.non_eea_visa_non_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Non EEE visa non secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.non_eea_master_sr.includes(".") &&
    data.non_eea_master_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Non EEE master  secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (
    data.non_eea_master_non_sr.includes(".") &&
    data.non_eea_master_non_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Non EEE master  non secure rate cann't exceed 3 digit after decimal"
    );
    validation = true;
  }
  if (validation) {
    return 0;
  }
  handleSigingRequest(data, not_submit);
  
};
