import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const StatCardsSkeleton: React.FC = () => {
	return (
		<>
			{Array.from({ length: 4 }, (_, i) => (
				<Skeleton key={i} className='min-h-stat-card-min-height w-full' />
			))}
		</>
	);
};
