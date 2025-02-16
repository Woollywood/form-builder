import React from 'react';
import { Form } from '@prisma/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LuView } from 'react-icons/lu';
import { FaWpforms } from 'react-icons/fa';
import { BiRightArrowAlt } from 'react-icons/bi';
import { Button } from '@/components/ui/button';
import { FaEdit } from 'react-icons/fa';
import moment from 'moment';
import Link from 'next/link';

export type FormCardProps = Form;

export const FormCard: React.FC<FormCardProps> = ({
	id,
	createdAt,
	visits,
	submissions,
	name,
	description,
	published,
}) => {
	return (
		<Card className='min-h-form-card-min-height'>
			<CardHeader>
				<CardTitle className='flex items-center justify-between gap-2'>
					<span className='truncate font-bold'>{name}</span>
					<Badge variant={published ? 'default' : 'destructive'}>{published ? 'Published' : 'Draft'}</Badge>
				</CardTitle>
				<CardDescription className='flex items-center justify-between text-sm text-muted-foreground'>
					{moment(createdAt).fromNow()}
					{published && (
						<span>
							<LuView className='text-muted-foreground' />
							<span>{visits}</span>
							<FaWpforms className='text-muted-foreground' />
							<span>{submissions}</span>
						</span>
					)}
				</CardDescription>
			</CardHeader>
			<CardContent className='h-[1.25rem] truncate text-sm text-muted-foreground'>
				{description || 'No description'}
			</CardContent>
			<CardFooter>
				{published ? (
					<Button asChild className='text-md mt-2 w-full gap-4'>
						<Link href={`/forms/${id}`}>
							View submissions <BiRightArrowAlt />
						</Link>
					</Button>
				) : (
					<Button asChild className='text-md mt-2 w-full gap-4'>
						<Link href={`/builder/${id}`}>
							Edit form <FaEdit />
						</Link>
					</Button>
				)}
			</CardFooter>
		</Card>
	);
};
