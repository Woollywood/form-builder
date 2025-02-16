import Link from 'next/link';
import React from 'react';

export const Logo: React.FC = () => {
	return (
		<Link
			href='/'
			className='text- 3xl bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text font-bold text-transparent hover:cursor-pointer'>
			FormBuilder
		</Link>
	);
};
