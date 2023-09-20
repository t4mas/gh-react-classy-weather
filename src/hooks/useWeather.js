import { useEffect, useState } from 'react';

function convertToFlag(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split('')
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

function useWeather(location) {
	///////////////////////////////////////////////////////////////
	// State
	const [countryName, setCountryName] = useState('');
	const [countryFlag, setCountryFlag] = useState('');

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const [weather, setWeather] = useState(null);

	///////////////////////////////////////////////////////////////
	// 1) Effect: Fetching weather
	useEffect(
		function () {
			const controller = new AbortController();

			async function getWeather() {
				try {
					setIsLoading(true);
					setError('');
					// 1) Getting location (geocoding)
					const geoRes = await fetch(
						`https://geocoding-api.open-meteo.com/v1/search?name=${location}`,
						{ signal: controller.signal }
					);
					const geoData = await geoRes.json();
					// console.log(geoData);

					if (!geoData.results) throw new Error('Location not found');

					const {
						latitude,
						longitude,
						timezone,
						name,
						country_code,
					} = geoData.results.at(0);
					// console.log(`${name} ${convertToFlag(country_code)}`);
					setCountryName(name);
					setCountryFlag(convertToFlag(country_code));

					// 2) Getting actual weather
					const weatherRes = await fetch(
						`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`,
						{ signal: controller.signal }
					);
					const weatherData = await weatherRes.json();
					// console.log(weatherData.daily);
					setWeather(weatherData.daily);
				} catch (err) {
					if (err.name !== 'AbortError') {
						console.error(err);
						setError(err.message);
					}
				} finally {
					setIsLoading(false);
				}
			}

			if (location.length < 2) {
				setError('');
				setWeather(null);
				return;
			}

			getWeather();

			return function () {
				controller.abort();
			};
		},
		[location]
	);

	///////////////////////////////////////////////////////////////
	// 2) Effect: Changing document title
	useEffect(
		function () {
			if (location.length < 2) return;

			document.title = `Weather for ${
				location.charAt(0).toUpperCase() +
				location.substr(1).toLowerCase()
			}`;

			return () => (document.title = 'Classy Weather');
		},
		[location]
	);

	///////////////////////////////////////////////////////////////
	// 3) Effect: Set local storage
	useEffect(
		function () {
			localStorage.setItem('loc', location);
		},
		[location]
	);

	///////////////////////////////////////////////////////////////
	// Final return
	return { weather, countryName, countryFlag, isLoading, error };
}

export { useWeather };
