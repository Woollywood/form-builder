'use client';

import React, { useCallback, useRef, useState, useTransition } from 'react';
import { FormElementInstance } from './formBuilder/formElements/types';
import { formElements } from './formBuilder/formElements/formElements';
import { Button } from '../ui/button';
import { HiCursorClick } from 'react-icons/hi';
import { toast } from '@/hooks/use-toast';
import { ImSpinner2 } from 'react-icons/im';
import { useHandleError } from '@/hooks/useHandleError';
import { submitForm } from '@/actions/form';

interface Props {
	formURL: string;
	elements: FormElementInstance[];
}

export const FormSubmit: React.FC<Props> = ({ formURL, elements }) => {
	const formValues = useRef<{ [key: string]: string }>({});
	const formErrors = useRef<{ [key: string]: boolean }>({});
	const [renderKey, setRenderKey] = useState(new Date().getTime());

	const validateForm = useCallback(() => {
		for (const element of elements) {
			const currentValue = formValues.current[element.id] || '';
			const valid = formElements[element.type].validate(element, currentValue);
			if (!valid) {
				formErrors.current[element.id] = true;
			}
		}

		if (Object.keys(formErrors.current).length > 0) {
			return false;
		}
		return true;
	}, [elements]);

	const submitValue = (key: string, value: string) => {
		formValues.current[key] = value;
	};

	const { handleError } = useHandleError();
	const [isPending, startTransition] = useTransition();
	const [submitted, setSubmitted] = useState(false);
	const onSubmit = async () => {
		formErrors.current = {};
		const validForm = validateForm();
		if (!validForm) {
			setRenderKey(new Date().getTime());
			toast({
				variant: 'destructive',
				title: 'Error',
				description: 'Please check the form for errors',
			});
			return;
		}

		try {
			const jsonContent = JSON.stringify(formValues.current);
			await submitForm(formURL, jsonContent);
			setSubmitted(true);
		} catch (error) {
			handleError(error);
		}
	};

	if (submitted) {
		return (
			<div className='flex size-full items-center justify-center p-8'>
				<div className='flex w-full max-w-[38.75rem] flex-grow flex-col gap-4 overflow-y-auto rounded border bg-background p-8 shadow-xl shadow-blue-700'>
					<h1 className='text-2xl font-bold'>Form submitted</h1>
					<p className='text-muted-foreground'>
						Thank you for submitting the form, you can close this page now
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className='flex size-full items-center justify-center p-8'>
			<div
				key={renderKey}
				className='flex w-full max-w-[38.75rem] flex-grow flex-col gap-4 overflow-y-auto rounded border bg-background p-8 shadow-xl shadow-blue-700'>
				{elements.map((element) => {
					const { id, type } = element;
					const FormElement = formElements[type].FormComponent;
					return (
						<FormElement
							key={id}
							elementInstance={element}
							submitValue={submitValue}
							isInvalid={formErrors.current[element.id]}
							defaultValue={formValues.current[element.id]}
						/>
					);
				})}
				<Button className='mt-8' disabled={isPending} onClick={() => startTransition(onSubmit)}>
					{isPending ? (
						<ImSpinner2 className='animate-spin' />
					) : (
						<>
							<HiCursorClick className='mr-2' /> Submit
						</>
					)}
				</Button>
			</div>
		</div>
	);
};
