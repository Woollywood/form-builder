import { getFormStatus } from '@/actions/form';
import { NextPage } from 'next';
import { IStatCard, StatCard } from './StatCard';
import { LuView } from 'react-icons/lu';
import { FaWpforms } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { TbArrowBounce } from 'react-icons/tb';

const StatCards: NextPage = async () => {
	const { visits, submissions, submissionRate, bounceRate } = await getFormStatus();

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
			value: String(submissionRate) + '%',
			icon: <HiCursorClick className='text-green-600' />,
		},
		{
			title: 'Bounce rate',
			description: 'Visits that leaves without interacting',
			value: String(bounceRate) + '%',
			icon: <TbArrowBounce className='text-red-600' />,
		},
	];

	return cards.map((card) => <StatCard key={card.title} {...card} />);
};

export default StatCards;
