import React from "react";
import Event from "./Event";
import CityHarvest from "../assets/City Harvest.png";
import WildLife from "../assets/Wildlife.png";
import NYC from "../assets/NewYorkCares.png";
import GodsLoves from "../assets/godsloves.jpg";
import NYCParks from "../assets/nyc_parks.jpg";
import FoodsBanks from "../assets/foodsbanks.jpg";
import RedCross from "../assets/redcross.jpeg";
import UN from "../assets/UN.jpg";
import PeaceCrops from "../assets/PeaceCrops.png";
import IRC from "../assets/IRC.png";

const Organizations = () => {
  return (
    <>
      <Event
        img={CityHarvest}
        name={"City Harvest"}
        location={"New York, NY"}
        link={"https://www.cityharvest.org/volunteer/"}
      />

      <Event
        img={WildLife}
        name={"Wildlife Conservation Society"}
        location={"Bronx, New York"}
        link={"https://bronxzoo.com/volunteering"}
      />

      <Event
        img={NYC}
        name={"New York Cares"}
        location={"New York, NY"}
        link={"https://www.newyorkcares.org/home"}
      />

      <Event
        img={GodsLoves}
        name={"God's Love We Deliver"}
        location={"New York, NY"}
        link={"https://www.glwd.org/volunteer/individuals/"}
      />
      <Event
        img={NYCParks}
        name={"NYC Parks"}
        location={"New York, NY"}
        link={"https://www.nycgovparks.org/opportunities/volunteer"}
      />

      <Event
        img={FoodsBanks}
        name={"Food Bank For New York City"}
        location={"New York, NY"}
        link={"https://www.foodbanknyc.org/volunteer/"}
      />
      <Event
        img={RedCross}
        name={"American Red Cross"}
        location={"NY+International Volunteering"}
        link={
          "https://www.redcross.org/local/new-york/greater-new-york/volunteer.html?srsltid=AfmBOoo7O_wB_JbZfr06gp2woH2m5aej5vFU-D0k8mBHAeMHv1HsxGDR"
        }
      />
      <Event
        img={UN}
        name={"United Nations Volunteering"}
        location={"NY+International Volunteering"}
        link={"https://www.unv.org/"}
      />
      <Event
        img={PeaceCrops}
        name={"Peace Corps"}
        location={"International Volunteering"}
        link={"https://www.peacecorps.gov/ways-to-serve/serve-with-us/"}
      />
      <Event
        img={IRC}
        name={"International Rescue Committee"}
        location={"NY+International Volunteering"}
        link={"https://www.rescue.org/volunteer"}
      />
    </>
  );
};
export default Organizations;
