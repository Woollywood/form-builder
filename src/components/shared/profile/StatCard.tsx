import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface IStatCard {
	title: string;
	value: string;
	description: string;
	icon: React.ReactNode;
}

type StatCardProps = IStatCard & React.HTMLAttributes<HTMLDivElement>;

export const StatCard: React.FC<StatCardProps> = ({ title, value, description, icon, className, ...props }) => {
	return (
		<Card className={cn('min-h-stat-card-min-height', className)} {...props}>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-sm font-medium text-muted-foreground'>{title}</CardTitle>
				{icon}
			</CardHeader>
			<CardContent>
				<div className='text-2xl font-bold'>{value}</div>
				<p className='pt-1 text-xs text-muted-foreground'>{description}</p>
			</CardContent>
		</Card>
	);
};
