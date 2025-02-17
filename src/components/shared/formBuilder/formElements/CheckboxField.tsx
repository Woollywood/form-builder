'use client';

import React, { useEffect, useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { IoMdCheckbox } from 'react-icons/io';
import { ElementsType, FormElement, FormElementInstance } from './types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { formBuilderStore } from '../store';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckedState } from '@radix-ui/react-checkbox';

const extraAttributes = {
	label: 'Checkbox field',
	description: 'Description',
	required: false,
};

const propertiesSchema = z.object({
	label: z.string().min(2).max(50),
	description: z.string().max(200),
	required: z.boolean().default(false),
});
type PropertiesSchema = z.infer<typeof propertiesSchema>;

const type: ElementsType = 'checkbox';
export const CheckboxField: FormElement = {
	type,
	construct: (id) => ({
		id,
		type,
		extraAttributes,
	}),
	designerButtonElement: {
		icon: IoMdCheckbox,
		label: 'Checkbox field',
	},
	DesignerComponent: ({ elementInstance }) => {
		const {
			extraAttributes: { label, required, description },
		} = elementInstance as CustomInstance;
		const id = useId();
		return (
			<div className='items-top flex space-x-2'>
				<Checkbox id={id} />
				<div className='grid gap-1.5 leading-none'>
					<Label htmlFor={id} className='whitespace-nowrap'>
						{label}
						{required && '*'}
					</Label>
					{description && <p className='text-[0.8rem] text-muted-foreground'>{description}</p>}
				</div>
			</div>
		);
	},
	FormComponent: ({ elementInstance, isInvalid, defaultValue, submitValue }) => {
		const {
			id,
			extraAttributes: { label, required, description },
		} = elementInstance as CustomInstance;
		const [value, setValue] = useState<boolean>(defaultValue === 'true' ? true : false);
		const [error, setError] = useState(false);

		useEffect(() => {
			setError(isInvalid!);
		}, [isInvalid]);

		const onCheckedChange = (e: CheckedState) => {
			const value = e === true ? true : false;
			setValue(value);

			if (!submitValue) {
				return;
			}

			const strValue = value ? 'true' : 'false';
			const valid = CheckboxField.validate(elementInstance, strValue);
			setError(!valid);
			if (!valid) {
				return;
			}

			submitValue(id, strValue);
		};

		const idElement = useId();
		return (
			<div className='items-top flex space-x-2'>
				<Checkbox
					id={idElement}
					checked={value}
					className={cn({ 'border-red-500': error })}
					onCheckedChange={onCheckedChange}
				/>
				<div className='grid gap-1.5 leading-none'>
					<Label htmlFor={idElement} className={cn('whitespace-nowrap', { 'text-red-500': error })}>
						{label}
						{required && '*'}
					</Label>
					{description && (
						<p className={cn('text-[0.8rem] text-muted-foreground', { 'text-red-500': error })}>
							{description}
						</p>
					)}
				</div>
			</div>
		);
	},
	PropertiesComponent: ({ elementInstance }) => {
		const element = elementInstance as CustomInstance;
		const {
			id,
			extraAttributes: { label, description, required },
		} = element;
		const form = useForm<PropertiesSchema>({
			resolver: zodResolver(propertiesSchema),
			mode: 'onBlur',
			defaultValues: {
				label,
				description,
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
			return currentValue === 'true';
		}
		return true;
	},
};

export type CustomInstance = FormElementInstance & {
	extraAttributes: typeof extraAttributes;
};
