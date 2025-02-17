'use client';

import React, { useEffect, useState } from 'react';
import { Form } from '@prisma/client';
import { Button } from '../ui/button';

type Props = Pick<Form, 'shareURL'>;

export const Visit: React.FC<Props> = ({ shareURL }) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	const _shareURL = `${window.location.origin}/submit/${shareURL}`;
	return (
		<Button className='w-[12.5rem]' onClick={() => window.open(_shareURL, '_blank')}>
			Visit
		</Button>
	);
};
