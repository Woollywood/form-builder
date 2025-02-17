'use client';

import React from 'react';
import { SidebarButton } from './SidebarButton';
import { sections } from '../formElements/formElements';
import { Separator } from '@/components/ui/separator';

export const FormElements: React.FC = () => {
	return (
		<>
			<p className='text-sm text-foreground/70'>Drag & Drop elements</p>
			<Separator className='mb-2' />
			{sections.map(({ label, elements }) => (
				<div key={label} className='grid grid-cols-1 place-items-center gap-2 md:grid-cols-2'>
					<p className='col-span-1 my-2 place-self-start text-sm text-muted-foreground md:col-span-2'>
						{label}
					</p>
					{Object.entries(elements).map(([key, value]) => (
						<SidebarButton key={key} formElement={value} />
					))}
				</div>
			))}
		</>
	);
};
