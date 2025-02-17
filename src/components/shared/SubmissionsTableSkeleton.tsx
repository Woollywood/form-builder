import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Skeleton } from '../ui/skeleton';

const COLS = 10;
const ROWS = 6;

export const SubmissionsTableSkeleton: React.FC = () => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					{Array.from({ length: 10 }, (_, index) => (
						<TableHead key={index} className='py-1'>
							<Skeleton className='size-full' />
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{Array.from({ length: ROWS }, (_, index) => (
					<TableRow key={index}>
						{Array.from({ length: COLS }, (_, _index) => (
							<TableCell key={_index}>
								<Skeleton className='size-full h-[2.25rem]' />
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
