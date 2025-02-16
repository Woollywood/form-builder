import React from 'react';
import { NextPage } from 'next';

const Layout: NextPage<React.PropsWithChildren> = ({ children }) => {
	return <div className='flex size-full items-center justify-center'>{children}</div>;
};

export default Layout;
