import { useState } from 'react';

interface Button {
	link: string;
}

export const HomeworldButton: React.FC<Button> = ({ link }) => {
	const [homeworldButtonValue, setHomeworldButtonValue] = useState('Homeworld');

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
		<input
			type='button'
			onClick={() => getPlanet(link)}
			value={homeworldButtonValue}
			className={`px-6 py-2 m-4 hover:bg-orange-800 duration-300 shadow-xl cursor-pointer rounded-xl w-[156px] ${
				homeworldButtonValue !== 'Homeworld' ? 'pointer-events-none bg-orange-950 shadow-none' : 'bg-orange-900 shadow-xl'
			}`}
		/>
	);
};
