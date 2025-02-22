import { NextPage } from 'next';
import { Suspense } from 'react';
import { CreateForm } from '@/components/shared/CreateForm';
import { FormCardsSkeleton } from '@/components/shared/FormCardsSkeleton';
import { StatCardsSkeleton } from '@/components/shared/StatCardsSkeleton';
import { Separator } from '@/components/ui/separator';
import FormCards from '@/components/shared/FormCards';
import StatCards from './_components/StatCards';

const Page: NextPage = () => {
	return (
		<div className='w-full'>
			<div className='grid w-full grid-cols-1 gap-4 pt-8 md:grid-cols-2 lg:grid-cols-4'>
				<Suspense fallback={<StatCardsSkeleton />}>
					<StatCards />
				</Suspense>
			</div>
			<div className='py-6 md:py-12'>
				<Separator />
			</div>
			<h2 className='text-4xl font-bold'>Your forms</h2>
			<div className='py-6 md:py-12'>
				<Separator />
			</div>
			<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
				<CreateForm />
				<Suspense fallback={<FormCardsSkeleton />}>
					<FormCards />
				</Suspense>
			</div>
		</div>
	);
};

export default Page;
