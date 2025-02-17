'use client';

import React from 'react';
import { RiSeparator } from 'react-icons/ri';
import { ElementsType, FormElement } from './types';
import { Label } from '@/components/ui/label';
import { Separator as USeparator } from '@/components/ui/separator';

const type: ElementsType = 'separator';
export const Separator: FormElement = {
	type,
	construct: (id) => ({
		id,
		type,
	}),
	designerButtonElement: {
		icon: RiSeparator,
		label: 'Separator field',
	},
	DesignerComponent: () => {
		return (
			<div className='flex w-full flex-col gap-2'>
				<Label className='text-muted-foreground'>Separator field</Label>
				<USeparator />
			</div>
		);
	},
	FormComponent: () => {
		return <USeparator />;
	},
	PropertiesComponent: () => {
		return <p>No properties for this element</p>;
	},
	validate: () => true,
};
