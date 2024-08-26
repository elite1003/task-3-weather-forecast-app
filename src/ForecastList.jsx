import { List, Avatar, Carousel } from "flowbite-react";

const ForecastList = ({ items, unit }) => {
  const numberOfitemsPerSlide = 8;
  const slides = [];

  if (items) {
    for (let i = 0; i < items.length; i += numberOfitemsPerSlide) {
      slides.push(
        <List
          unstyled
          className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 text-black "
          key={i}
        >
          {items.slice(i, i + numberOfitemsPerSlide).map((item, index) => (
            <List.Item className="pb-3 sm:pb-4" key={index}>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Avatar
                  img={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={item.weather[0].icon}
                  rounded
                  size="sm"
                  className="bg-gray-400"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium dark:text-white">
                    {item.main.temp}&deg;
                    {unit === "metric" ? "C" : "F"}
                  </p>
                  <p className="truncate text-sm dark:text-gray-400">
                    {item.weather[0].description}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-whitedark:text-white">
                  {item["dt_txt"]}
                </div>
              </div>
            </List.Item>
          ))}
        </List>
      );
    }
  }

  return (
    <Carousel
      className="h-[32rem] max-w-md  p-4 rounded-lg bg-slate-300"
      slide={false}
    >
      {slides}
    </Carousel>
  );
};

export default ForecastList;
