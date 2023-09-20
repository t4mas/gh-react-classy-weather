function Day({ day, max, min, code, isToday, getWeatherIcon, formatDay }) {
	return (
		<li className="day">
			<span>{getWeatherIcon(code)}</span>
			<p>{isToday ? 'Today' : formatDay(day)}</p>
			<p>
				{Math.floor(min)}&deg; &mdash; <strong>{Math.ceil(max)}</strong>
				&deg;
			</p>
		</li>
	);
}

export default Day;
