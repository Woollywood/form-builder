'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import moment from 'moment';
import { ElementsType, FormElement, FormElementInstance } from './types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { formBuilderStore } from '../store';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

const extraAttributes = {
	label: 'Date field',
	description: 'Pick a date',
	required: false,
};

const propertiesSchema = z.object({
	label: z.string().min(2).max(50),
	description: z.string().max(200),
	required: z.boolean().default(false),
});
type PropertiesSchema = z.infer<typeof propertiesSchema>;

const type: ElementsType = 'date';
export const DateField: FormElement = {
	type,
	construct: (id) => ({
		id,
		type,
		extraAttributes,
	}),
	designerButtonElement: {
		icon: BsFillCalendarDateFill,
		label: 'Date field',
	},
	DesignerComponent: ({ elementInstance }) => {
		const {
			extraAttributes: { label, required, description },
		} = elementInstance as CustomInstance;
		return (
			<div className='flex w-full flex-col gap-2'>
				<Label>
					{label}
					{required && '*'}
				</Label>
				<Button variant='outline' className='w-full justify-start text-left font-normal'>
					<CalendarIcon className='mr-2 size-4' />
					<span>Pick a date</span>
				</Button>
				{description && <p className='text-[0.8rem] text-muted-foreground'>{description}</p>}
			</div>
		);
	},
	FormComponent: ({ elementInstance, isInvalid, defaultValue, submitValue }) => {
		const {
			id,
			extraAttributes: { label, required, description },
		} = elementInstance as CustomInstance;
		const [date, setDate] = useState<Date | undefined>(defaultValue ? new Date(defaultValue) : undefined);
		const [error, setError] = useState(false);

		useEffect(() => {
			setError(isInvalid!);
		}, [isInvalid]);

		const onSelect = (date: Date | undefined) => {
			setDate(date);
			if (!submitValue) {
				return;
			}

			const value = date?.toUTCString() || '';
			const valid = DateField.validate(elementInstance, value);
			setError(!valid);
			if (!valid) {
				return;
			}

			submitValue(id, value);
		};

		return (
			<div className='flex w-full flex-col gap-2'>
				<Label className={cn({ 'text-red-500': error })}>
					{label}
					{required && '*'}
				</Label>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant='outline'
							className={cn('w-full justify-start text-left font-normal', {
								'text-muted-foreground': !date,
								'text-red-500': error,
							})}>
							<CalendarIcon className='mr-2 size-4' />
							{date ? moment(date).format('LL') : <span>Pick a date</span>}
						</Button>
					</PopoverTrigger>
					<PopoverContent className='w-auto p-0' align='start'>
						<Calendar mode='single' initialFocus selected={date} onSelect={onSelect} />
					</PopoverContent>
				</Popover>
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
			return currentValue.trim().length > 0;
		}
		return true;
	},
};

export type CustomInstance = FormElementInstance & {
	extraAttributes: typeof extraAttributes;
};
