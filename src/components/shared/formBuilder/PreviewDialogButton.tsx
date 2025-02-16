import React from 'react';
import { Button } from '@/components/ui/button';
import { MdPreview } from 'react-icons/md';

export const PreviewDialogButton: React.FC = () => {
	return (
		<Button className='gap-2' variant='outline'>
			<MdPreview className='size-6' />
			Preview
		</Button>
	);
};
