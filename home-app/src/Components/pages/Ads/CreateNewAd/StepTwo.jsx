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
    { value: formData.enCity, label: formData.city } || null
  );

  /**
   * useState for street option
   */
  const [streetOptions, setStreetOptions] = useState([{}]);
  const [streetSelectedOption, setStreetSelectedOption] = useState(
    { value: formData.street_code, label: formData.street } || null
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
      if (isNaN(value)) return;
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
        <div className="inputStyleStepTwo">
          <input
            type="text"
            placeholder="מספר"
            className="rounded-input"
            name="appartmentNumber"
            value={formData.appartmentNumber || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="כניסה"
            className="rounded-input"
            name="appartmentEntrance"
            value={formData.appartmentEntrance || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="קומה"
            className="rounded-input"
            name="floor"
            value={formData.floor || ""}
            onChange={handleChange}
          />
          <span> מתוך </span>
          <input
            type="text"
            placeholder="עד קומה"
            className="rounded-input"
            name="maxFloor"
            value={formData.maxFloor || ""}
            onChange={handleChange}
          />
        </div>
        <div className="inputStyleStepTwo">
          <input
            type="text"
            placeholder="מספר חדרים"
            className="rounded-input"
            name="numberOfRooms"
            value={formData.numberOfRooms || ""}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <h3>סוג נכס?</h3>
        <div className="stepTwoCheckBox">
          <div>
            <input
              type="radio"
              id="assetType_control_01"
              name="assetType"
              value="בית פרטי"
              onChange={handleChange}
              checked={"בית פרטי" === formData.assetType}
            />
            <label htmlFor="assetType_control_01">
              <h3>בית פרטי</h3>
              <p>צמוד קרקע, קוטג' וילה </p>
            </label>
          </div>

          <div>
            <input
              type="radio"
              id="assetType_control_02"
              name="assetType"
              value="דירה"
              onChange={handleChange}
              checked={"דירה" === formData.assetType}
            />
            <label htmlFor="assetType_control_02">
              <h3>דירה</h3>
              <p>דירה, דירת גן, פנטהאוז וכו'</p>
            </label>
          </div>
        </div>
      </div>
      <div>
        <h3>למתי?</h3>
        <div className="stepTwoCheckBox">
          <div>
            <input
              type="radio"
              id="assetEntry_control_01"
              name="assetEntry"
              value="מיידי"
              onChange={handleChange}
              checked={"מיידי" === formData.assetEntry}
            />
            <label htmlFor="assetEntry_control_01">
              <h3>מיידי</h3>
              <p>סוגרים חוזה ונכנסים</p>
            </label>
          </div>

          <div>
            <input
              type="radio"
              id="assetEntry_control_02"
              name="assetEntry"
              value="גמיש"
              onChange={handleChange}
              checked={"גמיש" === formData.assetEntry}
            />
            <label htmlFor="assetEntry_control_02">
              <h3>גמיש</h3>
              <p>תאריכים גמישים לכניסה</p>
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="assetEntry_control_03"
              name="assetEntry"
              value="עתידי"
              onChange={handleChange}
              checked={"עתידי" === formData.assetEntry}
            />
            <label htmlFor="assetEntry_control_03">
              <h3>עתידי</h3>
              <p>יש תאריך מדויק לכניסה</p>
            </label>
          </div>
        </div>
        {"עתידי" === formData.assetEntry ? (
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
        <h4>שטח במ"ר</h4>
        <div className="inputStyleStepTwo">
          <input
            type="number"
            className="rounded-input"
            placeholder="סהכ שטח"
            name="area"
            value={formData.area || ""}
            onChange={handleChange}
          />
        </div>
        <h4>מחיר מבוקש (ש"ח)?</h4>
        <div className="inputStyleStepTwo">
          <input
            type="number"
            className="rounded-input"
            placeholder="מחיר"
            name="price"
            value={formData.price || ""}
            onChange={handleChange}
          />
          <h4>תשלומים נוספים (ש"ח)?</h4>
          <input
            type="number"
            className="rounded-input"
            placeholder="ארנונה"
            name="localTax"
            value={formData.localTax || ""}
            onChange={handleChange}
          />
          <input
            type="number"
            className="rounded-input"
            placeholder="ועד בית"
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
