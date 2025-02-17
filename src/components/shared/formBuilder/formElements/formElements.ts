import { ElementsType, FormElement, FormElementsType } from './types';
import { TextField } from './TextField';
import { TitleField } from './TitleField';
import { SubtitleField } from './SubtitleField';
import { ParagraphField } from './ParagraphField';
import { Separator } from './Separator';
import { SpacerField } from './SpacerField';
import { NumberField } from './NumberField';
import { TextareaField } from './TextareaField';
import { DateField } from './DateField';
import { SelectField } from './SelectField';
import { CheckboxField } from './CheckboxField';

export const formElements: FormElementsType = {
	title: TitleField,
	subtitle: SubtitleField,
	paragraph: ParagraphField,
	separator: Separator,
	spacer: SpacerField,

	text: TextField,
	number: NumberField,
	textarea: TextareaField,
	date: DateField,
	select: SelectField,
	checkbox: CheckboxField,
};

export type LayoutElements = Extract<ElementsType, 'title' | 'subtitle' | 'paragraph' | 'separator' | 'spacer'>;
export type FormElements = Extract<ElementsType, 'text' | 'number' | 'textarea' | 'date' | 'select' | 'checkbox'>;
export interface Section<T extends string> {
	label: string;
	elements: Record<T, FormElement>;
}

export type SidebarSections = [Section<LayoutElements>, Section<FormElements>];
export const sections: SidebarSections = [
	{
		label: 'Layout elements',
		elements: {
			title: TitleField,
			subtitle: SubtitleField,
			paragraph: ParagraphField,
			separator: Separator,
			spacer: SpacerField,
		},
	},
	{
		label: 'Form elements',
		elements: {
			text: TextField,
			number: NumberField,
			textarea: TextareaField,
			date: DateField,
			select: SelectField,
			checkbox: CheckboxField,
		},
	},
];
