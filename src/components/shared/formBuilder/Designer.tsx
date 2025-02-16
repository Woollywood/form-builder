'use client';

import React from 'react';
import { useDndMonitor, useDroppable } from '@dnd-kit/core';
import { v4 as uuid } from 'uuid';
import { DesignerSidebar } from './sidebar';
import { cn } from '@/lib/utils';
import { formElements } from './formElements/formElements';
import { ElementsType } from './formElements/types';
import { formBuilderStore } from './store';
import { observer } from 'mobx-react-lite';
import { DesignerElementWrapper } from './DesignerElementWrapper';

export const Designer: React.FC = observer(() => {
	const { isOver, setNodeRef } = useDroppable({
		id: 'designer-drop-area',
		data: { isDesignerDropArea: true },
	});

	useDndMonitor({
		onDragEnd: ({ active, over }) => {
			if (!active || !over) {
				return;
			}

			const isDesignerButtonElement = active.data.current?.isDesignerButtonElement;
			if (isDesignerButtonElement) {
				const type = active.data.current?.type;
				const newElement = formElements[type as ElementsType].construct(uuid());
				formBuilderStore.addElement(0, newElement);
			}
		},
	});

	return (
		<div className='grid size-full grid-cols-[6fr_2fr]'>
			<div className='size-full p-4'>
				<div
					className={cn(
						'flex size-full flex-col items-center justify-start overflow-y-auto rounded-xl bg-background',
						{ 'ring-2 ring-primary': isOver },
					)}
					ref={setNodeRef}>
					{formBuilderStore.elements.length === 0 && isOver ? (
						<div className='w-full p-4'>
							<div className='h-[7.5rem] rounded-md bg-primary/20'></div>
						</div>
					) : (
						formBuilderStore.elements.length === 0 && (
							<p className='flex flex-grow items-center text-3xl font-bold text-muted-foreground'>
								Drop here
							</p>
						)
					)}
					{formBuilderStore.elements.length > 0 && (
						<div className='flex w-full flex-col gap-2 p-4'>
							{formBuilderStore.elements.map((element) => (
								<DesignerElementWrapper key={element.id} {...element} />
							))}
						</div>
					)}
				</div>
			</div>
			<DesignerSidebar />
		</div>
	);
});
