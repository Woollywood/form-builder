import React from 'react';
import { IconType } from 'react-icons/lib';

export type ElementsType = 'text' | 'title';
export type SubmitFunction = (key: string, value: string) => void;
export interface FormElement {
	type: ElementsType;
	construct: (id: string) => FormElementInstance;
	designerButtonElement: {
		icon: IconType;
		label: string;
	};
	DesignerComponent: React.FC<{ elementInstance: FormElementInstance }>;
	FormComponent: React.FC<{
		elementInstance: FormElementInstance;
		submitValue?: SubmitFunction;
		isInvalid?: boolean;
		defaultValue?: string;
	}>;
	PropertiesComponent: React.FC<{ elementInstance: FormElementInstance }>;
	validate: (formElement: FormElementInstance, currentValue: string) => boolean;
}
export interface FormElementInstance {
	id: string;
	type: ElementsType;
	extraAttributes?: Record<string, unknown>;
}
export type FormElementsType = {
	[key in ElementsType]: FormElement;
};
