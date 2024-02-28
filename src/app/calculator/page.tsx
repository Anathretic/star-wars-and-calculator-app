'use client';
import Link from 'next/link';
import { MouseEvent, useState } from 'react';
import * as math from 'mathjs';
import { numberButtons, symbolButtons } from './buttons';

type Event = MouseEvent<HTMLInputElement>;

const errorMessage = 'You blocked it.. Click C!';

export default function Page() {
	const [value, setValue] = useState('');
	const [blockNumberButtons, setBlockNumberButtons] = useState(false);
	const [blockSymbolButtons, setBlockSymbolButtons] = useState(true);

	const calculate = async () => {
		try {
			const result = (await math.evaluate(value)) || '';
			setBlockNumberButtons(true);
			setValue(result.toString());
		} catch (err) {
			setBlockNumberButtons(true);
			setBlockSymbolButtons(true);
			setValue(errorMessage);
		}
	};

	const handleSqrtAndPow = (buttonValue: string) => {
		let result: number;
		const num = Number(value);

		if (num) {
			if (buttonValue === '√') result = Math.sqrt(num);
			if (buttonValue === 'x²') result = Math.pow(num, 2);
			setValue(result!.toString());
		} else {
			setBlockNumberButtons(true);
			setBlockSymbolButtons(true);
			setValue(errorMessage);
		}
	};

	const handleValue = (e: Event) => {
		const buttonValue = e.currentTarget.value;

		if (buttonValue === '=') {
			calculate();
		} else if (buttonValue === '√' || buttonValue === 'x²') {
			handleSqrtAndPow(buttonValue);
		} else {
			setValue(value.concat(buttonValue));
		}
	};

	const resetValue = () => {
		setValue('');
		setBlockNumberButtons(false);
		setBlockSymbolButtons(true);
	};

	return (
		<div className='bg-calculator min-h-screen flex justify-center items-center flex-col lg:text-2xl'>
			<div className='w-full max-w-[490px] 2xl:max-w-[550px] py-2 my-2 bg-gray-700 rounded-2xl shadow-3xl'>
				<h1 className='py-8 text-3xl lg:text-4xl flex justify-center'>Calculator</h1>
				<div className='w-full max-w-md mx-auto p-2'>
					<input
						type='text'
						className='screen pointer-events-none screen p-2 lg:py-3 my-2 bg-white border border-gray-300 rounded-md shadow-sm text-black w-full'
						value={value}
						readOnly
					/>
					<div className='grid grid-cols-2 gap-2 p-2'>
						<div className='grid grid-cols-2 gap-2 special-direction'>
							{numberButtons
								.map(data => (
									<input
										key={data.value}
										type='button'
										value={data.value}
										disabled={blockNumberButtons ? true : false}
										className={`number-btn p-2 border border-gray-300 rounded-md bg-gray-400 hover:bg-gray-500
										duration-300 cursor-pointer ${blockNumberButtons && 'pointer-events-none bg-gray-500 text-gray-500'}`}
										onClick={e => {
											handleValue(e);
											setBlockSymbolButtons(false);
										}}
									/>
								))
								.reverse()}
						</div>
						<div className='grid grid-cols-2 grid-rows-5 gap-2'>
							<input
								type='button'
								value='C'
								className={
									'col-span-2 clear p-2 border border-gray-300 rounded-md bg-red-700 hover:bg-red-900 duration-300 cursor-pointer'
								}
								onClick={resetValue}
							/>
							{symbolButtons.map(data => (
								<input
									key={data.value}
									type='button'
									value={data.value}
									disabled={blockSymbolButtons ? true : false}
									className={`symbol-btn p-2 border border-gray-300 rounded-md bg-gray-600 hover:bg-gray-700 duration-300 cursor-pointer ${
										blockSymbolButtons && 'pointer-events-none bg-white text-white'
									}`}
									onClick={e => {
										setBlockNumberButtons(false);
										handleValue(e);
									}}
								/>
							))}
						</div>
					</div>
				</div>
				<Link
					className='clear p-2 mx-auto my-12 max-w-[250px] 2xl:max-w-[320px] 2xl:py-3 flex justify-center w-1/2 border border-gray-300 rounded-md hover:bg-gray-800 duration-300 cursor-pointer'
					href='/'>
					Home
				</Link>
			</div>
		</div>
	);
}
