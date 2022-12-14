import React, { useState } from "react";
import { useEffect, useLayoutEffect } from "react";
import Select from "react-select";
import instance from "../../../../api/AxiosInstance";
import useAuth from "../../../../Auth/useAuth";

/**
 * After user choose rent or buy, move next to fill the ads detailes
 * @returns
 */
const StepTwo = ({ formData, setFormData }) => {
  const { auth } = useAuth();

  /**
   * useState for city option
   */
  const [options, setOptions] = useState([{}]);
  const [selectedOption, setSelectedOption] = useState(
    { value: formData.enCity, label: formData.city } || ""
  );

  /**
   * useState for street option
   */
  const [streetOptions, setStreetOptions] = useState([{}]);
  const [streetSelectedOption, setStreetSelectedOption] = useState(
    { value: formData.street_code, label: formData.street } || ""
  );
  /**
   * search method, city or street
   */
  const [searchMethod, setSearchMethod] = useState("city");

  /**
   * Today date - for select entry date if needed
   */
  let todayDate = new Date();
  let dd = String(todayDate.getDate()).padStart(2, "0");
  let mm = String(todayDate.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = todayDate.getFullYear();
  todayDate = yyyy + "-" + mm + "-" + dd;

  /**
   * Get data from server
   */
  const getSearchOprions = async () => {
    const result = await instance.request({
      data: {
        data_type: "getSelectData",
        params: {
          selected: searchMethod,
          cityName: formData.city || "",
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    if (searchMethod === "city") setOptions(result.data.searchOption);
    else setStreetOptions(result.data.searchOption);
  };

  /**
   * Handle input event change
   * @param {*} event
   */
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (
      name === "price" ||
      name === "numberOfRooms" ||
      name === "area" ||
      name === "floor" ||
      name === "appartmentNumber" ||
      name === "maxFloor" ||
      name === "price" ||
      name === "localTax" ||
      name === "houseTax"
    ) {
      if (
        isNaN(value) ||
        event.target.value == "00" ||
        event.target.value == "--" ||
        event.target.value == "e" ||
        (event.target.value[0] == "0" && event.target.value.length > 1)
      )
        return;
    }
    if (
      (name === "area" || name === "price" || name === "numberOfRooms") &&
      event.target.value[0] == "0"
    ) {
      //area and price and number of rooms cant be 0
      return;
    }
    setFormData((values) => ({ ...values, [name]: value }));
  };

  /**
   * Handle city input event change
   * @param {*} event
   */
  const handleChangeCity = (event) => {
    const value = event.label;
    const enCity = event.value;
    setFormData((values) => ({ ...values, city: value, enCity: enCity }));
    setSelectedOption(event);
  };
  /**
   * Handle street input event change
   * @param {*} event
   */
  const handleChangeStreet = (event) => {
    const value = event.label;
    setFormData((values) => ({ ...values, street: value }));
    setStreetSelectedOption(event);
  };

  /**
   * On render, first get list of all citys
   * Then when user select city, get all streets in the selected steet
   */
  useLayoutEffect(() => {
    if (selectedOption === null) {
      setSearchMethod("city");
    } else {
      setStreetSelectedOption(null);
      setSearchMethod("street");
    }
    getSearchOprions();
  }, [selectedOption]);

  return (
    <div className="stepTwo">
      <div>
        <h3>?????????</h3>
        <Select
          className="selectStyle"
          name="city"
          value={selectedOption || ""}
          onChange={handleChangeCity}
          options={options}
          autoFocus={true}
          aria-label="???? ??????"
          captureMenuScroll={true} // When the user reaches the top/bottom of the menu, prevent scroll on the scroll-parent
          placeholder="??????"
        />
        <Select
          className="selectStyle"
          name="street"
          value={streetSelectedOption || ""}
          onChange={handleChangeStreet}
          options={streetOptions}
          aria-label="???? ????????"
          captureMenuScroll={true} // When the user reaches the top/bottom of the menu, prevent scroll on the scroll-parent
          placeholder="????????"
        />
        <div className="inputStyleStepTwo">
          <input
            type="text"
            placeholder="????????"
            className="rounded-input"
            name="appartmentNumber"
            value={formData.appartmentNumber || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="??????????"
            className="rounded-input"
            name="appartmentEntrance"
            value={formData.appartmentEntrance || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="????????"
            className="rounded-input"
            name="floor"
            value={formData.floor || ""}
            onChange={handleChange}
          />
          <span> ???????? </span>
          <input
            type="text"
            placeholder="???? ????????"
            className="rounded-input"
            name="maxFloor"
            value={formData.maxFloor || ""}
            onChange={handleChange}
          />
        </div>
        <div className="inputStyleStepTwo">
          <input
            type="text"
            placeholder="???????? ??????????"
            className="rounded-input"
            name="numberOfRooms"
            value={formData.numberOfRooms || ""}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <h3>?????? ???????</h3>
        <div className="stepTwoCheckBox">
          <div>
            <input
              type="radio"
              id="assetType_control_01"
              name="assetType"
              value="?????? ????????"
              onChange={handleChange}
              checked={"?????? ????????" === formData.assetType}
            />
            <label htmlFor="assetType_control_01">
              <h3>?????? ????????</h3>
              <p>???????? ????????, ????????' ???????? </p>
            </label>
          </div>

          <div>
            <input
              type="radio"
              id="assetType_control_02"
              name="assetType"
              value="????????"
              onChange={handleChange}
              checked={"????????" === formData.assetType}
            />
            <label htmlFor="assetType_control_02">
              <h3>????????</h3>
              <p>????????, ???????? ????, ?????????????? ??????'</p>
            </label>
          </div>
        </div>
      </div>
      <div>
        <h3>?????????</h3>
        <div className="stepTwoCheckBox">
          <div>
            <input
              type="radio"
              id="assetEntry_control_01"
              name="assetEntry"
              value="??????????"
              onChange={handleChange}
              checked={"??????????" === formData.assetEntry}
            />
            <label htmlFor="assetEntry_control_01">
              <h3>??????????</h3>
              <p>???????????? ???????? ??????????????</p>
            </label>
          </div>

          <div>
            <input
              type="radio"
              id="assetEntry_control_02"
              name="assetEntry"
              value="????????"
              onChange={handleChange}
              checked={"????????" === formData.assetEntry}
            />
            <label htmlFor="assetEntry_control_02">
              <h3>????????</h3>
              <p>?????????????? ???????????? ????????????</p>
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="assetEntry_control_03"
              name="assetEntry"
              value="??????????"
              onChange={handleChange}
              checked={"??????????" === formData.assetEntry}
            />
            <label htmlFor="assetEntry_control_03">
              <h3>??????????</h3>
              <p>???? ?????????? ?????????? ????????????</p>
            </label>
          </div>
        </div>
        {"??????????" === formData.assetEntry ? (
          <input
            type="date"
            className="rounded-input"
            name="entryDate"
            value={formData.entryDate || ""}
            onChange={handleChange}
            min={todayDate}
          />
        ) : (
          <></>
        )}
      </div>
      <div>
        <h4>?????? ????"??</h4>
        <div className="inputStyleStepTwo">
          <input
            type="text"
            className="rounded-input"
            placeholder="?????? ??????"
            name="area"
            value={formData.area || ""}
            onChange={handleChange}
          />
        </div>
        <h4>???????? ?????????? (??"??)?</h4>
        <div className="inputStyleStepTwo">
          <input
            type="text"
            className="rounded-input"
            placeholder="????????"
            name="price"
            value={formData.price || ""}
            onChange={handleChange}
          />
          <h4>?????????????? ???????????? (??"??)?</h4>
          <input
            type="text"
            className="rounded-input"
            placeholder="????????????"
            name="localTax"
            value={formData.localTax || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            className="rounded-input"
            placeholder="?????? ??????"
            name="houseTax"
            value={formData.houseTax || ""}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
