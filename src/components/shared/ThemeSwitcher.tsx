'use client';

import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { MoonIcon, SunIcon, SunMoonIcon } from 'lucide-react';

export const ThemeSwitcher: React.FC = () => {
	const { theme, setTheme } = useTheme();
	const [isMounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<Tabs defaultValue={theme}>
			<TabsList className='border'>
				<TabsTrigger value='light' onClick={() => setTheme('light')}>
					<SunIcon className='size-[1.2rem]' />
				</TabsTrigger>
				<TabsTrigger value='dark' onClick={() => setTheme('dark')}>
					<MoonIcon className='size-[1.2rem] rotate-90 transition-all dark:rotate-0' />
				</TabsTrigger>
				<TabsTrigger value='system' onClick={() => setTheme('system')}>
					<SunMoonIcon className='size-[1.2rem]' />
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
};
