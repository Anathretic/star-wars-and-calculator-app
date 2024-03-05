'use client';
import Link from 'next/link';
import { useState } from 'react';
import useSWR from 'swr';
import { People, Planets, Root } from '../models/starwars.models';
import { HomeworldButton } from '../littleComponents/HomeworldButton';

type Button = 'planets' | 'people';

const url = 'https://swapi.dev/api/';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function Page() {
	const [buttonValue, setButtonValue] = useState<Button>('planets');
	const [pageNumber, setPageNumber] = useState(1);

	const { data, error, isLoading } = useSWR<Root>(url + buttonValue + `/?page=${pageNumber}`, fetcher);

	return (
		<div className='flex items-center justify-center flex-col min-h-screen bg-star-wars bg-cover bg-fixed'>
			<h1 className='p-4 my-12 text-4xl lg:text-6xl bg-orange-950 shadow-3xl rounded-xl'>Star Wars</h1>
			{error && <div className='min-h-screen'>Failed to load!</div>}
			{isLoading && <div className='min-h-screen'>Loading...</div>}
			{data && (
				<>
					<div className='p-2 text-lg 2xl:text-xl flex max-rsm:flex-col'>
						<button
							type='button'
							className={`p-2 mx-2 w-[128px] 2xl:w-[156px] max-rsm:my-2 rounded-lg ${
								buttonValue === 'people' ? 'pointer-events-none bg-orange-950' : 'bg-orange-900'
							} hover:bg-orange-800 duration-300 shadow-3xl`}
							onClick={() => {
								setButtonValue('people');
								setPageNumber(1);
							}}>
							People
						</button>
						<button
							type='button'
							className={`p-2 mx-2 w-[128px] 2xl:w-[156px] max-rsm:my-2 rounded-lg ${
								buttonValue === 'planets' ? 'pointer-events-none bg-orange-950' : 'bg-orange-900'
							} hover:bg-orange-800 duration-300 shadow-3xl`}
							onClick={() => {
								setButtonValue('planets');
								setPageNumber(1);
							}}>
							Planets
						</button>
					</div>
					<div className='flex justify-center items-center flex-col p-2 w-full lg:text-lg'>
						{buttonValue === 'planets' &&
							data.results.map((planet: Planets) => (
								<div key={planet.name} className='p-4 m-4 text-center w-full max-w-[600px] rounded-xl bg-orange-950'>
									<p className='p-2 pb-6 text-2xl'>{planet.name}</p>
									<p className='p-2'>
										Rotation period: <br />
										{planet.rotation_period}
									</p>
									<hr />
									<p className='p-2'>
										Orbital period: <br />
										{planet.orbital_period}
									</p>
									<hr />
									<p className='p-2'>
										Diameter: <br />
										{planet.diameter}
									</p>
									<hr />
									<p className='p-2'>
										Climate: <br />
										{planet.climate
											.split(', ')
											.map(string => string.charAt(0).toUpperCase() + string.slice(1))
											.join(', ')}
									</p>
									<hr />
									<p className='p-2'>
										Gravity: <br />
										{planet.gravity}
									</p>
									<hr />
									<p className='p-2'>
										Terrain: <br />
										{planet.terrain
											.split(', ')
											.map(string => string.charAt(0).toUpperCase() + string.slice(1))
											.join(', ')}
									</p>
									<hr />
									<p className='p-2'>
										Surface water: <br />
										{planet.surface_water}
									</p>
									<hr />
									<p className='p-2'>
										Population: <br />
										{planet.population}
									</p>
								</div>
							))}
						{buttonValue === 'people' &&
							data.results.map((person: People) => (
								<div key={person.name} className='p-4 m-4 text-center w-full max-w-[600px] rounded-xl bg-orange-950'>
									<p className='p-2 pb-6 text-2xl'>{person.name}</p>
									<p className='p-2'>
										Height: <br />
										{person.height + ' cm'}
									</p>
									<hr />
									<p className='p-2'>
										Weight: <br />
										{person.mass + ' kg'}
									</p>
									<hr />
									<p className='p-2'>
										Hair color: <br />
										{person.hair_color
											.split(', ')
											.map(string => string.charAt(0).toUpperCase() + string.slice(1))
											.join(', ')}
									</p>
									<hr />
									<p className='p-2'>
										Skin color: <br />
										{person.skin_color
											.split(', ')
											.map(string => string.charAt(0).toUpperCase() + string.slice(1))
											.join(', ')}
									</p>
									<hr />
									<p className='p-2'>
										Eyes color: <br />
										{person.eye_color.charAt(0).toUpperCase() + person.eye_color.slice(1)}
									</p>
									<hr />
									<p className='p-2'>
										Birth year: <br />
										{person.birth_year}
									</p>
									<hr />
									<p className='p-2'>
										Gender: <br />
										{person.gender.charAt(0).toUpperCase() + person.gender.slice(1)}
									</p>
									<hr />
									<HomeworldButton link={person.homeworld} />
								</div>
							))}
						<div className='py-4 text-lg 2xl:text-xl flex max-rsm:flex-col-reverse'>
							<button
								type='button'
								className='p-2 mx-2 w-[128px] 2xl:w-[156px] max-rsm:my-2 rounded-lg bg-orange-900 hover:bg-orange-800 duration-300 shadow-3xl'
								onClick={() => {
									if (data.previous !== null) {
										setPageNumber(pageNumber - 1);
									}
								}}>
								Prev
							</button>
							<button
								type='button'
								className='p-2 mx-2 w-[128px] 2xl:w-[156px] max-rsm:my-2 rounded-lg bg-orange-900 hover:bg-orange-800 duration-300 shadow-3xl'
								onClick={() => {
									if (data.next !== null) {
										setPageNumber(pageNumber + 1);
									}
								}}>
								Next
							</button>
						</div>
					</div>
					<Link
						className='p-2 my-8 text-xl bg-orange-900 hover:bg-orange-800 duration-300 w-[156px] text-center rounded-lg shadow-3xl'
						href='/'>
						Home
					</Link>
				</>
			)}
		</div>
	);
}
