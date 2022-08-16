import React, { useState, useEffect } from "react";
import { useLayoutEffect } from "react";
import instance from "../../../../api/AxiosInstance";
import useAuth from "../../../../Auth/useAuth";

/**
 * After user fill the ads data, move next to fill the ads contacts detailes
 * @returns
 */
const StepThree = ({
  formData,
  setFormData,
  formDataStepThreeBuy,
  setFormDataStepThreeBuy,
  formDataStepThreeRent,
  setFormDataStepThreeRent,
  adBlock,
}) => {
  const { auth } = useAuth();
  const handleOnFocusLost = (e, typeOfParam) => {
    //func gets rent/buy and the event and check if smaller then min
    if (e.target.min) {
      if (parseInt(e.target.value) < e.target.min) {
        console.log(
          "ערך מינימום לשדה " + e.target.name + " הוא " + e.target.min
        );
        if (typeOfParam === "rent")
          setFormDataStepThreeRent({
            ...formDataStepThreeRent,
            [e.target.name]: "",
          });
        else {
          setFormDataStepThreeBuy({
            ...formDataStepThreeBuy,
            [e.target.name]: "",
          });
        }
      }
    }
  };
  /**
   * search method, buy or rent
   */
  const [masters, setMasters] = useState("");
  /**
   * Get data from server
   */
  const handleChangeAdContentBuyCheckBox = (event) => {
    const name = event.target.name;
    setFormDataStepThreeBuy({
      ...formDataStepThreeBuy,
      [name]: event.target.checked,
    });
  };
  const handleChangeAdContentBuy = (e) => {
    let num = e.target.value.replace(/\D/g, "");
    const name = e.target.name;
    const value = e.target.value;
    if (formDataStepThreeBuy[name] == "0" && e.target.value.length > 0) {
      return;
    }
    if (e.target.min || e.target.max) {
      if (isNaN(e.target.value) === true) {
        //value is not a number
        setFormDataStepThreeBuy({ ...formDataStepThreeBuy, [name]: num });
        document.getElementById(e.target.name).value = num;
        return;
      } else {
        if (e.target.max) {
          if (parseInt(e.target.value) > parseInt(e.target.max)) {
            //we are passing the max value
            setFormDataStepThreeBuy({
              ...formDataStepThreeBuy,
              [name]: e.target.max,
            });
            document.getElementById(e.target.name).value = e.target.max; //we put max value inside if user inserted bigger
            alert("מקסימום לשדה " + e.target.name + " הוא " + e.target.max);

            return;
          } else {
            setFormDataStepThreeBuy({
              ...formDataStepThreeBuy,
              [name]: e.target.value,
            });
            return;
          }
        } else {
          setFormDataStepThreeBuy({
            ...formDataStepThreeBuy,
            [name]: e.target.value,
          });
        }
      }
    } else {
      //not having min/max
      setFormDataStepThreeBuy({
        ...formDataStepThreeBuy,
        [name]: e.target.value,
      });
    }
  };
  const handleChangeAdContentRentCheckBox = (event) => {
    const name = event.target.name;
    setFormDataStepThreeRent({
      ...formDataStepThreeRent,
      [name]: event.target.checked,
    });
  };
  const handleChangeAdRentContent = (e) => {
    let num = e.target.value.replace(/\D/g, "");
    const name = e.target.name;
    const value = e.target.value;
    if (formDataStepThreeRent[name] == "0" && e.target.value.length > 0) {
      return;
    }
    if (e.target.min || e.target.max) {
      if (isNaN(e.target.value) === true) {
        //value is not a number
        setFormDataStepThreeRent({ ...formDataStepThreeRent, [name]: num });
        document.getElementById(e.target.name).value = num;
        return;
      } else {
        if (e.target.max) {
          if (parseInt(e.target.value) > parseInt(e.target.max)) {
            //we are passing the max value
            setFormDataStepThreeRent({
              ...formDataStepThreeRent,
              [name]: e.target.max,
            });
            document.getElementById(e.target.name).value = e.target.max; //we put max value inside if user inserted bigger
            console.log(
              "מקסימום לשדה " + e.target.name + " הוא " + e.target.max
            );
            return;
          } else {
            setFormDataStepThreeRent({
              ...formDataStepThreeRent,
              [name]: e.target.value,
            });
            return;
          }
        } else {
          setFormDataStepThreeRent({
            ...formDataStepThreeRent,
            [name]: e.target.value,
          });
        }
      }
    } else {
      //not having min/max
      setFormDataStepThreeRent({
        ...formDataStepThreeRent,
        [name]: e.target.value,
      });
    }
  };
  const getMasters = async () => {
    const result = await instance.request({
      data: {
        data_type: "getAllMasters",
      },
    });
    console.log(result.data);
    setMasters(result.data);
    if (result.data !== "") {
      for (let index = 0; index < result.data.length; index++) {
        let name1 = result.data[index].name;
        if (result.data[index].category === "השכרה") {
          if (typeof formDataStepThreeRent[name1] !== "undefined") {
            continue;
          }
          setFormDataStepThreeRent({
            ...formDataStepThreeRent,
            [result.data[index].name]: "",
          });
        } else {
          if (result.data[index].category === "קנייה") {
            if (typeof formDataStepThreeBuy[name1] !== "undefined") {
              continue;
            }
            setFormDataStepThreeBuy({
              ...formDataStepThreeBuy,
              [result.data[index].name]: "",
            });
          }
        }
      }
    }
  };
  useEffect(() => {
    getMasters();
  }, []);
  const makeFormOfAdContent = () => {
    //form of the adcontent masters we have
    let code = [];

    for (let index = 0; index < masters.length; index++) {
      if (
        masters[index].min_value !== null ||
        masters[index].max_value !== null
      ) {
        if (
          masters[index].min_value !== null &&
          masters[index].max_value !== null
        ) {
          if (masters[index].category === "השכרה") {
            code.push(
              <label
                key={masters[index].element_id}
                style={{
                  display: formData.assetOption === "rent" ? "block" : "none",
                }}
              >
                <span>{masters[index].name}</span>
                <input
                  type="text"
                  name={masters[index].name}
                  min={masters[index].min_value}
                  max={masters[index].max_value}
                  id={masters[index].name}
                  required={masters[index].required}
                  value={formDataStepThreeRent[masters[index].name]}
                  onBlur={(e) => handleOnFocusLost(e, "rent")}
                  onChange={handleChangeAdRentContent}
                />
              </label>
            );
          } else {
            code.push(
              <label
                key={masters[index].element_id}
                style={{
                  display: formData.assetOption === "buy" ? "block" : "none",
                }}
              >
                <span>{masters[index].name}</span>
                <input
                  type="text"
                  name={masters[index].name}
                  id={masters[index].name}
                  min={masters[index].min_value}
                  max={masters[index].max_value}
                  required={masters[index].required}
                  value={formDataStepThreeBuy[masters[index].name]}
                  onBlur={(e) => handleOnFocusLost(e, "buy")}
                  onChange={handleChangeAdContentBuy}
                />
              </label>
            );
          }
        } else {
          if (masters[index].min_value !== null) {
            if (masters[index].category === "השכרה") {
              code.push(
                <label
                  key={masters[index].element_id}
                  style={{
                    display: formData.assetOption === "rent" ? "block" : "none",
                  }}
                >
                  <span>{masters[index].name}</span>
                  <input
                    type="text"
                    name={masters[index].name}
                    min={masters[index].min_value}
                    id={masters[index].name}
                    required={masters[index].required}
                    value={formDataStepThreeRent[masters[index].name]}
                    onBlur={(e) => handleOnFocusLost(e, "rent")}
                    onChange={handleChangeAdRentContent}
                  />
                </label>
              );
            } else {
              code.push(
                <label
                  key={masters[index].element_id}
                  style={{
                    display: formData.assetOption === "buy" ? "block" : "none",
                  }}
                >
                  <span>{masters[index].name}</span>
                  <input
                    type="text"
                    name={masters[index].name}
                    id={masters[index].name}
                    min={masters[index].min_value}
                    required={masters[index].required}
                    value={formDataStepThreeBuy[masters[index].name]}
                    onBlur={(e) => handleOnFocusLost(e, "buy")}
                    onChange={handleChangeAdContentBuy}
                  />
                </label>
              );
            }
          } else {
            if (masters[index].category === "השכרה") {
              code.push(
                <label
                  key={masters[index].element_id}
                  style={{
                    display: formData.assetOption === "rent" ? "block" : "none",
                  }}
                >
                  <span>{masters[index].name}</span>
                  <input
                    type="text"
                    name={masters[index].name}
                    max={masters[index].max_value}
                    id={masters[index].name}
                    required={masters[index].required}
                    value={formDataStepThreeRent[masters[index].name]}
                    onBlur={(e) => handleOnFocusLost(e, "rent")}
                    onChange={handleChangeAdRentContent}
                  />
                </label>
              );
            } else {
              code.push(
                <label
                  key={masters[index].element_id}
                  style={{
                    display: formData.assetOption === "buy" ? "block" : "none",
                  }}
                >
                  <span>{masters[index].name}</span>
                  <input
                    type="text"
                    name={masters[index].name}
                    id={masters[index].name}
                    max={masters[index].max_value}
                    required={masters[index].required}
                    value={formDataStepThreeBuy[masters[index].name]}
                    onBlur={(e) => handleOnFocusLost(e, "buy")}
                    onChange={handleChangeAdContentBuy}
                  />
                </label>
              );
            }
          }
        }
      } else {
        if (masters[index].display_type === "checkBox") {
          if (masters[index].category === "השכרה") {
            code.push(
              <label
                key={masters[index].element_id}
                style={{
                  display: formData.assetOption === "rent" ? "block" : "none",
                }}
              >
                <span>{masters[index].name}</span>
                <input
                  type="checkBox"
                  name={masters[index].name}
                  id={masters[index].name}
                  required={masters[index].required}
                  value={formDataStepThreeRent[masters[index].name]}
                  onChange={handleChangeAdContentRentCheckBox}
                  checked={formDataStepThreeRent[masters[index].name]}
                />
              </label>
            );
          } else {
            code.push(
              <label
                key={masters[index].element_id}
                style={{
                  display: formData.assetOption === "buy" ? "block" : "none",
                }}
              >
                <span>{masters[index].name}</span>
                <input
                  type="checkBox"
                  name={masters[index].name}
                  id={masters[index].name}
                  required={masters[index].required}
                  value={formDataStepThreeBuy[masters[index].name]}
                  onChange={handleChangeAdContentBuyCheckBox}
                  checked={formDataStepThreeBuy[masters[index].name]}
                />
              </label>
            );
          }
        } else {
          //for text
          if (masters[index].category === "השכרה") {
            code.push(
              <label
                key={masters[index].element_id}
                style={{
                  display: formData.assetOption === "rent" ? "block" : "none",
                }}
              >
                <span>{masters[index].name}</span>
                <input
                  type="text"
                  name={masters[index].name}
                  id={masters[index].name}
                  value={formDataStepThreeRent[masters[index].name]}
                  onChange={handleChangeAdRentContent}
                />
              </label>
            );
          } else {
            code.push(
              <label
                key={masters[index].element_id}
                style={{
                  display: formData.assetOption === "buy" ? "block" : "none",
                }}
              >
                <span>{masters[index].free_text}</span>
                <input
                  type="text"
                  name={masters[index].name}
                  id={masters[index].name}
                  value={formDataStepThreeBuy[masters[index].name]}
                  onChange={handleChangeAdContentBuy}
                />
              </label>
            );
          }
        }
      }
    }
    return code;
  };
  /**
   * get the additional data
   */
  return (
    <div className="inputStyleStepTwo">
      {masters ? makeFormOfAdContent() : ""}
    </div>
  );
};

export default StepThree;
