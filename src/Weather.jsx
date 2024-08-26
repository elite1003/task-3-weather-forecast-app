const endpoint = import.meta.env.VITE_ENDPOINT_WEATHER;
import { windDegreesToDirection } from "./utils/degreeToDirection";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetch } from "./hooks/useFetch";

const textColor = {
  "01d": "text-black",
  "01n": "text-white",
  "02d": "text-black",
  "02n": "text-white",
  "03d": "text-black",
  "03n": "text-white",
  "04d": "text-white",
  "04n": "text-white",
  "09d": "text-white",
  "09n": "text-white",
  "10d": "text-black",
  "10n": "text-black",
  "11d": "text-black",
  "11n": "text-white",
  "13d": "text-black",
  "13n": "text-black",
  "50d": "text-black",
  "50n": "text-white",
};
const Weather = ({ city, handleDataLoading, unit }) => {
  const { data, isError, error } = useFetch(
    endpoint,
    city,
    handleDataLoading,
    unit
  );
  const iconCode = data?.weather[0].icon;

  return isError ? (
    <p className="text-2xl text-white">{error.message}</p>
  ) : (
    <div className="border-transparent text-gray flex-1 ">
      <h1 className="mb-2 text-2xl font-bold text-white text-center">
        Current Weather
      </h1>
      <div className="flex justify-center">
        <img src={`http://openweathermap.org/img/wn/${iconCode}@2x.png`} />
      </div>
      <Card>
        <div
          className={`px-4 py-2 ${textColor[iconCode]} rounded-t-lg`}
          style={{
            backgroundImage: `url('${iconCode}.jpg')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <CardHeader className="p-0 h-64">
            <CardTitle className="relative">
              <span>{data?.weather[0].main}</span>
            </CardTitle>
            <CardDescription className="text-inherit text-xl">
              {data?.weather.map((w, i) => (
                <span className="block" key={i}>
                  {w.description}
                </span>
              ))}
            </CardDescription>
          </CardHeader>
        </div>
        <div className={`px-4 py-2 text-black bg-slate-200 rounded-b-lg`}>
          <CardContent className="p-0">
            <p className="text-xl">
              Current Temp: {data?.main.temp}&deg;
              {unit === "metric" ? "C" : "F"}
            </p>
          </CardContent>
          <CardContent className="p-0">
            <p>
              Minimum Temp: {data?.main.temp_min}&deg;
              {unit === "metric" ? "C" : "F"}
            </p>
          </CardContent>
          <CardContent className="p-0">
            <p>
              Maximum Temp: {data?.main.temp_max}&deg;
              {unit === "metric" ? "C" : "F"}
            </p>
          </CardContent>
          <CardContent className="p-0">
            <p>Humidity: {data?.main.humidity}</p>
          </CardContent>
          <CardContent className="p-0">
            <p>
              Wind Speed: {data?.wind.speed}{" "}
              {unit === "metric" ? "m/s" : "miles/hour"}
            </p>
            <p>Wind direction: {windDegreesToDirection(data?.wind.deg)}</p>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default Weather;
