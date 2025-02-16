import { getFormById } from '@/actions/form';
import { FormBuilder } from '@/components/shared/formBuilder';
import { NextPage } from 'next';
import { notFound } from 'next/navigation';

interface Props {
	params: Promise<{ id: string }>;
}

const Page: NextPage<Props> = async ({ params }) => {
	const { id } = await params;
	const form = await getFormById(id);
	if (!form) {
		notFound();
	}

	return <FormBuilder {...form} />;
};

export default Page;
