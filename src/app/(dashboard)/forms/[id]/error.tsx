'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect } from 'react';

const ErrorPage: React.FC<{ error: Error }> = ({ error }) => {
	useEffect(() => {
		console.log(error);
	}, [error]);

	return (
		<div className='flex size-full flex-col items-center justify-center gap-y-4'>
			<h2 className='text-4xl text-destructive'>Something went wrong</h2>
			<Button asChild>
				<Link href='/'>Go back to home</Link>
			</Button>
		</div>
	);
};

export default ErrorPage;
