import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { FormElement } from '../formElements/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarButtonProps {
	formElement: FormElement;
}

export const SidebarButton: React.FC<SidebarButtonProps> = ({ formElement: { type, designerButtonElement } }) => {
	const { label, icon: Icon } = designerButtonElement;

	const { isDragging, listeners, attributes, setNodeRef } = useDraggable({
		id: `designer-button-${type}`,
		data: { type, isDesignerButtonElement: true },
	});

	return (
		<Button
			className={cn('aspect-square w-full cursor-grab', { 'ring-2 ring-primary': isDragging })}
			variant='outline'
			ref={setNodeRef}
			{...listeners}
			{...attributes}>
			<Icon className='size-8 cursor-grab text-primary' />
			<p className='text-xs'>{label}</p>
		</Button>
	);
};
