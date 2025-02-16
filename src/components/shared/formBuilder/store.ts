import { makeAutoObservable } from 'mobx';
import { FormElementInstance } from './formElements/types';

class Store {
	_elements: FormElementInstance[] = [];
	_selectedElement: FormElementInstance | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	addElement(index: number, element: FormElementInstance) {
		this._elements.splice(index, 0, element);
	}

	updateElement(id: string, element: FormElementInstance) {
		this._elements = this._elements.map((el) => (el.id === id ? element : el));
	}

	removeElement(id: string) {
		this._elements = this._elements.filter((element) => element.id !== id);
	}

	get elements() {
		return this._elements;
	}

	set selectedElement(element: FormElementInstance | null) {
		this._selectedElement = element;
	}

	get selectedElement(): FormElementInstance | null {
		return this._selectedElement;
	}
}

export const formBuilderStore = new Store();
