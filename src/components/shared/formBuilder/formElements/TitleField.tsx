'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LuHeading1 } from 'react-icons/lu';
import { ElementsType, FormElement, FormElementInstance } from './types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { formBuilderStore } from '../store';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const extraAttributes = {
	title: 'Title field',
};

const propertiesSchema = z.object({
	title: z.string().min(2).max(50),
});
type PropertiesSchema = z.infer<typeof propertiesSchema>;

const type: ElementsType = 'title';
export const TitleField: FormElement = {
	type,
	construct: (id) => ({
		id,
		type,
		extraAttributes,
	}),
	designerButtonElement: {
		icon: LuHeading1,
		label: 'Title field',
	},
	DesignerComponent: ({ elementInstance }) => {
		const {
			extraAttributes: { title },
		} = elementInstance as CustomInstance;
		return (
			<div className='flex w-full flex-col gap-2'>
				<Label className='text-muted-foreground'>Title field</Label>
				<p className='text-xl'>{title}</p>
			</div>
		);
	},
	FormComponent: ({ elementInstance }) => {
		const {
			extraAttributes: { title },
		} = elementInstance as CustomInstance;

		return <p className='text-xl'>{title}</p>;
	},
	PropertiesComponent: ({ elementInstance }) => {
		const element = elementInstance as CustomInstance;
		const {
			id,
			extraAttributes: { title },
		} = element;
		const form = useForm<PropertiesSchema>({
			resolver: zodResolver(propertiesSchema),
			mode: 'onBlur',
			defaultValues: {
				title,
			},
		});
		const { control } = form;

		useEffect(() => {
			form.reset(element.extraAttributes);
		}, [element, form]);

		const applyChanges = (values: PropertiesSchema) => {
			formBuilderStore.updateElement(id, { ...element, extraAttributes: values });
		};

		return (
			<Form {...form}>
				<form
					onBlur={form.handleSubmit(applyChanges)}
					onSubmit={(e) => e.preventDefault()}
					className='space-y-3'>
					<FormField
						control={control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input {...field} onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
		);
	},
	validate: () => true,
};

export type CustomInstance = FormElementInstance & {
	extraAttributes: typeof extraAttributes;
};
