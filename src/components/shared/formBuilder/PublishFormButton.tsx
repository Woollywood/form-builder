'use client';

import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { MdOutlinePublish } from 'react-icons/md';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { FaIcons } from 'react-icons/fa';
import { useHandleError } from '@/hooks/useHandleError';
import { useToast } from '@/hooks/use-toast';
import { useParams } from 'next/navigation';
import { publishForm, updateFormContent } from '@/actions/form';
import { formBuilderStore } from './store';

export const PublishFormButton: React.FC = () => {
	const [open, setOpen] = useState(false);

	const { id } = useParams<{ id: string }>();
	const { toast } = useToast();
	const [isPending, startTransition] = useTransition();
	const { handleError } = useHandleError();
	const onSubmit = async () => {
		try {
			const jsonContent = JSON.stringify(formBuilderStore.elements);
			await updateFormContent(id, jsonContent);
			await publishForm(id);
			setOpen(false);
			toast({
				title: 'Success',
				description: 'Your form is now available to the public',
			});
		} catch (error) {
			handleError(error);
		}
	};

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button className='gap-2 bg-gradient-to-r from-indigo-400 to-cyan-400 text-white'>
					<MdOutlinePublish className='size-4' />
					Publish
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. After publishing you will not be able to edit this form <br />
						<span className='font-medium'>
							By publishing this form you will make it available to the public and you will be able to
							collect submissions
						</span>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						disabled={isPending}
						onClick={(e) => {
							e.preventDefault();
							startTransition(onSubmit);
						}}>
						Proceed {isPending && <FaIcons className='animate-spin' />}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
