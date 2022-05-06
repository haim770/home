import React, { useState, useEffect } from "react";
import TestAxios from "./TestAxios";

import "../../styles/Main.css";

const Ads = () => {
  /*
  const [adsTop, setAdsTop] = useState(10);
  const [adsMin, setAdsMin] = useState(0);
  const [ads, setAds] = useState(0);*/

  // check when we scroll down to button
  const handleScroll = (e) => {
    // this is the inner height of the HTML page
    const innerHeight = window.innerHeight;
    // get the current Scroll hheight
    const scrollPosition = e.target.documentElement.scrollTop;
    // get full page scrolling height
    const scrollHeight = e.target.documentElement.scrollHeight;

    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight
    );
    if (currentHeight + 1 >= scrollHeight) {
      console.log("Button");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  return (
    <div>
      <p>Ads page</p>
      {/* we need to make and offset var to hold the next batch we want to load <TestAxios data_type="TEST2" params={currentOffset} />*/}
      {<TestAxios data_type="TEST2" params={[]} />}

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, veniam
        quibusdam. Expedita quas autem numquam in odit adipisci at labore est,
        exercitationem ab nesciunt animi minima ipsa, itaque, alias maiores.{" "}
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, veniam
        quibusdam. Expedita quas autem numquam in odit adipisci at labore est,
        exercitationem ab nesciunt animi minima ipsa, itaque, alias maiores.{" "}
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, veniam
        quibusdam. Expedita quas autem numquam in odit adipisci at labore est,
        exercitationem ab nesciunt animi minima ipsa, itaque, alias maiores.{" "}
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, veniam
        quibusdam. Expedita quas autem numquam in odit adipisci at labore est,
        exercitationem ab nesciunt animi minima ipsa, itaque, alias maiores.{" "}
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, veniam
        quibusdam. Expedita quas autem numquam in odit adipisci at labore est,
        exercitationem ab nesciunt animi minima ipsa, itaque, alias maiores.{" "}
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, veniam
        quibusdam. Expedita quas autem numquam in odit adipisci at labore est,
        exercitationem ab nesciunt animi minima ipsa, itaque, alias maiores.{" "}
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, veniam
        quibusdam. Expedita quas autem numquam in odit adipisci at labore est,
        exercitationem ab nesciunt animi minima ipsa, itaque, alias maiores.{" "}
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, veniam
        quibusdam. Expedita quas autem numquam in odit adipisci at labore est,
        exercitationem ab nesciunt animi minima ipsa, itaque, alias maiores.{" "}
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, veniam
        quibusdam. Expedita quas autem numquam in odit adipisci at labore est,
        exercitationem ab nesciunt animi minima ipsa, itaque, alias maiores.{" "}
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, veniam
        quibusdam. Expedita quas autem numquam in odit adipisci at labore est,
        exercitationem ab nesciunt animi minima ipsa, itaque, alias maiores.{" "}
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, veniam
        quibusdam. Expedita quas autem numquam in odit adipisci at labore est,
        exercitationem ab nesciunt animi minima ipsa, itaque, alias maiores.{" "}
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, veniam
        quibusdam. Expedita quas autem numquam in odit adipisci at labore est,
        exercitationem ab nesciunt animi minima ipsa, itaque, alias maiores.{" "}
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, veniam
        quibusdam. Expedita quas autem numquam in odit adipisci at labore est,
        exercitationem ab nesciunt animi minima ipsa, itaque, alias maiores.{" "}
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, veniam
        quibusdam. Expedita quas autem numquam in odit adipisci at labore est,
        exercitationem ab nesciunt animi minima ipsa, itaque, alias maiores.{" "}
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, veniam
        quibusdam. Expedita quas autem numquam in odit adipisci at labore est,
        exercitationem ab nesciunt animi minima ipsa, itaque, alias maiores.{" "}
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, veniam
        quibusdam. Expedita quas autem numquam in odit adipisci at labore est,
        exercitationem ab nesciunt animi minima ipsa, itaque, alias maiores.{" "}
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, veniam
        quibusdam. Expedita quas autem numquam in odit adipisci at labore est,
        exercitationem ab nesciunt animi minima ipsa, itaque, alias maiores.{" "}
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, veniam
        quibusdam. Expedita quas autem numquam in odit adipisci at labore est,
        exercitationem ab nesciunt animi minima ipsa, itaque, alias maiores.{" "}
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, veniam
        quibusdam. Expedita quas autem numquam in odit adipisci at labore est,
        exercitationem ab nesciunt animi minima ipsa, itaque, alias maiores.{" "}
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, veniam
        quibusdam. Expedita quas autem numquam in odit adipisci at labore est,
        exercitationem ab nesciunt animi minima ipsa, itaque, alias maiores.{" "}
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, veniam
        quibusdam. Expedita quas autem numquam in odit adipisci at labore est,
        exercitationem ab nesciunt animi minima ipsa, itaque, alias maiores.{" "}
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, veniam
        quibusdam. Expedita quas autem numquam in odit adipisci at labore est,
        exercitationem ab nesciunt animi minima ipsa, itaque, alias maiores.{" "}
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, veniam
        quibusdam. Expedita quas autem numquam in odit adipisci at labore est,
        exercitationem ab nesciunt animi minima ipsa, itaque, alias maiores.{" "}
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, veniam
        quibusdam. Expedita quas autem numquam in odit adipisci at labore est,
        exercitationem ab nesciunt animi minima ipsa, itaque, alias maiores.{" "}
      </p>
    </div>
  );
};
export default Ads;
