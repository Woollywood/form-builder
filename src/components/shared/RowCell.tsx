import React from 'react';
import moment from 'moment';
import { ElementsType } from './formBuilder/formElements/types';
import { TableCell } from '../ui/table';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';

interface Props {
	type: ElementsType;
	value: string;
}

export const RowCell: React.FC<Props> = ({ type, value }) => {
	let node: React.ReactNode = value;

	switch (type) {
		case 'date':
			if (!value) {
				break;
			}

			const date = new Date(value);
			node = <Badge variant='outline'>{moment(date).format('LL')}</Badge>;
			break;
		case 'checkbox':
			const checked = value === 'true';
			node = <Checkbox checked={checked} disabled />;
			break;
		default:
			break;
	}

	return <TableCell>{node}</TableCell>;
};
