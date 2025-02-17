'use client';

import React from 'react';
import { SidebarButton } from './SidebarButton';
import { formElements } from '../formElements/formElements';
import { Separator } from '@/components/ui/separator';

export const FormElements: React.FC = () => {
	return (
		<>
			<p className='text-sm text-foreground/70'>Drag & Drop elements</p>
			<Separator className='mb-2' />
			<div className='grid grid-cols-1 place-items-center gap-2 md:grid-cols-2'>
				<p className='col-span-1 my-2 place-self-start text-sm text-muted-foreground md:col-span-2'>
					Layout elements
				</p>
				{Object.entries(formElements).map(([key, value]) => (
					<SidebarButton key={key} formElement={value} />
				))}
			</div>
		</>
	);
};
