/** @format */
import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import routes from './router.ts';
import { Activity } from './types/activity.ts';
const app = new Application();
const port = 5000;
let activities: Activity[] = [
	{
		activity: 'Learn how to write in shorthand',
		accessibility: 0.1,
		type: 'education',
		participants: 1,
		price: '',
		link: '',
		id: '6778219',
	},
	{
		activity: 'Learn how to french braid hair',
		accessibility: 0.1,
		type: 'education',
		participants: 1,
		price: '',
		link: '',
		id: '8926492',
	},
	{
		activity: 'Compliment someone',
		accessibility: 0.0,
		type: 'social',
		participants: 2,
		price: '',
		link: '',
		id: '9149470',
	},
];

app.use(routes.routes());
app.use(routes.allowedMethods());
console.log('server is running : http://localhost:5000');
await app.listen({ port });
