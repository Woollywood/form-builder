'use client';

import React from 'react';
import { SidebarButton } from './SidebarButton';
import { formElements } from '../formElements/formElements';

export const FormElements: React.FC = () => {
	return (
		<>
			<SidebarButton formElement={formElements.text} />
		</>
	);
};
