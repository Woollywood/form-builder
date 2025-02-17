import React from 'react';
import { LuView } from 'react-icons/lu';
import { FaWpforms } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { TbArrowBounce } from 'react-icons/tb';
import { IStatCard, StatCard } from './StatCard';

interface Props {
	visits: number;
	submissions: number;
}

export const StatCards: React.FC<Props> = async ({ visits, submissions }) => {
	const submissionRate = visits > 0 ? (submissions / visits) * 100 : 0;
	const bounceRate = 100 - submissionRate;

	const cards: IStatCard[] = [
		{
			title: 'Total visits',
			description: 'All time form visits',
			value: String(visits),
			icon: <LuView className='text-blue-600' />,
		},
		{
			title: 'Total submissions',
			description: 'All time form submissions',
			value: String(submissions),
			icon: <FaWpforms className='text-yellow-600' />,
		},
		{
			title: 'Submission rate',
			description: 'Visits that result in form submission',
			value: submissionRate.toFixed(2) + '%',
			icon: <HiCursorClick className='text-green-600' />,
		},
		{
			title: 'Bounce rate',
			description: 'Visits that leaves without interacting',
			value: bounceRate.toFixed(2) + '%',
			icon: <TbArrowBounce className='text-red-600' />,
		},
	];

	return cards.map((card) => <StatCard key={card.title} {...card} />);
};
