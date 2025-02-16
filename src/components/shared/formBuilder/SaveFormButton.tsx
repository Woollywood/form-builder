import React from 'react';
import { Button } from '@/components/ui/button';
import { HiSaveAs } from 'react-icons/hi';

export const SaveFormButton: React.FC = () => {
	return (
		<Button className='gap-2' variant='outline'>
			<HiSaveAs className='size-4' />
			Save
		</Button>
	);
};
