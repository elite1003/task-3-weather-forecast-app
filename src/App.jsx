import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useRef, useState } from "react";
import Weather from "./Weather";
import Forecast from "./Forecast";
import { Button } from "@/components/ui/button";
import { UnitSwitcher } from "./UnitSwitcher";
import useNetworkInformation from "./hooks/useNetworkInformation ";
const App = () => {
  const [city, setCity] = useState("");
  const [isLoading, setLoading] = useState(false);
  const searchInputRef = useRef(null);
  const [isMetric, setUnit] = useState(true);
  const networkState = useNetworkInformation();
  const handleCitySubmit = (e) => {
    e.preventDefault();
    setCity(searchInputRef.current.value);
  };
  const handleDataLoading = (isLoading) => {
    setLoading(isLoading);
  };
  const toggleUnit = () => {
    setUnit((prev) => !prev);
  };
  const unit = isMetric ? "metric" : "imperial";

  return (
    <div
      style={{
        backgroundImage: `url("beautifulField.jpg")`,
        width: "100vw",
        minHeight: "100vh",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {networkState.isOnline ? (
        <div className="w-full max-w-5xl mx-auto p-4">
          <div className="mb-2 bg-transparent ">
            <form onSubmit={handleCitySubmit} className="flex mb-5">
              <Input
                ref={searchInputRef}
                placeholder="Type city name"
                className="mr-4 w-full max-w-sm"
              />
              <Button disabled={isLoading} variant="outline">
                <Search className="opacity-60" />
              </Button>
            </form>
            <div className="flex gap-4 justify-between items-center">
              <h1 className="mb-2 text-2xl font-bold text-gray-200 ">
                {city.toUpperCase()}
              </h1>
              <UnitSwitcher isMetric={isMetric} onClick={toggleUnit} />
            </div>
          </div>
          {city ? (
            <>
              <div className="flex flex-col gap-20 md:flex-row mb-2  md:items-end">
                <Weather
                  city={city}
                  handleDataLoading={handleDataLoading}
                  unit={unit}
                />
                <Forecast
                  city={city}
                  handleDataLoading={handleDataLoading}
                  unit={unit}
                />
              </div>
            </>
          ) : (
            <h1 className="text-white text-xl">
              Enter a city name to see it's weather.
            </h1>
          )}
        </div>
      ) : (
        <h1 className="text-2xl lg:text-3xl text-white p-2 flex justify-center items-center ">
          Internet is not connected.
        </h1>
      )}
    </div>
  );
};

export default App;
