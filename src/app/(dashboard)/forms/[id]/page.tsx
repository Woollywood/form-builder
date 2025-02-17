import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import { getFormById } from '@/actions/form';
import { Visit } from '@/components/shared/Visit';
import { FormLinkShare } from '@/components/shared/FormLinkShare';
import { StatCards } from '@/components/shared/StatCards';

interface Props {
	params: Promise<{ id: string }>;
}

const Page: NextPage<Props> = async ({ params }) => {
	const { id } = await params;
	const form = await getFormById(id);
	if (!form) {
		notFound();
	}

	const { name, shareURL, visits, submissions } = form;
	return (
		<div className='border-b border-t border-muted py-10'>
			<div className='flex justify-between'>
				<h1 className='truncate text-4xl font-bold'>{name}</h1>
				<Visit shareURL={shareURL} />
			</div>
			<div className='border-b border-muted py-4'>
				<div className='flex items-center justify-between gap-2'>
					<FormLinkShare shareURL={shareURL} />
				</div>
			</div>
			<div className='grid w-full grid-cols-1 gap-4 pt-8 md:grid-cols-2 lg:grid-cols-4'>
				<StatCards visits={visits} submissions={submissions} />
			</div>
		</div>
	);
};

export default Page;
