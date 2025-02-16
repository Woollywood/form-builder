'use client';

import React, { useTransition } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { BsFileEarmarkPlus } from 'react-icons/bs';
import { ImSpinner2 } from 'react-icons/im';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useHandleError } from '@/hooks/useHandleError';
import { createFormSchema, CreateFormSchema } from '@/schemas/CreateForm';
import { createForm } from '@/actions/form';
import { useToast } from '@/hooks/use-toast';

export const CreateForm: React.FC = () => {
	const form = useForm<CreateFormSchema>({
		resolver: zodResolver(createFormSchema),
		defaultValues: {
			name: '',
			description: '',
		},
	});
	const { control } = form;

	const { toast } = useToast();
	const { handleError } = useHandleError();
	const [isPending, startTransition] = useTransition();
	const onSubmit = async (values: CreateFormSchema) => {
		startTransition(async () => {
			try {
				await createForm(values);
				toast({
					title: 'Success',
					description: 'Form created successfully',
				});
			} catch (error) {
				handleError(error);
			}
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant='outline'
					className='min-h-form-card-min-height group flex flex-col items-center justify-center gap-4 border border-dashed border-primary/20 hover:cursor-pointer hover:border-primary'>
					<BsFileEarmarkPlus className='h-8 w-8 text-muted-foreground group-hover:text-primary' />
					<p className='text-xl font-bold text-muted-foreground group-hover:text-primary'>Create new form</p>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create form</DialogTitle>
					<DialogDescription>Create a new form to start collecting responses</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
						<FormField
							control={control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea rows={5} {...field} value={field.value || ''} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
				<DialogFooter>
					<Button disabled={isPending} className='mt-4 w-full' onClick={form.handleSubmit(onSubmit)}>
						{isPending ? <ImSpinner2 className='animate-spin' /> : 'Save'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
