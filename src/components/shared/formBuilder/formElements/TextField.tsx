'use client';

import { MdTextFields } from 'react-icons/md';
import { ElementsType, FormElement, FormElementInstance } from './types';
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const extraAttributes = {
	label: 'Text field',
	description: 'Description',
	required: false,
	placeholder: 'Value here...',
};

const type: ElementsType = 'text';
export const TextField: FormElement = {
	type,
	construct: (id) => ({
		id,
		type,
		extraAttributes,
	}),
	designerButtonElement: {
		icon: MdTextFields,
		label: 'Text field',
	},
	designerComponent: ({ elementInstance }) => {
		const {
			extraAttributes: { label, required, placeholder, description },
		} = elementInstance as CustomInstance;
		return (
			<div className='flex w-full flex-col gap-2'>
				<Label>
					{label}
					{required && '*'}
				</Label>
				<Input readOnly disabled placeholder={placeholder} />
				{description && <p className='text-[0.8rem] text-muted-foreground'>{description}</p>}
			</div>
		);
	},
	formComponent: () => <div>Form component</div>,
	propertiesComponent: () => <div>Properties component</div>,
};

export type CustomInstance = FormElementInstance & {
	extraAttributes: typeof extraAttributes;
};
