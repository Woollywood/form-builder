'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

const ErrorPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();

	return (
		<div className='flex size-full flex-col items-center justify-center gap-y-4'>
			<h2 className='text-4xl text-destructive'>Not found form with id {id}</h2>
			<Button asChild>
				<Link href='/'>Go back to home</Link>
			</Button>
		</div>
	);
};

export default ErrorPage;
