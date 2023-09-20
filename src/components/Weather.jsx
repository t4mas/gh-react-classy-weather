import Day from './Day';

function Weather({
	weather,
	getWeatherIcon,
	formatDay,
	countryName,
	countryFlag,
}) {
	const {
		temperature_2m_max: max,
		temperature_2m_min: min,
		time: days,
		weathercode: codes,
	} = weather;

	return (
		<div>
			<h2>Weather for {`${countryName} ${countryFlag}`}</h2>
			<ul className="weather">
				{days.map((day, i) => (
					<Day
						max={max.at(i)}
						min={min.at(i)}
						code={codes.at(i)}
						day={day}
						key={i}
						isToday={i === 0}
						getWeatherIcon={getWeatherIcon}
						formatDay={formatDay}
					/>
				))}
			</ul>
		</div>
	);
}

export default Weather;
