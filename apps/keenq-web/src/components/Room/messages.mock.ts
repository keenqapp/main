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
			{ uid: '1', type: 'image', url: 'https://picsum.photos/200/300', width: 200, height: 300 },
		],
		author: { uid: 'me', name: 'boris' }
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
		author: { uid: '1', name: 'boris' }
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
		author: { uid: '1', name: 'boris' }
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
		uid: '222',
		text: '',
		date: subDays(new Date(), 12).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorUid: '2',
		prevAuthorUid: nullString(),
		nextAuthorUid: nullString(),
		author: { uid: '2', name: 'Mia' },
		attachments: [
			{ uid: '222_1', type: 'image', url: 'https://picsum.photos/300/100', width: 300, height: 100 },
		],
	},

	{
		uid: '2',
		text: 'one',
		date: subDays(new Date(), 11).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorUid: '2',
		prevAuthorUid: nullString(),
		nextAuthorUid: nullString(),
		attachments: [],
		author: { uid: '2', name: 'Mia' }
	},

	{
		uid: '444',
		text: '',
		date: subMinutes(new Date(), 10).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorUid: '222',
		prevAuthorUid: nullString(),
		nextAuthorUid: nullString(),
		attachments: [{ uid: '333333', type: 'image', url: 'https://picsum.photos/200/300', width: 200, height: 300 },],
		author: { uid: '222', name: 'Imagine', image: 'https://picsum.photos/40/40' }
	},

	{
		uid: '4',
		text: 'ONE!!!.',
		date: subMinutes(new Date(), 10).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorUid: '2',
		prevAuthorUid: nullString(),
		nextAuthorUid: nullString(),
		attachments: [],
		author: { uid: '2', name: 'Mia', image: 'https://picsum.photos/40/40' }
	},
	{
		uid: '6',
		text: 'THRREEE!!!.',
		date: subMinutes(new Date(), 8).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorUid: '1',
		prevAuthorUid: nullString(),
		nextAuthorUid: nullString(),
		attachments: [],
		author: { uid: '1', name: 'Mia', image: 'https://picsum.photos/40/40' }
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
		author: { uid: '1', name: 'Patrisia', image: 'https://picsum.photos/40/40' }
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
		author: { uid: 'me', name: 'boris' }
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
		author: { uid: 'me', name: 'boris' }
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
		author: { uid: 'me', name: 'boris' }
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
			{ uid: '3', type: 'image', url: 'https://picsum.photos/200/200', width: 200, height: 300 },
		],
		author: { uid: 'me', name: 'boris', image: '' }
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
		author: { uid: 'me', name: 'boris' }
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
		author: { uid: 'me', name: 'boris' }
	},
	{
		uid: '13',
		date: subSeconds(new Date(), 8).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorUid: '1',
		prevAuthorUid: nullString(),
		nextAuthorUid: nullString(),
		author: { uid: '1', name: 'Patrisia', image: 'https://picsum.photos/40/40' },
		content: [
			{ type: 'text', value: { text: 'The enlightenment is a parallel moon.' } },
			{ type: 'image', value: { uid: '4', type: 'image', url: 'https://picsum.photos/200/300', width: 200, height: 300 } }
		],
	},
	{
		uid: '14',
		date: addSeconds(new Date(), 100).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorUid: 'me',
		prevAuthorUid: nullString(),
		nextAuthorUid: nullString(),
		author: { uid: 'me', name: 'boris' },
		content: [
			{ type: 'text', value: { text: 'The enlightenment is a parallel moon.' } },
			{ type: 'image', value: { uid: '4', type: 'image', url: 'https://picsum.photos/200/300', width: 200, height: 300 } }
		],
	},
	{
		uid: '15',
		date: addSeconds(new Date(), 200).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorUid: 'me',
		prevAuthorUid: nullString(),
		nextAuthorUid: nullString(),
		attachments: [],
		author: { uid: 'me', name: 'boris' },
		content: [
			{ type: 'text', value: { text: 'im with you' } },
			{
				type: 'reply',
				value: {
					uid: '13',
					author: { name: 'Patrisia' },
					date: subSeconds(new Date(), 8).toISOString(),
					content: [
						{ type: 'text', value: { text: 'The enlightenment is a parallel moon.' } },
						{ type: 'image', value: { uid: '4', url: 'https://picsum.photos/200/300', width: 200, height: 300 } }
					]
				}
			}
		]
	},
	{
		uid: '16',
		date: addSeconds(new Date(), 1000).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorUid: '1',
		prevAuthorUid: nullString(),
		nextAuthorUid: nullString(),
		author: { uid: '1', name: 'Patrisia' },
		content: [
			{ type: 'text', value: { text: 'If you sit or remain with a popular affirmation, peace experiences you..' } },
			{
				type: 'reply',
				value: {
					uid: '13',
					author: { name: 'Patrisia' },
					date: subSeconds(new Date(), 8).toISOString(),
					content: [
						{ type: 'image', value: { uid: '4', url: 'https://picsum.photos/200/300', width: 200, height: 300 } }
					]
				}
			}
		],
	},
	{
		uid: '17',
		date: addSeconds(new Date(), 2000).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorUid: '2',
		prevAuthorUid: nullString(),
		nextAuthorUid: nullString(),
		author: { uid: '2', name: 'Mia' },
		content: [
			{ type: 'image', value: { uid: '4', url: 'https://picsum.photos/200/300', width: 200, height: 300 } }
		],
	},
	{
		uid: '18',
		date: addSeconds(new Date(), 2001).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorUid: 'me',
		prevAuthorUid: nullString(),
		nextAuthorUid: nullString(),
		author: { uid: 'me', name: 'boris' },
		content: [
			{ type: 'image', value: { uid: '4', url: 'https://picsum.photos/200/300', width: 200, height: 300 } }
		],
	},
]
