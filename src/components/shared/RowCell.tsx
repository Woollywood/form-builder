import React from 'react';
import { ElementsType } from './formBuilder/formElements/types';
import { TableCell } from '../ui/table';

interface Props {
	type: ElementsType;
	value: string;
}

export const RowCell: React.FC<Props> = ({ type, value }) => {
	console.log(type);

	return <TableCell>{value}</TableCell>;
};
