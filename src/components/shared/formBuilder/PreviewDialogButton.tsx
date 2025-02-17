import React from 'react';
import { Button } from '@/components/ui/button';
import { MdPreview } from 'react-icons/md';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { formBuilderStore } from './store';
import { formElements } from './formElements/formElements';
import { observer } from 'mobx-react-lite';

export const PreviewDialogButton: React.FC = observer(() => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='gap-2' variant='outline'>
					<MdPreview className='size-6' />
					Preview
				</Button>
			</DialogTrigger>
			<DialogContent className='flex h-screen max-h-screen w-screen max-w-full flex-grow flex-col gap-0 p-0'>
				<DialogHeader className='border-b px-4 py-2'>
					<DialogTitle>
						<p className='text-lg font-bold text-muted-foreground'>Form preview</p>
					</DialogTitle>
					<p className='text-sm text-muted-foreground'>This is how your form will look like to your users</p>
				</DialogHeader>
				<div className='flex flex-grow flex-col items-center justify-center overflow-y-auto bg-accent bg-[url(/paper.svg)] py-4 dark:bg-[url(/paper-dark.svg)]'>
					<div className='flex h-full w-full max-w-[38.75rem] flex-grow flex-col gap-4 overflow-y-auto rounded-3xl bg-background p-8'>
						{formBuilderStore.elements.map((element) => {
							const { id, type } = element;
							const FormComponent = formElements[type].FormComponent;
							return <FormComponent key={id} elementInstance={element} />;
						})}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
});
