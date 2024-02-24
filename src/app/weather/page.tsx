import Link from 'next/link';

export default function Page() {
	return (
		<div>
			<h1 className='p-4 text-2xl'>Weather</h1>
			<Link className='p-2 m-2' href='/'>
				Home
			</Link>
		</div>
	);
}
