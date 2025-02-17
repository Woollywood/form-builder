'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ElementsType, FormElement, FormElementInstance } from './types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { formBuilderStore } from '../store';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { BsTextareaResize } from 'react-icons/bs';
import { Slider } from '@/components/ui/slider';

const extraAttributes = {
	label: 'Textarea field',
	description: 'Description',
	required: false,
	placeholder: 'Value here...',
	rows: 6,
};

const propertiesSchema = z.object({
	label: z.string().min(2).max(50),
	description: z.string().max(200),
	required: z.boolean().default(false),
	placeholder: z.string().max(50),
	rows: z.number().min(1).max(10),
});
type PropertiesSchema = z.infer<typeof propertiesSchema>;

const type: ElementsType = 'textarea';
export const TextareaField: FormElement = {
	type,
	construct: (id) => ({
		id,
		type,
		extraAttributes,
	}),
	designerButtonElement: {
		icon: BsTextareaResize,
		label: 'Textarea field',
	},
	DesignerComponent: ({ elementInstance }) => {
		const {
			extraAttributes: { label, required, placeholder, description },
		} = elementInstance as CustomInstance;
		return (
			<div className='flex w-full flex-col gap-2'>
				<Label>
					{label}
					{required && '*'}
				</Label>
				<Textarea readOnly disabled placeholder={placeholder} />
				{description && <p className='text-[0.8rem] text-muted-foreground'>{description}</p>}
			</div>
		);
	},
	FormComponent: ({ elementInstance, isInvalid, defaultValue, submitValue }) => {
		const {
			id,
			extraAttributes: { label, required, placeholder, description, rows },
		} = elementInstance as CustomInstance;
		const [value, setValue] = useState(defaultValue || '');
		const [error, setError] = useState(false);

		useEffect(() => {
			setError(isInvalid!);
		}, [isInvalid]);

		const onBlur = (e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
			if (!submitValue) {
				return;
			}

			const valid = TextareaField.validate(elementInstance, e.target.value);
			setError(!valid);
			if (!valid) {
				return;
			}

			submitValue(id, e.target.value);
		};

		return (
			<div className='flex w-full flex-col gap-2'>
				<Label className={cn({ 'text-red-500': error })}>
					{label}
					{required && '*'}
				</Label>
				<Textarea
					rows={rows}
					className={cn({ 'text-red-500': error })}
					placeholder={placeholder}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					onBlur={onBlur}
				/>
				{description && (
					<p className={cn('text-[0.8rem] text-muted-foreground', { 'text-red-500': error })}>
						{description}
					</p>
				)}
			</div>
		);
	},
	PropertiesComponent: ({ elementInstance }) => {
		const element = elementInstance as CustomInstance;
		const {
			id,
			extraAttributes: { label, description, required, placeholder },
		} = element;
		const form = useForm<PropertiesSchema>({
			resolver: zodResolver(propertiesSchema),
			mode: 'onBlur',
			defaultValues: {
				label,
				description,
				placeholder,
				required,
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
						name='label'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Label</FormLabel>
								<FormControl>
									<Input {...field} onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()} />
								</FormControl>
								<FormDescription>
									The label of the field <br />
									It will be displayed above the field
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name='placeholder'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Placeholder</FormLabel>
								<FormControl>
									<Input {...field} onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()} />
								</FormControl>
								<FormDescription>The placeholder of the field</FormDescription>
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
									<Textarea
										rows={6}
										{...field}
										onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
									/>
								</FormControl>
								<FormDescription>
									The description of the field <br /> It will be displayed below the field
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name='rows'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Rows {form.watch('rows')}</FormLabel>
								<FormControl>
									<Slider
										defaultValue={[field.value]}
										min={1}
										max={10}
										step={1}
										onValueChange={(value) => field.onChange(value[0])}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name='required'
						render={({ field }) => (
							<FormItem className='flex items-center justify-between gap-x-1.5 rounded-lg border p-3 shadow-sm'>
								<div className='space-y-0.5'>
									<FormLabel>Required</FormLabel>
									<FormDescription>
										The description of the field <br /> It will be displayed below the field
									</FormDescription>
								</div>
								<FormControl>
									<Switch checked={field.value} onCheckedChange={field.onChange} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
		);
	},
	validate: (formElement, currentValue) => {
		const {
			extraAttributes: { required },
		} = formElement as CustomInstance;
		if (required) {
			return currentValue.trim().length > 0;
		}
		return true;
	},
};

export type CustomInstance = FormElementInstance & {
	extraAttributes: typeof extraAttributes;
};
