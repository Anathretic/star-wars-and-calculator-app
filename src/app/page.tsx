import Link from 'next/link';

export default function Page() {
	return (
		<div>
			<h1 className='p-4 text-2xl'>Home</h1>
			<Link className='p-2 m-2' href='/calculator'>
				Calculator
			</Link>
			<Link className='p-2 m-2' href='/weather'>
				Weather
			</Link>
		</div>
	);
}
