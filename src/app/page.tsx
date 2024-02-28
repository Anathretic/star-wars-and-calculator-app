import Link from 'next/link';

const containerClasses = 'flex items-center justify-center w-full h-full bg-cover bg-center';

const linkClasses =
	'py-2 px-16 md:px-20 lg:px-24 md:py-3 lg:p-4 m-2 text-xl md:text-2xl rounded-xl shadow-4xl cursor-pointer';

export default function Page() {
	return (
		<div className='flex flex-col lg:flex-row w-full h-screen'>
			<div className={`${containerClasses} border-b lg:border-r lg:border-b-0 bg-star-wars`}>
				<Link className={`${linkClasses} bg-orange-900 hover:bg-orange-800 duration-300`} href='/star-wars'>
					Star Wars
				</Link>
			</div>
			<div className={`${containerClasses} border-t lg:border-l lg:border-t-0 bg-calculator`}>
				<Link className={`${linkClasses} bg-green-900 hover:bg-green-800 duration-300`} href='/calculator'>
					Calculator
				</Link>
			</div>
		</div>
	);
}
