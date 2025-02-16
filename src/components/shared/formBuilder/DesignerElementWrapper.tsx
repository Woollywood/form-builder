'use client';

import React, { useState } from 'react';
import { FormElementInstance } from './formElements/types';
import { formElements } from './formElements/formElements';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { Button } from '@/components/ui/button';
import { BiSolidTrash } from 'react-icons/bi';
import { formBuilderStore } from './store';
import { cn } from '@/lib/utils';

type DesignerElementWrapperProps = FormElementInstance;

export const DesignerElementWrapper: React.FC<DesignerElementWrapperProps> = (element) => {
	const [isMouseOver, setMouseOver] = useState(false);

	const { id, type } = element;

	const topHalf = useDroppable({
		id: `${id}-top`,
		data: { type, elementId: id, isTopHalfDesignerElement: true },
	});
	const bottomHalf = useDroppable({
		id: `${id}-bottom`,
		data: { type, elementId: id, isBottomHalfDesignerElement: true },
	});

	const draggable = useDraggable({
		id: `${id}-drag-handler`,
		data: {
			type,
			elementId: id,
			isDesignerElement: true,
		},
	});

	if (draggable.isDragging) {
		return null;
	}

	const DesignerComponent = formElements[type].DesignerComponent;
	return (
		<div
			className='relative flex h-[7.5rem] flex-col rounded-md text-foreground ring-1 ring-inset ring-accent hover:cursor-pointer'
			onMouseEnter={() => setMouseOver(true)}
			onMouseLeave={() => setMouseOver(false)}
			ref={draggable.setNodeRef}
			{...draggable.listeners}
			{...draggable.attributes}
			onClick={(e) => {
				e.stopPropagation();
				formBuilderStore.selectedElement = element;
			}}>
			<div className='absolute h-1/2 w-full rounded-t-md' ref={topHalf.setNodeRef}></div>
			<div className='absolute bottom-0 h-1/2 w-full rounded-b-md' ref={bottomHalf.setNodeRef}></div>
			{isMouseOver && (
				<>
					<div className='absolute right-0 h-full'>
						<Button
							className='rounded- border-md flex h-full items-center justify-center rounded-l-none bg-red-500'
							onClick={(e) => {
								e.stopPropagation();
								formBuilderStore.removeElement(id);
							}}>
							<BiSolidTrash className='size-6' />
						</Button>
					</div>
					<div className='-translate-y-/12 absolute left-1/2 top-1/2 -translate-x-1/2 animate-pulse'>
						<p className='text-sm text-muted-foreground'>Click for properties or drag to move</p>
					</div>
				</>
			)}
			{topHalf.isOver && (
				<div className='absolute left-0 top-0 h-2 w-full rounded-md rounded-b-none bg-primary'></div>
			)}
			<div
				className={cn(
					'pointer-events-none flex h-full w-full items-center rounded-md bg-accent/40 px-4 py-2 opacity-100',
					{
						'opacity-30': isMouseOver,
					},
				)}>
				<DesignerComponent elementInstance={element} />
			</div>
			{bottomHalf.isOver && (
				<div className='absolute bottom-0 left-0 h-2 w-full rounded-md rounded-t-none bg-primary'></div>
			)}
		</div>
	);
};
