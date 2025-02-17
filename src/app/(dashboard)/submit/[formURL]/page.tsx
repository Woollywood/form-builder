import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import { getFormContentByURL } from '@/actions/form';
import { FormElementInstance } from '@/components/shared/formBuilder/formElements/types';
import { FormSubmit } from '@/components/shared/FormSubmit';

interface Props {
	params: Promise<{ formURL: string }>;
}

const Page: NextPage<Props> = async ({ params }) => {
	const { formURL } = await params;
	const form = await getFormContentByURL(formURL);
	if (!form) {
		notFound();
	}

	const { content } = form;
	const elements = JSON.parse(content!) as FormElementInstance[];
	return <FormSubmit formURL={formURL} elements={elements} />;
};

export default Page;
