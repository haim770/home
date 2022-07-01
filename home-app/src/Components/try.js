import React, { useState, useEffect, useLayoutEffect } from "react";
import Button from "./Button";
import "../styles/searchAds.css";
import instance from "../api/AxiosInstance";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";
function SearchAds(props) {
  const [minPrice, setMinPrice] = useState(""); //hook for the price state
  const [maxPrice, setMaxPrice] = useState(""); //hook for the price state
  const [masters, setMasters] = useState("");
  const [inputsAdContent, setInputsAdContent] = useState({});
  const [inputsAd, setInputsAd] = useState({
    user_id: "",
    city: "",
    street: "",
    adType: "השכרה",
    maxRooms: "",
    minRooms: "",
    apartment: "",
    zip_code: "",
    price: "",
    building_number: "",
    entry: "",
  });

  //////////////////////////////////////////

  //

  /**
   * useState for city option
   */
  const [options, setOptions] = useState([{}]);
  const [selectedOption, setSelectedOption] = useState(
    { value: inputsAd.city, label: inputsAd.city } || null
  );

  /**
   * useState for street option
   */
  const [streetOptions, setStreetOptions] = useState([{}]);
  const [streetSelectedOption, setStreetSelectedOption] = useState(
    { value: inputsAd.street, label: inputsAd.street } || null
  );
  /**
   * search method, city or street
   */
  const [searchMethod, setSearchMethod] = useState("city");

  ///

  //////////////////////////////////
  useLayoutEffect(() => {
    if (selectedOption === null) {
      setSearchMethod("city");
    } else {
      setStreetSelectedOption(null);
      setSearchMethod("street");
    }
    getSearchOprions();
  }, [selectedOption]);

  const getSearchOprions = async () => {
    console.log("d");
    const result = await instance.request({
      data: {
        data_type: "getSelectData",
        params: {
          selected: searchMethod,
          cityName: inputsAd.city || "",
        },
      },
    });
    console.log(result.data);
    if (searchMethod === "city") setOptions(result.data.searchOption);
    else setStreetOptions(result.data.searchOption);
  };
  const handleChangeCity = (event) => {
    const value = event.label;
    const enCity = event.value;
    setInputsAd((values) => ({ ...values, city: value }));
    setSelectedOption(event);
  };
  const handleChangeStreet = (event) => {
    const value = event.label;
    setInputsAd((values) => ({ ...values, street: value }));
    setStreetSelectedOption(event);
  };
  const handleChangeAd = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "price" || name === "rooms" || name === "building_number") {
      if (isNaN(value)) return;
    }
    setInputsAd({ ...inputsAd, [name]: value });
  };
  const handleChangeAdContentCheckBox = (event) => {
    const name = event.target.name;
    setInputsAdContent({ ...inputsAdContent, [name]: event.target.checked });
  };
  const handleChangeAdContent = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputsAdContent({ ...inputsAdContent, [name]: value });
  };
  const getMasters = async () => {
    const result = await instance.request({
      data: {
        data_type: "getAllMasters",
      },
    });
    setMasters(result.data);
  };
  useEffect(() => {
    getMasters();
    if (masters !== "") {
      for (let index = 0; index < masters.length; index++) {
        setInputsAdContent({
          ...inputsAdContent,
          [masters[index].name]: false,
        });
        setInputsAdContent({
          ...inputsAdContent,
          [masters[index].name]: "",
        });
      }
    }
  }, []);
  const onChangeState = (setStateName, e) => {
    //func that recieves setstate and the event and change value of state to the value of input
    if (
      e.target.name === "form_min_price" ||
      e.target.name === "form_max_price"
    )
      if (isNaN(e.target.value)) return;
    setStateName(e.target.value);
  };
  const makeFieldsOfAdColumnsWeKnow = (code) => {
    code.push(
      <label key="adType">
        <span>סוג מודעה</span>
        <select
          id="adType"
          name="adType"
          value={inputsAd.adType}
          onChange={handleChangeAd}
        >
          <option>השכרה</option>
          <option>קנייה</option>
        </select>
      </label>
    );
    code.push(
      <label key="city">
        <span>עיר</span>
        <input
          type="text"
          name="city"
          id="city"
          required
          value={inputsAd.city}
          onChange={handleChangeAd}
        />
      </label>
    );
    code.push(
      <label key="street">
        <span>רחוב</span>
        <input
          type="text"
          name="street"
          id="street"
          required
          value={inputsAd.street}
          onChange={handleChangeAd}
        />
      </label>
    );
    code.push(
      <label key="minRooms">
        <span> מינימום חדרים </span>
        <input
          type="text"
          name="minRooms"
          id="minRooms"
          required
          value={inputsAd.minRooms}
          onChange={handleChangeAd}
        />
      </label>
    );
    code.push(
      <label key="maxRooms">
        <span> חדרים מקסימום</span>
        <input
          type="text"
          name="maxRooms"
          id="maxRooms"
          required
          value={inputsAd.maxRooms}
          onChange={handleChangeAd}
        />
      </label>
    );
  };
  const makeFormOfAdContent = () => {
    //form of the adcontent masters we have
    let code = [];
    makeFieldsOfAdColumnsWeKnow(code);
    for (let index = 0; index < masters.length; index++) {
      if (masters[index].display_type === "checkBox") {
        code.push(
          <label key={masters[index].name + masters[index].adID}>
            <span>{masters[index].free_text}</span>
            <input
              type="checkBox"
              name={masters[index].name}
              id={masters[index].name}
              required={masters[index].required}
              value={inputsAdContent.name}
              onChange={handleChangeAdContentCheckBox}
              // checked={inputsAdContent.name?false:true}
            />
          </label>
        );
      } else {
        //for text
        code.push(
          <label key={masters[index].name + masters[index].adID}>
            <span>{masters[index].free_text}</span>
            <input
              type="text"
              name={masters[index].name}
              id={masters[index].name}
              required
              value={inputsAdContent.name}
              onChange={handleChangeAdContent}
            />
          </label>
        );
      }
    }
    return code;
  };
  const returnStateToDefault = () => {
    setInputsAd({
      user_id: "",
      city: "",
      street: "",
      adType: "השכרה",
      maxRooms: "",
      minRooms: "",
      apartment: "",
      zip_code: "",
      price: "",
      building_number: "",
      entry: "",
    });
    setMinPrice("");
    setMaxPrice(""); //hook for the price state
  };
  const makeObjOfAllFields = () => {
    //returns the ad from field states and save it amt return as object

    let obj = {};
    for (const [key, value] of Object.entries(inputsAd)) {
      obj[key] = value;
    }
    for (const [key, value] of Object.entries(inputsAdContent)) {
      obj[key] = value;
    }
    obj["minPrice"] = minPrice;
    obj["maxPrice"] = maxPrice;
    obj = {
      data_type: "getAllAdContentAndAdAndUsersForArrOfAds",
      params: obj,
    };
    return obj;
  };
  const searchAdByParams = (e) => {
    //add ad to the db, returns true/false
    e.preventDefault();
    props.setListShow("showList");
    props.setFullShow("notShowFull");
    props.setindexStart(0);
    props.setindexEnd(10);
    const obj = makeObjOfAllFields();
    props.setSearchParams(obj);
  };
  return (
    <form className={props.className}>
      <label key="minPrice">
        <span>מחיר מינימום</span>
        <input
          type="text"
          name="form_max_price"
          id="price"
          required
          value={minPrice}
          onChange={(e) => onChangeState(setMinPrice, e)}
        />
      </label>
      <label key="maxPrice">
        <span>מחיר מקסימום</span>
        <input
          type="text"
          name="form_min_price"
          id="price"
          required
          value={maxPrice}
          onChange={(e) => onChangeState(setMaxPrice, e)}
        />
      </label>
      {masters ? makeFormOfAdContent() : ""}
      <p>
        <Button onClick={searchAdByParams} content="חפש" />
      </p>
      <div>
        <h3>איפה?</h3>
        <Select
          className="selectStyle"
          name="city"
          value={selectedOption}
          onChange={handleChangeCity}
          options={options}
          autoFocus={true}
          aria-label="שם עיר"
          captureMenuScroll={true} // When the user reaches the top/bottom of the menu, prevent scroll on the scroll-parent
          placeholder="עיר"
        />
        <Select
          className="selectStyle"
          name="street"
          value={streetSelectedOption}
          onChange={handleChangeStreet}
          options={streetOptions}
          aria-label="שם רחוב"
          captureMenuScroll={true} // When the user reaches the top/bottom of the menu, prevent scroll on the scroll-parent
          placeholder="רחוב"
        />
      </div>
    </form>
  );
}
SearchAds.defaultProps = {
  sellerName: "",
  price: "",
  createTime: "",
  adLink: "",
  city: "",
  street: "",
  number: "",
  rooms: "",
  userId: "",
};
export default SearchAds;


















































































































// import React, { useState, useEffect } from "react";
// import Button from "./Button";
// import "../styles/searchAds.css";
// import instance from "../api/AxiosInstance";
// import { v4 as uuidv4 } from "uuid";
// function SearchAds(props) {
//   const [minPrice, setMinPrice] = useState(""); //hook for the price state
//   const [maxPrice, setMaxPrice] = useState(""); //hook for the price state
//   const [masters, setMasters] = useState("");
//   const [inputsAdContent, setInputsAdContent] = useState({});
//   const [inputsAd, setInputsAd] = useState({
//     user_id: "",
//     city: "",
//     street: "",
//     adType: "השכרה",
//     maxRooms: "",
//     minRooms: "",
//     apartment: "",
//     zip_code: "",
//     price: "",
//     building_number: "",
//     entry: "",
//   });
//   const handleChangeAd = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     if (name === "price" || name === "rooms" || name === "building_number") {
//       if (isNaN(value)) return;
//     }
//     setInputsAd({ ...inputsAd, [name]: value });
//   };
//   const handleChangeAdContentCheckBox = (event) => {
//     const name = event.target.name;
//     setInputsAdContent({ ...inputsAdContent, [name]: event.target.checked });
//   };
//   const handleChangeAdContent = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setInputsAdContent({ ...inputsAdContent, [name]: value });
//   };
//   const getMasters = async () => {
//     const result = await instance.request({
//       data: {
//         data_type: "getAllMasters",
//       },
//     });
//     setMasters(result.data);
//   };
//   useEffect(() => {
//     getMasters();
//     if (masters !== "") {
//       for (let index = 0; index < masters.length; index++) {
//         setInputsAdContent({
//           ...inputsAdContent,
//           [masters[index].name]: false,
//         });
//         setInputsAdContent({
//           ...inputsAdContent,
//           [masters[index].name]: "",
//         });
//       }
//     }
//   }, []);
//   const onChangeState = (setStateName, e) => {
//     //func that recieves setstate and the event and change value of state to the value of input
//     if (
//       e.target.name === "form_min_price" ||
//       e.target.name === "form_max_price"
//     )
//       if (isNaN(e.target.value)) return;
//     setStateName(e.target.value);
//   };
//   const makeFieldsOfAdColumnsWeKnow = (code) => {
//     code.push(
//       <label key="adType">
//         <span>סוג מודעה</span>
//         <select
//           id="adType"
//           name="adType"
//           value={inputsAd.adType}
//           onChange={handleChangeAd}
//         >
//           <option>השכרה</option>
//           <option>קנייה</option>
//         </select>
//       </label>
//     );
//     code.push(
//       <label key="city">
//         <span>עיר</span>
//         <input
//           type="text"
//           name="city"
//           id="city"
//           required
//           value={inputsAd.city}
//           onChange={handleChangeAd}
//         />
//       </label>
//     );
//     code.push(
//       <label key="street">
//         <span>רחוב</span>
//         <input
//           type="text"
//           name="street"
//           id="street"
//           required
//           value={inputsAd.street}
//           onChange={handleChangeAd}
//         />
//       </label>
//     );
//     code.push(
//       <label key="minRooms">
//         <span> מינימום חדרים </span>
//         <input
//           type="text"
//           name="minRooms"
//           id="minRooms"
//           required
//           value={inputsAd.minRooms}
//           onChange={handleChangeAd}
//         />
//       </label>
//     );
//     code.push(
//       <label key="maxRooms">
//         <span> חדרים מקסימום</span>
//         <input
//           type="text"
//           name="maxRooms"
//           id="maxRooms"
//           required
//           value={inputsAd.maxRooms}
//           onChange={handleChangeAd}
//         />
//       </label>
//     );
//   };
//   const makeFormOfAdContent = () => {
//     //form of the adcontent masters we have
//     let code = [];
//     makeFieldsOfAdColumnsWeKnow(code);
//     for (let index = 0; index < masters.length; index++) {
//       if (masters[index].display_type === "checkBox") {
//         code.push(
//           <label key={masters[index].name + masters[index].adID}>
//             <span>{masters[index].free_text}</span>
//             <input
//               type="checkBox"
//               name={masters[index].name}
//               id={masters[index].name}
//               required={masters[index].required}
//               value={inputsAdContent.name}
//               onChange={handleChangeAdContentCheckBox}
//               // checked={inputsAdContent.name?false:true}
//             />
//           </label>
//         );
//       } else {
//         //for text
//         code.push(
//           <label key={masters[index].name + masters[index].adID}>
//             <span>{masters[index].free_text}</span>
//             <input
//               type="text"
//               name={masters[index].name}
//               id={masters[index].name}
//               required
//               value={inputsAdContent.name}
//               onChange={handleChangeAdContent}
//             />
//           </label>
//         );
//       }
//     }
//     return code;
//   };
//   const returnStateToDefault = () => {
//     setInputsAd({
//       user_id: "",
//       city: "",
//       street: "",
//       adType: "השכרה",
//       maxRooms: "",
//       minRooms: "",
//       apartment: "",
//       zip_code: "",
//       price: "",
//       building_number: "",
//       entry: "",
//     });
//     setMinPrice("");
//     setMaxPrice(""); //hook for the price state
//   };
//   const makeObjOfAllFields = () => {
//     //returns the ad from field states and save it amt return as object

//     let obj = {};
//     for (const [key, value] of Object.entries(inputsAd)) {
//       obj[key] = value;
//     }
//     for (const [key, value] of Object.entries(inputsAdContent)) {
//       obj[key] = value;
//     }
//     obj["minPrice"] = minPrice;
//     obj["maxPrice"] = maxPrice;
//     obj = {
//       data_type: "getAllAdContentAndAdAndUsersForArrOfAds",
//       params: obj,
//     };
//     return obj;
//   };
//   const searchAdByParams = (e) => {
//     //add ad to the db, returns true/false
//     e.preventDefault();
//     props.setListShow("showList");
//     props.setFullShow("notShowFull");
//     props.setindexStart(0);
//     props.setindexEnd(10);
//     const obj = makeObjOfAllFields();
//     props.setSearchParams(obj);
//   };
//   return (
//     <form className={props.className}>
//       <label key="minPrice">
//         <span>מחיר מינימום</span>
//         <input
//           type="text"
//           name="form_max_price"
//           id="price"
//           required
//           value={minPrice}
//           onChange={(e) => onChangeState(setMinPrice, e)}
//         />
//       </label>
//       <label key="maxPrice">
//         <span>מחיר מקסימום</span>
//         <input
//           type="text"
//           name="form_min_price"
//           id="price"
//           required
//           value={maxPrice}
//           onChange={(e) => onChangeState(setMaxPrice, e)}
//         />
//       </label>
//       {masters ? makeFormOfAdContent() : ""}
//       <p>
//         <Button onClick={searchAdByParams} content="חפש" />
//       </p>
//     </form>
//   );
// }
// SearchAds.defaultProps = {
//   sellerName: "",
//   price: "",
// //   createTime: "",
// //   adLink: "",
// //   city: "",
// //   street: "",
// //   number: "",
// //   rooms: "",
// //   userId: "",
// // };
// // export default SearchAds;

























































// import * as React from "react";
// import { useLayoutEffect, useState } from "react";
// import Box from "@mui/material/Box";
// import Collapse from "@mui/material/Collapse";
// import IconButton from "@mui/material/IconButton";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import TablePagination from "@mui/material/TablePagination";
// import TableFooter from "@mui/material/TableFooter";
// import Typography from "@mui/material/Typography";
// import Paper from "@mui/material/Paper";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import "./Styles/collapsTableStyle.css";
// import AdById from "../../../../AdById.js";
// import useAuth from "../../../../../Auth/useAuth";
// import instance from "../../../../../api/AxiosInstance";
// function createData(
//   uuid,
//   userEmail,
//   userName,
//   userRole,
//   userLastSeen,
//   price,
//   ads,
//   purchase
// ) {
//   let adss;
//   let purchases;
//   if (ads) adss = ads;
//   else
//     adss = [
//       {
//         adId: "",
//         active: "",
//         approval_status: "",
//         create_time: "",
//         expire_date: "",
//         watch: "",
//         user_id: "",
//       },
//     ];
//   if (purchase) purchases = purchase;
//   else
//     purchases = [
//       {
//         purchase_id: "",
//         packageId: "",
//         userId: "",
//         purchase_time: "",
//         price: "",
//       },
//     ];
//   return {
//     uuid,
//     userEmail,
//     userName,
//     userRole,
//     userLastSeen,
//     price,
//     adss,
//     purchases,
//     history: [
//       {
//         date: "2020-01-05",
//         customerId: "11091700",
//         amount: 3,
//       },
//       {
//         date: "2020-01-02",
//         customerId: "Anonymous",
//         amount: 1,
//       },
//     ],
//   };
// }

// function Row(props) {
//   const { row } = props;
//   const [open, setOpen] = React.useState(false);
//   const [selectedAdId, setSelectedAdId] = useState(false);
//   const [showSelectedAd, setShowSelectedAd] = useState(false);

//   return (
//     <React.Fragment>
//       <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
//         <TableCell component="th" scope="row" align="right">
//           {row.uuid}
//         </TableCell>
//         <TableCell align="right">{row.userEmail}</TableCell>
//         <TableCell align="right">{row.userName}</TableCell>
//         <TableCell align="right">{row.userRole}</TableCell>
//         <TableCell align="right">{row.userLastSeen}</TableCell>
//         <TableCell>
//           <IconButton
//             aria-label="expand row"
//             size="medium"
//             onClick={() => setOpen(!open)}
//           >
//             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//           </IconButton>
//         </TableCell>
//       </TableRow>
//       {/* This section will handle the open menu*/}
//       <TableRow
//         sx={{
//           "& > *": {
//             borderBottom: "unset",
//             borderTop: "unset",
//           },
//         }}
//       >
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box sx={{ margin: 1 }}>
//               <Typography
//                 variant="h6"
//                 gutterBottom
//                 component="div"
//                 align="right"
//               >
//                 מודעות
//               </Typography>
//               <Table size="medium" aria-label="ads">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell align="right">מזהה מודעה</TableCell>
//                     <TableCell align="right">זמן יצירה</TableCell>
//                     <TableCell align="right">תוקף</TableCell>
//                     <TableCell align="right">פעיל?</TableCell>
//                     <TableCell align="right">מספר צפיות</TableCell>
//                     <TableCell align="right">סטאטוס מודעה</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {row.adss.map((adsRow, index) => (
//                     <TableRow
//                       key={index}
//                       onClick={(e) => {
//                         e.preventDefault();
//                         setSelectedAdId(adsRow.adID);
//                         setShowSelectedAd(!showSelectedAd);
//                       }}
//                     >
//                       <TableCell component="th" scope="row" align="right">
//                         {adsRow.adID}
//                       </TableCell>
//                       <TableCell align="right">{adsRow.create_time}</TableCell>
//                       <TableCell align="right">{adsRow.expire_date}</TableCell>
//                       <TableCell align="right">{adsRow.active}</TableCell>
//                       <TableCell align="right">{adsRow.watch}</TableCell>
//                       <TableCell align="right">
//                         {adsRow.approval_status}
//                         {console.log(adsRow.adID)}
//                       </TableCell>
//                       {/* <TableCell>
//                         <IconButton
//                           aria-label="expand row"
//                           size="medium"
//                           onClick={() => setShowSelectedAd(!showSelectedAd)}
//                         >
//                           {showSelectedAd ? (
//                             <KeyboardArrowUpIcon />
//                           ) : (
//                             <KeyboardArrowDownIcon />
//                           )}
//                         </IconButton>
//                       </TableCell> */}
//                       <TableRow
//                         style={{
//                           display: showSelectedAd ? "Table-Row" : "none",
//                         }}
//                       >
//                         <AdById adId={adsRow.adID} user_id={adsRow.user_id} />
//                       </TableRow>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//       {/* This section will handle the open menu*/}
//       <TableRow
//         sx={{
//           "& > *": {
//             borderBottom: "unset",
//             borderTop: "unset",
//           },
//         }}
//       >
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box sx={{ margin: 1 }}>
//               <Typography
//                 variant="h6"
//                 gutterBottom
//                 component="div"
//                 align="right"
//               >
//                 רכישות
//               </Typography>
//               <Table size="medium" aria-label="purchases">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell align="right">מזהה רכישה</TableCell>
//                     <TableCell align="right">מזהה חבילה</TableCell>
//                     <TableCell align="right">תאריך רכישה</TableCell>
//                     <TableCell align="right">סכום (₪)</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {row.purchases.map((purchaseRow, index) => (
//                     <TableRow key={index}>
//                       <TableCell component="th" scope="row" align="right">
//                         {purchaseRow.purchase_id}
//                       </TableCell>
//                       <TableCell align="right">
//                         {purchaseRow.packageId}
//                       </TableCell>
//                       <TableCell align="right">
//                         {purchaseRow.purchase_time}
//                       </TableCell>
//                       <TableCell align="right">{purchaseRow.price}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//       {/* This section will handle the open menu*/}
//     </React.Fragment>
//   );
// }








// // const rows = [
// //   createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
// //   createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
// //   createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
// //   createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
// //   createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
// // ];

// export default function CollapsibleTable() {
//   const [rows, setRows] = useState([]);
//   const [totalRows, setTotalRows] = useState(0);
//   const [page, setPage] = useState(0);
//   const { auth } = useAuth();

//   /**
//    * Get Chat from server
//    */
//   const getUsers = async () => {
//     const result = await instance.request({
//       data: {
//         data_type: "getSettingsUsers",
//         params: {},
//       },
//       headers: {
//         Authorization: `Bearer ${auth.accessToken}`,
//       },
//     });
//     // check if we got new data from server or any response
//     if (result?.data) {
//       setTotalRows(Object.values(result.data.result).length);
//       setRows(
//         Object.values(result.data.result).map((objM, index) =>
//           createData(
//             objM["0"].uuid,
//             objM["0"].mail,
//             `${objM["0"].first_name} ${objM["0"].last_name}`,
//             objM["0"].rule,
//             objM["0"].last_seen,
//             1,
//             objM.ads,
//             objM.purchase
//           )
//         )
//       );
//     }
//   };
//   /**
//    * This will make that first we get all contacts then we will display all other
//    * data and view, so we will see all contacts when we open the contacts
//    * window
//    */
//   useLayoutEffect(() => {
//     getUsers();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   return (
//     <div className="tableContainer">
//       <TableContainer component={Paper}>
//         <Table aria-label="collapsible table">
//           <TableHead>
//             <TableRow>
//               <TableCell align="right">מזהה משתמש</TableCell>
//               <TableCell align="right">שם משתמש</TableCell>
//               <TableCell align="right">שם</TableCell>
//               <TableCell align="right">הרשאות</TableCell>
//               <TableCell align="right">נראה לאחרונה</TableCell>
//               <TableCell align="right">פעולות</TableCell>
//               <TableCell />
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row) => (
//               <Row key={row.uuid} row={row} />
//             ))}
//           </TableBody>
//           <TableFooter>
//             <TableRow>
//               <TablePagination
//                 rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
//                 count={totalRows}
//                 rowsPerPage={5}
//                 page={page}
//               />
//             </TableRow>
//           </TableFooter>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }









// import * as React from "react";
// import { useLayoutEffect, useState } from "react";
// import Box from "@mui/material/Box";
// import Collapse from "@mui/material/Collapse";
// import IconButton from "@mui/material/IconButton";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import TablePagination from "@mui/material/TablePagination";
// import TableFooter from "@mui/material/TableFooter";
// import Typography from "@mui/material/Typography";
// import Paper from "@mui/material/Paper";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import "./Styles/collapsTableStyle.css";
// import AdById from "../../../../AdById.js";
// import useAuth from "../../../../../Auth/useAuth";
// import instance from "../../../../../api/AxiosInstance";
// function createData(
//   uuid,
//   userEmail,
//   userName,
//   userRole,
//   userLastSeen,
//   price,
//   ads,
//   purchase
// ) {
//   let adss;
//   let purchases;
//   if (ads) adss = ads;
//   else
//     adss = [
//       {
//         adId: "",
//         active: "",
//         approval_status: "",
//         create_time: "",
//         expire_date: "",
//         watch: "",
//         user_id: "",
//       },
//     ];
//   if (purchase) purchases = purchase;
//   else
//     purchases = [
//       {
//         purchase_id: "",
//         packageId: "",
//         userId: "",
//         purchase_time: "",
//         price: "",
//       },
//     ];
//   return {
//     uuid,
//     userEmail,
//     userName,
//     userRole,
//     userLastSeen,
//     price,
//     adss,
//     purchases,
//     history: [
//       {
//         date: "2020-01-05",
//         customerId: "11091700",
//         amount: 3,
//       },
//       {
//         date: "2020-01-02",
//         customerId: "Anonymous",
//         amount: 1,
//       },
//     ],
//   };
// }

// function Row(props) {
//   const { row } = props;
//   const [open, setOpen] = React.useState(false);
//   const [selectedAdId, setSelectedAdId] = useState(false);
//   const [showSelectedAd, setShowSelectedAd] = useState(false);

//   return (
//     <React.Fragment>
//       <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
//         <TableCell component="th" scope="row" align="right">
//           {row.uuid}
//         </TableCell>
//         <TableCell align="right">{row.userEmail}</TableCell>
//         <TableCell align="right">{row.userName}</TableCell>
//         <TableCell align="right">{row.userRole}</TableCell>
//         <TableCell align="right">{row.userLastSeen}</TableCell>
//         <TableCell>
//           <IconButton
//             aria-label="expand row"
//             size="medium"
//             onClick={() => setOpen(!open)}
//           >
//             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//           </IconButton>
//         </TableCell>
//       </TableRow>
//       {/* This section will handle the open menu*/}
//       <TableRow
//         sx={{
//           "& > *": {
//             borderBottom: "unset",
//             borderTop: "unset",
//           },
//         }}
//       >
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box sx={{ margin: 1 }}>
//               <Typography
//                 variant="h6"
//                 gutterBottom
//                 component="div"
//                 align="right"
//               >
//                 מודעות
//               </Typography>
//               <Table size="medium" aria-label="ads">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell align="right">מזהה מודעה</TableCell>
//                     <TableCell align="right">זמן יצירה</TableCell>
//                     <TableCell align="right">תוקף</TableCell>
//                     <TableCell align="right">פעיל?</TableCell>
//                     <TableCell align="right">מספר צפיות</TableCell>
//                     <TableCell align="right">סטאטוס מודעה</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {row.adss.map((adsRow, index) => (
//                     <TableRow
//                       key={index}
//                       onClick={(e) => {
//                         e.preventDefault();
//                         setSelectedAdId(adsRow.adID);
//                         setShowSelectedAd(!showSelectedAd);
//                       }}
//                     >
//                       <TableCell component="th" scope="row" align="right">
//                         {adsRow.adID}
//                       </TableCell>
//                       <TableCell align="right">{adsRow.create_time}</TableCell>
//                       <TableCell align="right">{adsRow.expire_date}</TableCell>
//                       <TableCell align="right">{adsRow.active}</TableCell>
//                       <TableCell align="right">{adsRow.watch}</TableCell>
//                       <TableCell align="right">
//                         {adsRow.approval_status}
//                         {console.log(adsRow.adID)}
//                       </TableCell>
//                       {/* <TableCell>
//                         <IconButton
//                           aria-label="expand row"
//                           size="medium"
//                           onClick={() => setShowSelectedAd(!showSelectedAd)}
//                         >
//                           {showSelectedAd ? (
//                             <KeyboardArrowUpIcon />
//                           ) : (
//                             <KeyboardArrowDownIcon />
//                           )}
//                         </IconButton>
//                       </TableCell> */}
//                       <TableRow
//                         style={{
//                           display: showSelectedAd ? "Table-Row" : "none",
//                         }}
//                       >
//                         <AdById adId={adsRow.adID} user_id={adsRow.user_id} />
//                       </TableRow>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//       {/* This section will handle the open menu*/}
//       <TableRow
//         sx={{
//           "& > *": {
//             borderBottom: "unset",
//             borderTop: "unset",
//           },
//         }}
//       >
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box sx={{ margin: 1 }}>
//               <Typography
//                 variant="h6"
//                 gutterBottom
//                 component="div"
//                 align="right"
//               >
//                 רכישות
//               </Typography>
//               <Table size="medium" aria-label="purchases">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell align="right">מזהה רכישה</TableCell>
//                     <TableCell align="right">מזהה חבילה</TableCell>
//                     <TableCell align="right">תאריך רכישה</TableCell>
//                     <TableCell align="right">סכום (₪)</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {row.purchases.map((purchaseRow, index) => (
//                     <TableRow key={index}>
//                       <TableCell component="th" scope="row" align="right">
//                         {purchaseRow.purchase_id}
//                       </TableCell>
//                       <TableCell align="right">
//                         {purchaseRow.packageId}
//                       </TableCell>
//                       <TableCell align="right">
//                         {purchaseRow.purchase_time}
//                       </TableCell>
//                       <TableCell align="right">{purchaseRow.price}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//       {/* This section will handle the open menu*/}
//     </React.Fragment>
//   );
// }








// // const rows = [
// //   createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
// //   createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
// //   createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
// //   createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
// //   createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
// // ];

// export default function CollapsibleTable() {
//   const [rows, setRows] = useState([]);
//   const [totalRows, setTotalRows] = useState(0);
//   const [page, setPage] = useState(0);
//   const { auth } = useAuth();

//   /**
//    * Get Chat from server
//    */
//   const getUsers = async () => {
//     const result = await instance.request({
//       data: {
//         data_type: "getSettingsUsers",
//         params: {},
//       },
//       headers: {
//         Authorization: `Bearer ${auth.accessToken}`,
//       },
//     });
//     // check if we got new data from server or any response
//     if (result?.data) {
//       setTotalRows(Object.values(result.data.result).length);
//       setRows(
//         Object.values(result.data.result).map((objM, index) =>
//           createData(
//             objM["0"].uuid,
//             objM["0"].mail,
//             `${objM["0"].first_name} ${objM["0"].last_name}`,
//             objM["0"].rule,
//             objM["0"].last_seen,
//             1,
//             objM.ads,
//             objM.purchase
//           )
//         )
//       );
//     }
//   };
//   /**
//    * This will make that first we get all contacts then we will display all other
//    * data and view, so we will see all contacts when we open the contacts
//    * window
//    */
//   useLayoutEffect(() => {
//     getUsers();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   return (
//     <div className="tableContainer">
//       <TableContainer component={Paper}>
//         <Table aria-label="collapsible table">
//           <TableHead>
//             <TableRow>
//               <TableCell align="right">מזהה משתמש</TableCell>
//               <TableCell align="right">שם משתמש</TableCell>
//               <TableCell align="right">שם</TableCell>
//               <TableCell align="right">הרשאות</TableCell>
//               <TableCell align="right">נראה לאחרונה</TableCell>
//               <TableCell align="right">פעולות</TableCell>
//               <TableCell />
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row) => (
//               <Row key={row.uuid} row={row} />
//             ))}
//           </TableBody>
//           <TableFooter>
//             <TableRow>
//               <TablePagination
//                 rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
//                 count={totalRows}
//                 rowsPerPage={5}
//                 page={page}
//               />
//             </TableRow>
//           </TableFooter>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }
