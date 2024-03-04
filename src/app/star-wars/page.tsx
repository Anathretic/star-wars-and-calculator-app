'use client';
import Link from 'next/link';
import { useState } from 'react';
import useSWR from 'swr';
import { People, Planets, Root } from '../models/starwars.models';

type Button = 'planets' | 'people';

const url = 'https://swapi.dev/api/';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function Page() {
	const [buttonValue, setButtonValue] = useState<Button>('planets');
	const [pageNumber, setPageNumber] = useState(1);

	const { data, error, isLoading } = useSWR<Root>(url + buttonValue + `/?page=${pageNumber}`, fetcher);

	if (error) return <div>Failed to load</div>;
	if (isLoading) return <div>Loading...</div>;
	if (data)
		return (
			<div>
				<h1 className='p-4 text-2xl'>Star Wars</h1>
				<div className='p-2'>
					<button
						type='button'
						className='p-2 bg-red-200'
						onClick={() => {
							setButtonValue('people');
							setPageNumber(1);
						}}>
						People
					</button>
					<button
						type='button'
						className='p-2 mx-2 bg-red-200'
						onClick={() => {
							setButtonValue('planets');
							setPageNumber(1);
						}}>
						Planets
					</button>
				</div>
				<div className='p-2'>
					{buttonValue === 'planets' &&
						data.results.map((planet: Planets) => (
							<div key={planet.name}>
								<span>{planet.name}</span>
								<span>{planet.rotation_period}</span>
								<span>{planet.orbital_period}</span>
								<span>{planet.diameter}</span>
								<span>{planet.climate}</span>
								<span>{planet.gravity}</span>
								<span>{planet.terrain}</span>
								<span>{planet.surface_water}</span>
								<span>{planet.population}</span>
							</div>
						))}
					{buttonValue === 'people' &&
						data.results.map((person: People) => (
							<div key={person.name}>
								<span>{person.name}</span>
								<span>{person.height}</span>
								<span>{person.mass}</span>
								<span>{person.hair_color}</span>
								<span>{person.skin_color}</span>
								<span>{person.eye_color}</span>
								<span>{person.birth_year}</span>
								<span>{person.gender}</span>
								<span>{person.homeworld}</span>
							</div>
						))}
					<div>
						<button
							type='button'
							className='p-2 bg-red-200'
							onClick={() => {
								if (data.previous !== null) {
									setPageNumber(pageNumber - 1);
								}
							}}>
							Prev
						</button>
						<button
							type='button'
							className='p-2 m-2 bg-red-200'
							onClick={() => {
								if (data.next !== null) {
									setPageNumber(pageNumber + 1);
								}
							}}>
							Next
						</button>
					</div>
				</div>
				<Link className='p-2 m-2 bg-red-200' href='/'>
					Home
				</Link>
			</div>
		);
}
