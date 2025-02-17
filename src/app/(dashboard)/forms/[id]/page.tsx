import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import { getFormById } from '@/actions/form';
import { Visit } from '@/components/shared/Visit';
import { FormLinkShare } from '@/components/shared/FormLinkShare';
import { StatCards } from '@/components/shared/StatCards';
import SubmissionsTable from '@/components/shared/SubmissionsTable';
import { Suspense } from 'react';
import { SubmissionsTableSkeleton } from '@/components/shared/SubmissionsTableSkeleton';

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
			<div className='mb-8 grid w-full grid-cols-1 gap-4 pt-8 md:grid-cols-2 lg:grid-cols-4'>
				<StatCards visits={visits} submissions={submissions} />
			</div>
			<div>
				<h1 className='my-4 text-2xl font-bold'>Submissions</h1>
				<Suspense fallback={<SubmissionsTableSkeleton />}>
					<SubmissionsTable id={id} />
				</Suspense>
			</div>
		</div>
	);
};

export default Page;
