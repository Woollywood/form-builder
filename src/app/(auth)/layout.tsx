import { NextPage } from 'next';

const Layout: NextPage<React.PropsWithChildren> = ({ children }) => {
	return <div className='container flex min-h-screen items-center justify-center'>{children}</div>;
};

export default Layout;
