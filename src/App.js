import { useState } from 'react';
import { useWeather } from './hooks/useWeather';
import Input from './components/Input';
import Loader from './components/Loader';
import Error from './components/Error';
import Weather from './components/Weather';

function getWeatherIcon(wmoCode) {
	const icons = new Map([
		[[0], '☀️'],
		[[1], '🌤'],
		[[2], '⛅️'],
		[[3], '☁️'],
		[[45, 48], '🌫'],
		[[51, 56, 61, 66, 80], '🌦'],
		[[53, 55, 63, 65, 57, 67, 81, 82], '🌧'],
		[[71, 73, 75, 77, 85, 86], '🌨'],
		[[95], '🌩'],
		[[96, 99], '⛈'],
	]);
	const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
	if (!arr) return 'NOT FOUND';
	return icons.get(arr);
}

function formatDay(dateStr) {
	return new Intl.DateTimeFormat('en', {
		weekday: 'short',
	}).format(new Date(dateStr));
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function App() {
	const [location, setLocation] = useState(function () {
		const storedLoc = localStorage.getItem('loc');
		return storedLoc ? storedLoc : '';
	});

	const { countryName, countryFlag, isLoading, error, weather } =
		useWeather(location);

	function handleUpdateLocation(newLocation) {
		setLocation(newLocation);
	}

	return (
		<div className="app">
			<Input
				location={location}
				onUpdateLocation={handleUpdateLocation}
			/>
			{isLoading && <Loader />}
			{error && <Error error={error} />}
			{!isLoading && !error && weather && (
				<Weather
					weather={weather}
					getWeatherIcon={getWeatherIcon}
					formatDay={formatDay}
					countryName={countryName}
					countryFlag={countryFlag}
				/>
			)}
		</div>
	);
}
