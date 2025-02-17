'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { RxDropdownMenu } from 'react-icons/rx';
import { ElementsType, FormElement, FormElementInstance } from './types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { formBuilderStore } from '../store';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { useToast } from '@/hooks/use-toast';

const extraAttributes = {
	label: 'Select field',
	description: 'Description',
	required: false,
	placeholder: 'Value here...',
	options: [],
};

const propertiesSchema = z.object({
	label: z.string().min(2).max(50),
	description: z.string().max(200),
	required: z.boolean().default(false),
	placeholder: z.string().max(50),
	options: z.array(z.string()).default([]),
});
type PropertiesSchema = z.infer<typeof propertiesSchema>;

const type: ElementsType = 'select';
export const SelectField: FormElement = {
	type,
	construct: (id) => ({
		id,
		type,
		extraAttributes,
	}),
	designerButtonElement: {
		icon: RxDropdownMenu,
		label: 'Select field',
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
				<Select>
					<SelectTrigger className='w-full'>
						<SelectValue placeholder={placeholder} />
					</SelectTrigger>
				</Select>
				{description && <p className='text-[0.8rem] text-muted-foreground'>{description}</p>}
			</div>
		);
	},
	FormComponent: ({ elementInstance, isInvalid, defaultValue, submitValue }) => {
		const {
			id,
			extraAttributes: { label, required, placeholder, description, options },
		} = elementInstance as CustomInstance;
		const [value, setValue] = useState(defaultValue || '');
		const [error, setError] = useState(false);

		useEffect(() => {
			setError(isInvalid!);
		}, [isInvalid]);

		const onValueChange = (value: string) => {
			setValue(value);
			if (!submitValue) {
				return;
			}

			const valid = SelectField.validate(elementInstance, value);
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
				<Select defaultValue={value} onValueChange={onValueChange}>
					<SelectTrigger className={cn('w-full', { 'text-red-500': error })}>
						<SelectValue placeholder={placeholder} />
					</SelectTrigger>
					<SelectContent>
						{options.map((option) => (
							<SelectItem key={option} value={option}>
								{option}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
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
			extraAttributes: { label, description, required, placeholder, options },
		} = element;
		const form = useForm<PropertiesSchema>({
			resolver: zodResolver(propertiesSchema),
			mode: 'onSubmit',
			defaultValues: {
				label,
				description,
				placeholder,
				required,
				options,
			},
		});
		const { control } = form;

		useEffect(() => {
			form.reset(element.extraAttributes);
		}, [element, form]);

		const { toast } = useToast();
		const applyChanges = (values: PropertiesSchema) => {
			formBuilderStore.updateElement(id, { ...element, extraAttributes: values });
			toast({ title: 'Success', description: 'Properties saved successfully' });
			formBuilderStore.selectedElement = null;
		};

		return (
			<Form {...form}>
				<form onSubmit={form.handleSubmit(applyChanges)} className='space-y-3'>
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
					<Separator />
					<FormField
						control={control}
						name='options'
						render={({ field }) => (
							<FormItem>
								<div className='flex items-center justify-between'>
									<FormLabel>Options</FormLabel>
									<Button
										variant='outline'
										className='gap-2'
										onClick={(e) => {
											e.preventDefault();
											form.setValue('options', field.value.concat('New option'));
										}}>
										<AiOutlinePlus />
										Add
									</Button>
								</div>
								<div className='flex flex-col gap-2'>
									{form.watch('options').map((option, index) => (
										<div key={index} className='flex items-center justify-between gap-1'>
											<Input
												placeholder=''
												value={option}
												onChange={(e) => {
													field.value[index] = e.target.value;
													field.onChange(field.value);
												}}
											/>
											<Button
												variant='ghost'
												size='icon'
												onClick={(e) => {
													e.preventDefault();
													const newOptions = [...field.value];
													newOptions.splice(index, 1);
													field.onChange(newOptions);
												}}>
												<AiOutlineClose />
											</Button>
										</div>
									))}
								</div>
								<FormDescription>
									The description of the field <br /> It will be displayed below the field
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Separator />
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
					<Separator />
					<Button className='w-full'>Save</Button>
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
