'use client';

import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { formElements } from '../formElements/formElements';
import { formBuilderStore } from '../store';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const PropertiesForm: React.FC = () => {
	if (!formBuilderStore.selectedElement) {
		return null;
	}

	const PropertiesForm = formElements[formBuilderStore.selectedElement?.type].PropertiesComponent;
	return (
		<div className='flex flex-col p-2'>
			<div className='flex items-center justify-between'>
				<p className='text-sm text-foreground/70'>Element properties</p>
				<Button size='icon' variant='ghost' onClick={() => (formBuilderStore.selectedElement = null)}>
					<AiOutlineClose />
				</Button>
			</div>
			<div className='py-4'>
				<Separator />
			</div>
			<PropertiesForm elementInstance={formBuilderStore.selectedElement} />
		</div>
	);
};
