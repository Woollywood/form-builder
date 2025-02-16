import React from 'react';
import { Button } from '@/components/ui/button';
import { MdOutlinePublish } from 'react-icons/md';

export const PublishFormButton: React.FC = () => {
	return (
		<Button className='gap-2 bg-gradient-to-r from-indigo-400 to-cyan-400 text-white'>
			<MdOutlinePublish className='size-4' />
			Publish
		</Button>
	);
};
