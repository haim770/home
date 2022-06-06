import React, {useState} from 'react'
import { useLayoutEffect } from 'react';
import instance from '../../../../api/AxiosInstance';
import useAuth from '../../../../Auth/useAuth';

/**
 * After user fill the ads data, move next to fill the ads contacts detailes
 * @returns 
 */
const StepThree = ({ formData, setFormData ,formDataStepThree, setFormDataStepThree}) => {
  const { auth } = useAuth();

  /**
   * search method, buy or rent
   */
  const [searchMethod, setSearchMethod] = useState(formData.assetOption || "");

    const [adContacts, setAdContacts] = useState([]);
  /**
   * Get data from server
   */
  const getAdAdditionalParams = async () => {
    const result = await instance.request({
      data: {
        data_type: "getAdditionalAdContactData",
        params: {
          type: searchMethod,
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
            setAdContacts([
              Object.values(result.data.result).map(
                (anObjectMapped, index) => {
                  return {
                    key: anObjectMapped["element_id"],
                    contactData: anObjectMapped,
                  };
                }
              ),
            ]);

  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormDataStepThree((values) => ({ ...values, [name]: value }));
  };

  /**
   * get the additional data
   */
  useLayoutEffect(()=>{
    getAdAdditionalParams(); 
  },[]);
  return (
    <div className="inputStyleStepTwo">
      {adContacts.map((contact) => (
        <>
          {contact.map((element) =>
            element.contactData.display_type === "text" ? (
              <>
                <input
                  type={element.contactData.display_type}
                  placeholder={element.contactData.free_text}
                  className="rounded-input"
                  name={element.contactData.element_id}
                  onChange={handleChange}
                />
              </>
            ) : (
              <>
                <div>
                  <input
                    type={element.contactData.display_type}
                    placeholder={element.contactData.free_text}
                    className="rounded-input"
                    name={element.contactData.element_id}
                    onChange={handleChange}
                    id={element.contactData.element_id}
                  />
                  <label htmlFor={element.contactData.element_id}>
                    {element.contactData.free_text}
                  </label>
                  {handleChange()}
                </div>
              </>
            )
          )}
        </>
      ))}
    </div>
  );
};

export default StepThree