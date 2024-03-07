'use client';
import Link from 'next/link';
import { useState } from 'react';
import useSWR from 'swr';
import { ThreeCircles } from 'react-loader-spinner';
import { TiDelete } from 'react-icons/ti';
import { People, Planets } from '../models/starwars.models';
import { PlanetContainer } from '../components/star-wars/PlanetContainer';
import { CharacterContainer } from '../components/star-wars/CharacterContainer';

type Button = 'planets' | 'people';

type Root = any[];

const url = 'https://swapi.info/api/';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function Page() {
	const [buttonValue, setButtonValue] = useState<Button>('planets');

	const { data, error, isLoading } = useSWR<Root>(url + buttonValue, fetcher);

	return (
		<div className='flex items-center justify-center flex-col min-h-screen bg-star-wars bg-cover bg-fixed'>
			{error && (
				<div className='min-h-screen flex justify-center items-center'>
					<div className='flex items-center flex-col p-4 bg-orange-600 rounded-xl shadow-3xl text-center mx-2 my-12'>
						<TiDelete size='5em' />
						<p className='my-8 text-lg'>Server is down! Try again later..</p>
					</div>
				</div>
			)}
			{isLoading && (
				<div className='flex justify-center items-center min-h-screen'>
					<div className='p-4 bg-orange-950 rounded-xl shadow-3xl'>
						<ThreeCircles color='#ea580c' />
					</div>
				</div>
			)}
			{data && (
				<>
					<h1 className='p-4 my-12 text-4xl lg:text-6xl bg-orange-950 shadow-3xl rounded-xl'>Star Wars</h1>
					<div className='p-2 text-lg 2xl:text-xl flex max-rsm:flex-col'>
						<button
							type='button'
							className={`people-button p-2 mx-2 w-[128px] 2xl:w-[156px] max-rsm:my-2 rounded-lg ${
								buttonValue === 'people' ? 'pointer-events-none bg-orange-950' : 'bg-orange-900'
							} hover:bg-orange-800 duration-300 shadow-3xl`}
							disabled={buttonValue === 'people' ? true : false}
							onClick={() => {
								setButtonValue('people');
							}}>
							People
						</button>
						<button
							type='button'
							className={`planets-button p-2 mx-2 w-[128px] 2xl:w-[156px] max-rsm:my-2 rounded-lg ${
								buttonValue === 'planets' ? 'pointer-events-none bg-orange-950' : 'bg-orange-900'
							} hover:bg-orange-800 duration-300 shadow-3xl`}
							disabled={buttonValue === 'planets' ? true : false}
							onClick={() => {
								setButtonValue('planets');
							}}>
							Planets
						</button>
					</div>
					<div className='flex justify-center items-center flex-col p-2 w-full lg:text-lg'>
						{buttonValue === 'planets' &&
							data.map((planet: Planets) => <PlanetContainer key={planet.name} data={planet} />)}
						{buttonValue === 'people' &&
							data.map((character: People) => <CharacterContainer key={character.name} data={character} />)}
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
