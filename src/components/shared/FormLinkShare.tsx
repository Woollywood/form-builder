'use client';

import React, { useEffect, useState } from 'react';
import { Form } from '@prisma/client';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ImShare } from 'react-icons/im';
import { useToast } from '@/hooks/use-toast';

type Props = Pick<Form, 'shareURL'>;

export const FormLinkShare: React.FC<Props> = ({ shareURL }) => {
	const { toast } = useToast();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	const _shareURL = `${window.location.origin}/submit/${shareURL}`;
	const onClick = () => {
		navigator.clipboard.writeText(_shareURL);
		toast({
			title: 'Copied',
			description: 'Link copied to clipboard',
		});
	};
	return (
		<div className='flex flex-grow items-center gap-4'>
			<Input value={_shareURL} readOnly />
			<Button className='max-w-[15.625rem]' onClick={onClick}>
				<ImShare className='mr-2 size-4' />
				Share Link
			</Button>
		</div>
	);
};
