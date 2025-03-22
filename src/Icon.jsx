import React from "react";

const Icon = ({ iconCode }) => {
  return <img src={`http://openweathermap.org/img/wn/${iconCode}@2x.png`} />;
};

export default Icon;
