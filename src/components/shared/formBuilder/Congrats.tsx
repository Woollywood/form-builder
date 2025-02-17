'use client';

import React from 'react';
import Link from 'next/link';
import Confetti from 'react-confetti';
import { Form } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

type Props = Form;

export const Congrats: React.FC<Props> = ({ id, shareURL }) => {
	const _shareURL = `${window.location.origin}/submit/${shareURL}`;
	const { toast } = useToast();
	const onClick = () => {
		navigator.clipboard.writeText(_shareURL);
		toast({
			title: 'Copied!',
			description: 'Link copied to clipboard',
		});
	};
	return (
		<>
			<Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} />
			<div className='flex size-full flex-col items-center justify-center'>
				<div className='max-w-md'>
					<h1 className='mb-4 border-b pb-4 text-center text-4xl font-bold text-primary'>Form Published!</h1>
					<h2 className='text-center text-2xl'>Share this form</h2>
					<h3 className='border-b pb-10 text-xl text-muted-foreground'>
						Anyone with the link can view and submit the form
					</h3>
					<div className='my-4 flex w-full flex-col items-center gap-2 border-b pb-4'>
						<Input className='w-full' readOnly value={_shareURL} />
						<Button className='mt-2 w-full' onClick={onClick}>
							Copy link
						</Button>
					</div>
					<div className='flex justify-between'>
						<Button variant='link' asChild>
							<Link href='/'>
								<BsArrowLeft />
								Go back home
							</Link>
						</Button>
						<Button variant='link' asChild>
							<Link href={`/forms/${id}`}>
								Form details
								<BsArrowRight />
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};
