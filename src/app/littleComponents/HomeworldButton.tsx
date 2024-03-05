import { useState } from 'react';

interface Button {
	link: string;
}

export const HomeworldButton: React.FC<Button> = ({ link }) => {
	const [homeworldButtonValue, setHomeworldButtonValue] = useState('Show it!');

	const getPlanet = async (link: string) => {
		const planetName = await fetch(link)
			.then(res => res.json())
			.then(planet => setHomeworldButtonValue(planet.name))
			.catch(err => {
				if (err) {
					setHomeworldButtonValue('Error!');
				}
			});
		return planetName;
	};

	return (
		<input type='button' onClick={() => getPlanet(link)} value={homeworldButtonValue} className='p-4 bg-red-200 cursor-pointer' />
	);
};
