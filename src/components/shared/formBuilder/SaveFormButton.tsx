'use client';

import React, { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { HiSaveAs } from 'react-icons/hi';
import { useHandleError } from '@/hooks/useHandleError';
import { formBuilderStore } from './store';
import { updateFormContent } from '@/actions/form';
import { useParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { FaSpinner } from 'react-icons/fa';

export const SaveFormButton: React.FC = () => {
	const { toast } = useToast();
	const { id } = useParams<{ id: string }>();
	const { handleError } = useHandleError();
	const [isPending, startTransition] = useTransition();
	const onClick = async () => {
		startTransition(async () => {
			try {
				const jsonContent = JSON.stringify(formBuilderStore.elements);
				await updateFormContent(id, jsonContent);
				toast({
					title: 'Success',
					description: 'Form saved successfully',
				});
			} catch (error) {
				handleError(error);
			}
		});
	};

	return (
		<Button className='gap-2' variant='outline' disabled={isPending} onClick={onClick}>
			<HiSaveAs className='size-4' />
			Save
			{isPending && <FaSpinner className='animate-spin' />}
		</Button>
	);
};
