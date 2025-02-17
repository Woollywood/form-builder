import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const FormCardsSkeleton: React.FC = () => {
	return (
		<>
			{Array.from({ length: 5 }, (_, i) => (
				<Skeleton key={i} className='min-h-form-card-min-height w-full' />
			))}
		</>
	);
};
