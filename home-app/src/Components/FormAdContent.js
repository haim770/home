import React, { useState, useEffect } from "react";
import Button from "./Button";
import instance from "../api/AxiosInstance";
function FormAdContent(props) {
const [masters,setMasters]=useState("");
const [mastersComp,setMastersComp]=useState({});
  const [inputs, setInputs] = useState({});
const getMasters = async () => {
    const result = await instance.request({
      data: {
        data_type: "getAllMasters",
      },
    });
    console.log(result.data);
    setMasters(result.data);
  }
useEffect(() => {
  getMasters();
  let x={};
}, []);
const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await instance.request({
      data: {
        data_type: "insertNewAd",
        params: inputs,
      },
    });
    console.log(result);
  };
const makeFormOfAdContent=()=>{
  let code=[];
    for (let index = 0; index < masters.length; index++) {
      if(masters[index].display_type==="checkBox"){
      code.push(
          <label key={masters[index].name+masters[index].adID}>
            <span>enter {masters[index].name}</span>
            <input
              type="checkBox"
              name={masters[index].name}
              id={masters[index].name}
              required={masters[index].required}
              value={inputs.name}
              onChange={handleChange}
            />
          </label>);
          }
          else{
            if(masters[index].min_value||masters[index].max_value){
              code.push(
                <label key={masters[index].name + masters[index].adID}>
                  <span>enter {masters[index].name}</span>
                  <input
                    type="number"
                    min={masters[index].min_value}
                    max={masters[index].max_value}
                    name={masters[index].name}
                    id={masters[index].name}
                    required
                    value={inputs.name}
                    onChange={handleChange}
                  />
                </label>
              );
            }
          else{
            //for text
            code.push(
              <label key={masters[index].name + masters[index].adID}>
                <span>enter {masters[index].name}</span>
                <input
                  type="text"
                  name={masters[index].name}
                  id={masters[index].name}
                  required
                  value={inputs.name}
                  onChange={handleChange}
                />
              </label>
            );
          }
        }
    }
    return code;
}
    
  return (
    <form>
      {masters? console.log(masters[0].adID) : "k"}
      {masters?makeFormOfAdContent() : "no masters yet"}
    </form>
  );
}
FormAdContent.defaultProps = {
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
export default FormAdContent;
