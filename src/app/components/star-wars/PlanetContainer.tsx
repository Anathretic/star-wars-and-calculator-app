import { Planets } from '../../models/starwars.models';

interface Planet {
	data: Planets;
}

export const PlanetContainer: React.FC<Planet> = ({ data }) => {
	return (
		<div className='p-4 m-4 text-center w-full max-w-[600px] rounded-xl bg-orange-950'>
			<h3 className='p-2 pb-6 text-2xl'>{data.name}</h3>
			<p className='p-2'>
				Rotation period: <br />
				{data.rotation_period}
			</p>
			<hr />
			<p className='p-2'>
				Orbital period: <br />
				{data.orbital_period}
			</p>
			<hr />
			<p className='p-2'>
				Diameter: <br />
				{data.diameter}
			</p>
			<hr />
			<p className='p-2'>
				Climate: <br />
				{data.climate !== 'unknown'
					? data.climate
							.split(', ')
							.map(string => string.charAt(0).toUpperCase() + string.slice(1))
							.join(', ')
					: data.climate}
			</p>
			<hr />
			<p className='p-2'>
				Gravity: <br />
				{data.gravity}
			</p>
			<hr />
			<p className='p-2'>
				Terrain: <br />
				{data.terrain !== 'unknown'
					? data.terrain
							.split(', ')
							.map(string => string.charAt(0).toUpperCase() + string.slice(1))
							.join(', ')
					: data.terrain}
			</p>
			<hr />
			<p className='p-2'>
				Surface water: <br />
				{data.surface_water}
			</p>
			<hr />
			<p className='p-2'>
				Population: <br />
				{data.population}
			</p>
		</div>
	);
};
