function Input({ location, onUpdateLocation }) {
	return (
		<>
			<h1>Classy Weather</h1>
			<input
				type="text"
				placeholder="Start searching..."
				value={location}
				onChange={(event) => onUpdateLocation(event.target.value)}
			/>
		</>
	);
}

export default Input;
