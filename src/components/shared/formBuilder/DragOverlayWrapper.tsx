'use client';

import React, { useState } from 'react';
import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { SidebarButtonOverlay } from './sidebar/SidebarButtonOverlay';
import { formElements } from './formElements/formElements';
import { ElementsType } from './formElements/types';
import { formBuilderStore } from './store';

export const DragOverlayWrapper: React.FC = () => {
	const [draggedItem, setDraggedItem] = useState<Active | null>(null);

	useDndMonitor({
		onDragStart: ({ active }) => {
			setDraggedItem(active);
		},
		onDragCancel: () => {
			setDraggedItem(null);
		},
		onDragEnd: () => {
			setDraggedItem(null);
		},
	});

	if (!draggedItem) {
		return null;
	}

	let node = <div>No drag overlay</div>;
	const isSidebarButtonElement = draggedItem?.data.current?.isDesignerButtonElement;

	if (isSidebarButtonElement) {
		const type = draggedItem.data.current?.type as ElementsType;
		node = <SidebarButtonOverlay formElement={formElements[type]} />;
	}

	const isDesignerElement = draggedItem?.data.current?.isDesignerElement;
	if (isDesignerElement) {
		const elementId = draggedItem.data?.current?.elementId;
		const element = formBuilderStore.elements.find(({ id }) => id === elementId);
		if (!element) {
			node = <div>Element not found</div>;
		} else {
			const DesignerElementComponent = formElements[element.type].designerComponent;
			node = (
				<div className='pointer-events-none flex h-[7.5rem] w-full rounded-md border bg-accent px-4 py-2 opacity-60'>
					<DesignerElementComponent elementInstance={element} />{' '}
				</div>
			);
		}
	}

	return <DragOverlay>{node}</DragOverlay>;
};
