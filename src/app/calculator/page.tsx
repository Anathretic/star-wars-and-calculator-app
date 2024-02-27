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
		<div>
			<h1 className='p-4 text-2xl'>Calculator</h1>
			<div>
				<input type='text' className='screen p-2 m-2 pointer-events-none text-black' value={value} readOnly />
				<div>
					{numberButtons.map(data => (
						<input
							key={data.value}
							type='button'
							value={data.value}
							disabled={blockNumberButtons ? true : false}
							className={`number-btn p-2 m-2 border ${blockNumberButtons && 'pointer-events-none bg-gray-700'}`}
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
							disabled={blockSymbolButtons ? true : false}
							className={`symbol-btn p-2 m-2 border ${blockSymbolButtons && 'pointer-events-none bg-gray-700'}`}
							onClick={e => {
								setBlockNumberButtons(false);
								handleValue(e);
							}}
						/>
					))}
					<input type='button' value='C' className={'clear p-2 m-2 border'} onClick={resetValue} />
				</div>
			</div>
			<Link className='p-2 m-2' href='/'>
				Home
			</Link>
		</div>
	);
}
