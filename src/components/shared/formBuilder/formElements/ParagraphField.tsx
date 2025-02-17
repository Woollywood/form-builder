'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BsTextParagraph } from 'react-icons/bs';
import { ElementsType, FormElement, FormElementInstance } from './types';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { formBuilderStore } from '../store';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

const extraAttributes = {
	text: 'Text here',
};

const propertiesSchema = z.object({
	text: z.string().min(2).max(50),
});
type PropertiesSchema = z.infer<typeof propertiesSchema>;

const type: ElementsType = 'paragraph';
export const ParagraphField: FormElement = {
	type,
	construct: (id) => ({
		id,
		type,
		extraAttributes,
	}),
	designerButtonElement: {
		icon: BsTextParagraph,
		label: 'Paragraph field',
	},
	DesignerComponent: ({ elementInstance }) => {
		const {
			extraAttributes: { text },
		} = elementInstance as CustomInstance;
		return (
			<div className='flex w-full flex-col gap-2'>
				<Label className='text-muted-foreground'>Paragraph field</Label>
				<p>{text}</p>
			</div>
		);
	},
	FormComponent: ({ elementInstance }) => {
		const {
			extraAttributes: { text },
		} = elementInstance as CustomInstance;

		return <p>{text}</p>;
	},
	PropertiesComponent: ({ elementInstance }) => {
		const element = elementInstance as CustomInstance;
		const {
			id,
			extraAttributes: { text },
		} = element;
		const form = useForm<PropertiesSchema>({
			resolver: zodResolver(propertiesSchema),
			mode: 'onBlur',
			defaultValues: {
				text,
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
						name='text'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Text</FormLabel>
								<FormControl>
									<Textarea
										rows={6}
										{...field}
										onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
									/>
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
