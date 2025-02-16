import React from 'react';
import { SidebarButton } from './SidebarButton';
import { formElements } from '../formElements/formElements';

export const DesignerSidebar: React.FC = () => {
	return (
		<aside className='flex w-full flex-col gap-2 overflow-y-auto border-l-2 border-muted bg-background p-4'>
			<SidebarButton formElement={formElements.text} />
		</aside>
	);
};
