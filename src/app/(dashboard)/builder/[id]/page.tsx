import { getFormById } from '@/actions/form';
import { FormBuilder } from '@/components/shared/formBuilder';
import { Congrats } from '@/components/shared/formBuilder/Congrats';
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

	const { published } = form;
	return published ? <Congrats {...form} /> : <FormBuilder {...form} />;
};

export default Page;
