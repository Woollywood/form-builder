import { useEffect, useState } from 'react';
import { useToast } from './use-toast';

export const useHandleError = () => {
	const { toast } = useToast();
	const [error, setError] = useState<unknown | null>(null);

	const handleError = (error: unknown) => {
		setError(error);
	};

	useEffect(() => {
		if (error) {
			if (error instanceof Error) {
				toast({
					variant: 'destructive',
					title: 'Something went wrong',
					description: error.message,
				});
			} else {
				toast({
					variant: 'destructive',
					title: 'Something went wrong',
					description: 'Unknown error',
				});
			}
		}
	}, [error, toast]);

	return { handleError };
};
