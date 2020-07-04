/** @format */

import { Router } from 'https://deno.land/x/oak/mod.ts';
import {
	getActivities,
	getActivity,
	addActivity,
	updateActivity,
	deleteActivity,
} from './controllers/activity-controller.ts';

const routes = new Router();

routes.get('/api/v1/activities', getActivities);
routes.get('/api/v1/activities/:id', getActivity);
routes.post('/api/v1/activities', addActivity);
routes.put('/api/v1/activities/:id', updateActivity);
routes.delete('/api/v1/activities/:id', deleteActivity);

export default routes;
