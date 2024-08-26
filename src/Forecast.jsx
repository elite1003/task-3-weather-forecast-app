const endpoint = import.meta.env.VITE_ENDPOINT_FORECAST;
import ForecastList from "./ForecastList";
import { useFetch } from "./hooks/useFetch";

const Forecast = ({ city, handleDataLoading, unit }) => {
  const { data, isError, error } = useFetch(
    endpoint,
    city,
    handleDataLoading,
    unit
  );
  return isError ? (
    <p className="text-2xl text-white">{error.message}</p>
  ) : (
    <div className="border-transparent flex-1">
      <h1 className="mb-2 text-2xl font-bold text-gray-500 md:text-white text-center">
        5 days Forecast
      </h1>
      <div>
        <ForecastList items={data?.list} unit={unit} />
      </div>
    </div>
  );
};

export default Forecast;
