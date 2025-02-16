'use client';

import React from 'react';
import { observer } from 'mobx-react-lite';
import { formBuilderStore } from '../store';
import { FormElements } from './FormElements';
import { PropertiesForm } from './PropertiesForm';

export const DesignerSidebar: React.FC = observer(() => {
	return (
		<aside className='flex w-full flex-col gap-2 overflow-y-auto border-l-2 border-muted bg-background p-4'>
			{formBuilderStore.selectedElement ? <PropertiesForm /> : <FormElements />}
		</aside>
	);
});
