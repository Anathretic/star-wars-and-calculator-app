'use client';
import Link from 'next/link';
import * as math from 'mathjs';
import { MouseEvent, useEffect, useState } from 'react';
import { numberButtons, symbolButtons } from './buttons';

type Event = MouseEvent<HTMLInputElement>;

export default function Page() {
	const [showValue, setShowValue] = useState('');
	const [blockNumberButtons, setBlockNumberButtons] = useState(false);
	const [blockSymbolButtons, setBlockSymbolButtons] = useState(true);

	const calculate = async () => {
		try {
			const result = (await math.evaluate(showValue)) || '';
			setBlockNumberButtons(true);
			setShowValue(result.toString());
		} catch (err) {
			setBlockNumberButtons(true);
			setBlockSymbolButtons(true);
			setShowValue('You blocked it.. Click C!');
		}
	};

	const handleSqrtAndPow = (buttonValue: string) => {
		const num = Number(showValue);

		if (num) {
			if (buttonValue === '√') {
				const result = Math.sqrt(num);
				setShowValue(result.toString());
			} else if (buttonValue === 'x²') {
				const result = Math.pow(num, 2);
				setShowValue(result.toString());
			}
		} else {
			setBlockSymbolButtons(true);
			setBlockNumberButtons(true);
			setShowValue('Error.. Click C!');
		}
	};

	const handleValue = async (e: Event) => {
		const buttonValue = e.currentTarget.value;

		if (buttonValue === '=') {
			await calculate();
		} else if (buttonValue === '√' || buttonValue === 'x²') {
			handleSqrtAndPow(buttonValue);
		} else {
			setShowValue(showValue.concat(buttonValue));
		}
	};

	const resetValue = () => {
		setShowValue('');
		setBlockNumberButtons(false);
		setBlockSymbolButtons(true);
	};

	console.log(blockNumberButtons);
	console.log(blockSymbolButtons);

	return (
		<div>
			<h1 className='p-4 text-2xl'>Calculator</h1>
			<div>
				<input type='text' className='p-2 m-2 pointer-events-none text-black' value={showValue} readOnly />
				<div>
					{numberButtons.map(data => (
						<input
							key={data.value}
							type='button'
							value={data.value}
							className={`p-2 m-2 border ${blockNumberButtons && 'pointer-events-none bg-gray-700'}`}
							onClick={e => {
								handleValue(e);
								setBlockSymbolButtons(false);
							}}
						/>
					))}
					{symbolButtons.map(data => (
						<input
							key={data.value}
							type='button'
							value={data.value}
							className={`p-2 m-2 border ${blockSymbolButtons && 'pointer-events-none bg-gray-700'}`}
							onClick={e => {
								setBlockNumberButtons(false);
								handleValue(e);
							}}
						/>
					))}
					<input type='button' value='C' className={'p-2 m-2 border'} onClick={resetValue} />
				</div>
			</div>
			<Link className='p-2 m-2' href='/'>
				Home
			</Link>
		</div>
	);
}
