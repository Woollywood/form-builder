import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import { getFormWithSubmissions } from '@/actions/form';
import { ElementsType, FormElementInstance } from './formBuilder/formElements/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import moment from 'moment';
import { RowCell } from './RowCell';

interface Column {
	id: string;
	label: string;
	required: boolean;
	type: ElementsType;
}

type Row = {
	[key: string]: string;
} & { submittedAt: Date };

interface Props {
	id: string;
}

const SubmissionsTable: NextPage<Props> = async ({ id }) => {
	const form = await getFormWithSubmissions(id);
	if (!form) {
		notFound();
	}

	const formElements = JSON.parse(form.content!) as FormElementInstance[];
	const columns: Column[] = [];

	for (const formElement of formElements) {
		const { id, type } = formElement;
		switch (type) {
			case 'text':
			case 'number':
			case 'textarea':
			case 'date':
			case 'checkbox':
				columns.push({
					id,
					type,
					//@ts-expect-error existing attribute
					label: formElement.extraAttributes?.label,
					//@ts-expect-error existing attribute
					required: formElement.extraAttributes?.required,
				});
				break;
			default:
				break;
		}
	}

	const { FormSubmissions } = form;
	if (FormSubmissions.length === 0) {
		return <p className='text-center text-2xl font-medium'>No submissions</p>;
	}

	const rows: Row[] = [];
	for (const submission of FormSubmissions) {
		const content = JSON.parse(submission.content);
		rows.push({ ...content, submittedAt: submission.createdAt });
	}

	return (
		<div className='rounded-md border'>
			<Table>
				<TableHeader>
					<TableRow>
						{columns.map(({ id, label }) => (
							<TableHead key={id} className='uppercase'>
								{label}
							</TableHead>
						))}
						<TableHead className='text-right uppercase text-muted-foreground'>Submitted at</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{rows.map((row, index) => (
						<TableRow key={index}>
							{columns.map((column) => (
								<RowCell key={column.id} type={column.type} value={row[column.id]} />
							))}
							<TableCell className='text-right text-muted-foreground'>
								{moment(row.submittedAt).format('LL')}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default SubmissionsTable;
