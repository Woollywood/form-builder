import { getForms } from '@/actions/form';
import { NextPage } from 'next';
import { FormCard } from './FormCard';

const FormCards: NextPage = async () => {
	const forms = await getForms();

	return (
		<>
			{forms.map((form) => (
				<FormCard key={form.id} {...form} />
			))}
		</>
	);
};

export default FormCards;
