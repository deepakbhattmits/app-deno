/** @format */

// @desc    Get all Activities

import { Activity } from '../types/activity.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import db from '../mongodb.ts';
const activitiesCollection = db.collection('activities');

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

// @route   GET /api/v1/activities
const getActivities = async ({ response }: { response: any }) => {
	const activitiesDB = await activitiesCollection.find();
	response.body = {
		success: true,
		data: activitiesDB,
	};
};

// @desc    Get single Activity
// @route   GET /api/v1/activities/:id
const getActivity = async ({
	params,
	response,
}: {
	params: { id: string };
	response: any;
}) => {
	// const activity: Activity | undefined = activities.find(
	// 	(p) => p.id === params.id
	// );
	const activity = await activitiesCollection.findOne({
		_id: { $oid: params.id },
	});

	console.log(activity);

	if (activity) {
		response.status = 200;
		response.body = {
			success: true,
			data: activity,
		};
	} else {
		response.status = 404;
		response.body = {
			success: false,
			msg: 'No Activity found',
		};
	}
};

// @desc    Add Activity
// @route   Post /api/v1/activities
const addActivity = async ({
	request,
	response,
}: {
	request: any;
	response: any;
}) => {
	const body = await request.body();

	console.log(body);

	if (!request.hasBody) {
		response.status = 400;
		response.body = {
			success: false,
			msg: 'No data',
		};
	} else {
		const activity: Activity = body.value;
		// activity.id = v4.generate();
		// activities.push(activity);

		//Insert in MongoDB
		const id = await activitiesCollection.insertOne(activity);
		activity.id = id;
		response.status = 201;
		response.body = {
			success: true,
			data: activity,
		};
	}
};

// @desc    Update Activity
// @route   PUT /api/v1/activities/:id
const updateActivity = async ({
	params,
	request,
	response,
}: {
	params: { id: string };
	request: any;
	response: any;
}) => {
	// const activity: Activity | undefined = activities.find(
	// 	(p) => p.id === params.id
	// );
	if (request.body()) {
		const body = await request.body();
		const updatedData = body.value;
		const modifiedCount = await activitiesCollection.updateOne(
			{ _id: { $oid: params.id } },
			{
				$set: {
					...updatedData,
				},
			}
		);
		if (!modifiedCount) {
			response.status = 404;
			response.body = {
				success: false,
				msg: 'No Activity found',
			};
		}
		response.status = 200;
		response.body = {
			success: true,
			data: await activitiesCollection.findOne({ _id: { $oid: params.id } }),
		};
	} else {
		response.status = 404;
		response.body = {
			success: false,
			msg: 'No Activity found',
		};
	}
};

// @desc    Delete Activity
// @route   DELETE /api/v1/activities/:id
const deleteActivity = async ({
	params,
	response,
}: {
	params: { id: string };
	response: any;
}) => {
	const count = await activitiesCollection.deleteOne({
		_id: { $oid: params.id },
	});
	if (!count) {
		response.status = 404;
		response.body = {
			success: false,
			masg: 'No data Found ',
		};
	} else {
		response.status = 200;
		response.body = {
			success: true,
			data: 'Activity Deleted',
		};
	}
};

export {
	getActivities,
	getActivity,
	addActivity,
	updateActivity,
	deleteActivity,
};
