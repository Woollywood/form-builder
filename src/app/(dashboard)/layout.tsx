import React from 'react';
import { NextPage } from 'next';
import { UserButton } from '@clerk/nextjs';
import { Logo } from '@/components/shared/Logo';
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher';

const Layout: NextPage<React.PropsWithChildren> = ({ children }) => {
	return (
		<div className='container flex max-h-screen min-h-screen flex-col bg-background'>
			<nav className='flex h-[3.75rem] items-center justify-between border-b border-border px-4 py-2'>
				<Logo />
				<div className='flex items-center gap-x-4'>
					<ThemeSwitcher />
					<UserButton afterSwitchSessionUrl='/sign-in' />
				</div>
			</nav>
			<main className='flex w-full flex-grow'>{children}</main>
		</div>
	);
};

export default Layout;
