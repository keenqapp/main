import { addSeconds, subDays, subMinutes, subSeconds } from 'date-fns'

import { nullString } from '@/utils/utils'


export const messages = [
	{
		uid: '-3',
		text: 'Special˜ blisses rejects most affirmations.',
		date: subDays(subSeconds(new Date(), 10), 20).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorUid: 'me',
		prevAuthorUid: nullString(),
		nextAuthorUid: nullString(),
		attachments: [
			{ uid: '1', type: 'image', url: 'https://picsum.photos/200/300' },
		],
		author: { uid: '2', name: 'Me' }
	},
	{
		uid: '-2',
		text: 'A lot of solitude happens when you trap pain so balanced that whatsoever you are diing is your uniqueness.',
		date: subDays(subSeconds(new Date(), 9), 20).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorUid: 'me',
		prevAuthorUid: nullString(),
		nextAuthorUid: nullString(),
		attachments: [],
		author: { uid: '1', name: 'Patrisia' }
	},
	{
		uid: '-1',
		text: 'Hi 🤔\nA fraterna˜l form of justice is the life.',
		date: subDays(subSeconds(new Date(), 8), 20).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorUid: 'me',
		prevAuthorUid: nullString(),
		nextAuthorUid: nullString(),
		attachments: [],
		author: { uid: '1', name: 'Patrisia' }
	},
	{
		uid: '3',
		text: 'Hi 🤔\nA fraterna˜l form of justice is the life.',
		date: subDays(new Date(), 10).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorUid: '1',
		prevAuthorUid: nullString(),
		nextAuthorUid: nullString(),
		attachments: [],
		author: { uid: '1', name: 'Patrisia' }
	},

	{
		uid: '1',
		text: 'A lot of solitude happens when you trap pain so balanced that whatsoever you are diing is your uniqueness.',
		date: subDays(new Date(), 12).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorUid: '1',
		prevAuthorUid: nullString(),
		nextAuthorUid: nullString(),
		attachments: [],
		author: { uid: '1', name: 'Patrisia' }
	},

	{
		uid: '2',
		text: 'one',
		date: subDays(new Date(), 11).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorUid: '1',
		prevAuthorUid: nullString(),
		nextAuthorUid: nullString(),
		attachments: [],
		author: { uid: '2', name: 'Me' }
	},


	{
		uid: '4',
		text: 'two.',
		date: subMinutes(new Date(), 10).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorUid: '1',
		prevAuthorUid: nullString(),
		nextAuthorUid: nullString(),
		attachments: [],
		author: { uid: '2', name: 'Me' }
	},
	{
		uid: '6',
		text: 'three',
		date: subMinutes(new Date(), 8).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorUid: '1',
		prevAuthorUid: nullString(),
		nextAuthorUid: nullString(),
		attachments: [],
		author: { uid: '2', name: 'Me' }
	},
	{
		uid: '5',
		text: 'A lot of solitude happens when you trap pain so balanced that whatsoever you are diing is your uniqueness.',
		date: subMinutes(new Date(), 9).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorUid: '1',
		prevAuthorUid: nullString(),
		nextAuthorUid: nullString(),
		attachments: [],
		author: { uid: '1', name: 'Patrisia' }
	},


	{
		uid: '7',
		text: 'Hi 🤔\nA fraterna˜l form of justice is the life.',
		date: subMinutes(new Date(), 5).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorUid: 'me',
		prevAuthorUid: nullString(),
		nextAuthorUid: nullString(),
		attachments: [],
		author: { uid: '1', name: 'Patrisia' }
	},
	{
		uid: '9',
		text: 'Special˜ blisses rejects most affirmations.',
		date: new Date('2023-06-11T20:59:32.867Z').toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorUid: 'me',
		prevAuthorUid: nullString(),
		nextAuthorUid: nullString(),
		attachments: [],
		author: { uid: '2', name: 'Me' }
	},
	{
		uid: '8',
		text: 'Special˜ blisses rejects most affirmations.',
		date: subMinutes(new Date(), 4).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorUid: 'me',
		prevAuthorUid: nullString(),
		nextAuthorUid: nullString(),
		attachments: [],
		author: { uid: '2', name: 'Me' }
	},


	{
		uid: '10',
		text: 'Special˜ blisses.',
		date: new Date('2023-06-11T21:00:10.867Z').toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorUid: 'me',
		prevAuthorUid: nullString(),
		nextAuthorUid: nullString(),
		attachments: [
			{ uid: '3', type: 'image', url: 'https://picsum.photos/200/300' },
		],
		author: { uid: '2', name: 'Me' }
	},
	{
		uid: '11',
		text: 'A lot of solitude happens when you trap pain so balanced that whatsoever you are diing is your uniqueness.',
		date: subSeconds(new Date(), 9).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorUid: 'me',
		prevAuthorUid: nullString(),
		nextAuthorUid: nullString(),
		attachments: [],
		author: { uid: '1', name: 'Patrisia' }
	},
	{
		uid: '12',
		text: 'Hi 🤔\nA fraterna˜l form of justice is the life.',
		date: subSeconds(new Date(), 8).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorUid: 'me',
		prevAuthorUid: nullString(),
		nextAuthorUid: nullString(),
		author: { uid: '1', name: 'Patrisia' }
	},
	{
		uid: '12',
		text: '',
		date: addSeconds(new Date(), 100).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorUid: 'me',
		prevAuthorUid: nullString(),
		nextAuthorUid: nullString(),
		attachments: [
			{ uid: '4', type: 'image', url: 'https://picsum.photos/300/200' },
		],
		author: { uid: '1', name: 'Patrisia' }
	},
	{
		uid: '12',
		text: 'me',
		date: addSeconds(new Date(), 200).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorUid: 'me',
		prevAuthorUid: nullString(),
		nextAuthorUid: nullString(),
		attachments: [],
		author: { uid: '1', name: 'Patrisia' }
	},
]
