'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LuSeparatorHorizontal } from 'react-icons/lu';
import { ElementsType, FormElement, FormElementInstance } from './types';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { formBuilderStore } from '../store';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';

const extraAttributes = {
	height: 20,
};

const propertiesSchema = z.object({
	height: z.number().min(5).max(200),
});
type PropertiesSchema = z.infer<typeof propertiesSchema>;

const type: ElementsType = 'spacer';
export const SpacerField: FormElement = {
	type,
	construct: (id) => ({
		id,
		type,
		extraAttributes,
	}),
	designerButtonElement: {
		icon: LuSeparatorHorizontal,
		label: 'Spacer field',
	},
	DesignerComponent: ({ elementInstance }) => {
		const {
			extraAttributes: { height },
		} = elementInstance as CustomInstance;
		return (
			<div className='flex w-full flex-col items-center gap-2'>
				<Label className='text-muted-foreground'>Spacer field: {height}px</Label>
				<LuSeparatorHorizontal className='size-8' />
			</div>
		);
	},
	FormComponent: ({ elementInstance }) => {
		const {
			extraAttributes: { height },
		} = elementInstance as CustomInstance;

		return <div className='w-full' style={{ height }}></div>;
	},
	PropertiesComponent: ({ elementInstance }) => {
		const element = elementInstance as CustomInstance;
		const {
			id,
			extraAttributes: { height },
		} = element;
		const form = useForm<PropertiesSchema>({
			resolver: zodResolver(propertiesSchema),
			mode: 'onBlur',
			defaultValues: {
				height,
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
						name='height'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Height (px): {form.watch('height')}</FormLabel>
								<FormControl className='pt-2'>
									<Slider
										defaultValue={[field.value]}
										min={5}
										max={200}
										step={1}
										onValueChange={(value) => field.onChange(value[0])}
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
