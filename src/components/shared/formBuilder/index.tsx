'use client';

import React from 'react';
import { Form } from '@prisma/client';
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { PreviewDialogButton } from './PreviewDialogButton';
import { SaveFormButton } from './SaveFormButton';
import { PublishFormButton } from './PublishFormButton';
import { Designer } from './Designer';
import { DragOverlayWrapper } from './DragOverlayWrapper';

type Props = Form;

export const FormBuilder: React.FC<Props> = ({ name, published }) => {
	const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } });
	const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 300, tolerance: 5 } });
	const sensors = useSensors(mouseSensor, touchSensor);

	return (
		<DndContext sensors={sensors}>
			<div className='flex size-full flex-col'>
				<nav className='flex items-center justify-between gap-3 border-b-2 p-4'>
					<h2 className='truncate font-medium'>
						<span className='mr-2 text-muted-foreground'>Form:</span>
						{name}
					</h2>
					<div className='flex items-center gap-2'>
						<PreviewDialogButton />
						{published && (
							<>
								<SaveFormButton />
								<PublishFormButton />
							</>
						)}
					</div>
				</nav>
				<div className='relative flex w-full flex-grow items-center justify-center overflow-y-auto bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]'>
					<Designer />
				</div>
			</div>
			<DragOverlayWrapper />
		</DndContext>
	);
};
