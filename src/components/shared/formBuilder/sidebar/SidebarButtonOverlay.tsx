import React from 'react';
import { FormElement } from '../formElements/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarButtonProps {
	formElement: FormElement;
}

export const SidebarButtonOverlay: React.FC<SidebarButtonProps> = ({ formElement: { designerButtonElement } }) => {
	const { label, icon: Icon } = designerButtonElement;

	return (
		<Button className={cn('aspect-square w-full cursor-grab')} variant='outline'>
			<Icon className='size-8 cursor-grab text-primary' />
			<p className='text-xs'>{label}</p>
		</Button>
	);
};
