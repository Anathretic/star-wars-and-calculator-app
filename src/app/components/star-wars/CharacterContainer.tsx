import { People } from '../../models/starwars.models';
import { HomeworldButton } from './HomeworldButton';

interface Character {
	data: People;
}

export const CharacterContainer: React.FC<Character> = ({ data }) => {
	return (
		<div className='p-4 m-4 text-center w-full max-w-[600px] rounded-xl bg-orange-950'>
			<h3 className='p-2 pb-6 text-2xl'>{data.name}</h3>
			<p className='p-2'>
				Height: <br />
				{data.height !== 'unknown' ? data.height + ' cm' : data.height}
			</p>
			<hr />
			<p className='p-2'>
				Weight: <br />
				{data.mass !== 'unknown' ? data.mass + ' kg' : data.mass}
			</p>
			<hr />
			<p className='p-2'>
				Hair color: <br />
				{data.hair_color !== 'unknown'
					? data.hair_color
							.split(', ')
							.map(string => string.charAt(0).toUpperCase() + string.slice(1))
							.join(', ')
					: data.hair_color}
			</p>
			<hr />
			<p className='p-2'>
				Skin color: <br />
				{data.skin_color !== 'unknown'
					? data.skin_color
							.split(', ')
							.map(string => string.charAt(0).toUpperCase() + string.slice(1))
							.join(', ')
					: data.skin_color}
			</p>
			<hr />
			<p className='p-2'>
				Eyes color: <br />
				{data.eye_color !== 'unknown'
					? data.eye_color.charAt(0).toUpperCase() + data.eye_color.slice(1)
					: data.eye_color}
			</p>
			<hr />
			<p className='p-2'>
				Birth year: <br />
				{data.birth_year}
			</p>
			<hr />
			<p className='p-2'>
				Gender: <br />
				{data.gender !== 'n/a' ? data.gender.charAt(0).toUpperCase() + data.gender.slice(1) : data.gender}
			</p>
			<hr />
			<HomeworldButton link={data.homeworld} />
		</div>
	);
};
