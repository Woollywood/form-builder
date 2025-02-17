import { NextPage } from 'next';
import { getFormStatus } from '@/actions/form';
import { StatCards as UStatCards } from '@/components/shared/StatCards';

const StatCards: NextPage = async () => {
	const { visits, submissions } = await getFormStatus();

	return <UStatCards visits={visits} submissions={submissions} />;
};

export default StatCards;
