import { addSeconds, subDays, subMinutes, subSeconds } from 'date-fns'

import { IMessage } from '@/model/message'
import { nullString } from '@/utils/utils'


export const messages = [
	{
		id: '-3',
		text: 'Special˜ blisses rejects most affirmations.',
		date: subDays(subSeconds(new Date(), 10), 20).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorId: 'me',
		prevAuthorId: nullString(),
		nextAuthorId: nullString(),
		attachments: [
			{ id: '1', type: 'image', url: 'https://picsum.photos/200/300', width: 200, height: 300 },
		],
		author: { id: 'me', name: 'boris' }
	},
	{
		id: '-2',
		text: 'A lot of solitude happens when you trap pain so balanced that whatsoever you are diing is your uniqueness.',
		date: subDays(subSeconds(new Date(), 9), 20).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorId: 'me',
		prevAuthorId: nullString(),
		nextAuthorId: nullString(),
		attachments: [],
		author: { id: '1', name: 'boris' }
	},
	{
		id: '-1',
		text: 'Hi 🤔\nA fraterna˜l form of justice is the life.',
		date: subDays(subSeconds(new Date(), 8), 20).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorId: 'me',
		prevAuthorId: nullString(),
		nextAuthorId: nullString(),
		attachments: [],
		author: { id: '1', name: 'boris' }
	},
	{
		id: '3',
		text: 'Hi 🤔\nA fraterna˜l form of justice is the life.',
		date: subDays(new Date(), 10).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorId: '1',
		prevAuthorId: nullString(),
		nextAuthorId: nullString(),
		attachments: [],
		author: { id: '1', name: 'Patrisia' }
	},

	{
		id: '1',
		text: 'A lot of solitude happens when you trap pain so balanced that whatsoever you are diing is your uniqueness.',
		date: subDays(new Date(), 12).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorId: '1',
		prevAuthorId: nullString(),
		nextAuthorId: nullString(),
		attachments: [],
		author: { id: '1', name: 'Patrisia' }
	},

	{
		id: '222',
		text: '',
		date: subDays(new Date(), 12).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorId: '2',
		prevAuthorId: nullString(),
		nextAuthorId: nullString(),
		author: { id: '2', name: 'Mia' },
		attachments: [
			{ id: '222_1', type: 'image', url: 'https://picsum.photos/300/100', width: 300, height: 100 },
		],
	},

	{
		id: '2',
		text: 'one',
		date: subDays(new Date(), 11).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorId: '2',
		prevAuthorId: nullString(),
		nextAuthorId: nullString(),
		attachments: [],
		author: { id: '2', name: 'Mia' }
	},

	{
		id: '444',
		text: '',
		date: subMinutes(new Date(), 10).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorId: '222',
		prevAuthorId: nullString(),
		nextAuthorId: nullString(),
		attachments: [{ id: '333333', type: 'image', url: 'https://picsum.photos/200/300', width: 200, height: 300 },],
		author: { id: '222', name: 'Imagine', image: 'https://picsum.photos/40/40' }
	},

	{
		id: '4',
		text: 'ONE!!!.',
		date: subMinutes(new Date(), 10).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorId: '2',
		prevAuthorId: nullString(),
		nextAuthorId: nullString(),
		attachments: [],
		author: { id: '2', name: 'Mia', image: 'https://picsum.photos/40/40' }
	},
	{
		id: '6',
		text: 'THRREEE!!!.',
		date: subMinutes(new Date(), 8).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorId: '1',
		prevAuthorId: nullString(),
		nextAuthorId: nullString(),
		attachments: [],
		author: { id: '1', name: 'Mia', image: 'https://picsum.photos/40/40' }
	},
	{
		id: '5',
		text: 'A lot of solitude happens when you trap pain so balanced that whatsoever you are diing is your uniqueness.',
		date: subMinutes(new Date(), 9).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorId: '1',
		prevAuthorId: nullString(),
		nextAuthorId: nullString(),
		attachments: [],
		author: { id: '1', name: 'Patrisia', image: 'https://picsum.photos/40/40' }
	},


	{
		id: '7',
		text: 'Hi 🤔\nA fraterna˜l form of justice is the life.',
		date: subMinutes(new Date(), 5).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorId: 'me',
		prevAuthorId: nullString(),
		nextAuthorId: nullString(),
		attachments: [],
		author: { id: 'me', name: 'boris' }
	},
	{
		id: '9',
		text: 'Special˜ blisses rejects most affirmations.',
		date: new Date('2023-06-11T20:59:32.867Z').toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorId: 'me',
		prevAuthorId: nullString(),
		nextAuthorId: nullString(),
		attachments: [],
		author: { id: 'me', name: 'boris' }
	},
	{
		id: '8',
		text: 'Special˜ blisses rejects most affirmations.',
		date: subMinutes(new Date(), 4).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorId: 'me',
		prevAuthorId: nullString(),
		nextAuthorId: nullString(),
		attachments: [],
		author: { id: 'me', name: 'boris' }
	},


	{
		id: '10',
		text: 'Special˜ blisses.',
		date: new Date('2023-06-11T21:00:10.867Z').toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorId: 'me',
		prevAuthorId: nullString(),
		nextAuthorId: nullString(),
		attachments: [
			{ id: '3', type: 'image', url: 'https://picsum.photos/200/200', width: 200, height: 300 },
		],
		author: { id: 'me', name: 'boris', image: '' }
	},
	{
		id: '11',
		text: 'A lot of solitude happens when you trap pain so balanced that whatsoever you are diing is your uniqueness.',
		date: subSeconds(new Date(), 9).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorId: 'me',
		prevAuthorId: nullString(),
		nextAuthorId: nullString(),
		attachments: [],
		author: { id: 'me', name: 'boris' }
	},
	{
		id: '12',
		text: 'Hi 🤔\nA fraterna˜l form of justice is the life.',
		date: subSeconds(new Date(), 8).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorId: 'me',
		prevAuthorId: nullString(),
		nextAuthorId: nullString(),
		author: { id: 'me', name: 'boris' }
	},
	{
		id: '13',
		type: 'personal',
		date: subSeconds(new Date(), 8).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorId: '1',
		prevAuthorId: nullString(),
		nextAuthorId: nullString(),
		author: { id: '1', name: 'Patrisia', image: 'https://picsum.photos/40/40' },
		content: [
			{ type: 'text', value: { text: 'The enlightenment is a parallel moon.' } },
			{ type: 'image', value: { id: '4', type: 'image', url: 'https://picsum.photos/200/300', width: 200, height: 300 } }
		],
	},
	{
		id: '14',
		type: 'personal',
		date: addSeconds(new Date(), 100).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorId: 'me',
		prevAuthorId: nullString(),
		nextAuthorId: nullString(),
		author: { id: 'me', name: 'boris' },
		content: [
			{ type: 'text', value: { text: 'The enlightenment is a parallel moon.' } },
			{ type: 'image', value: { id: '4', type: 'image', url: 'https://picsum.photos/200/300', width: 200, height: 300 } }
		],
	},
	{
		id: '15',
		type: 'personal',
		date: addSeconds(new Date(), 200).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorId: 'me',
		prevAuthorId: nullString(),
		nextAuthorId: nullString(),
		attachments: [],
		author: { id: 'me', name: 'boris' },
		content: [
			{ type: 'text', value: { text: 'i' } },
			{
				type: 'reply',
				value: {
					id: '13',
					author: { name: 'Patrisia' },
					date: subSeconds(new Date(), 8).toISOString(),
					content: [
						{ type: 'text', value: { text: 'The enlightenment is a parallel moon.' } },
						{ type: 'image', value: { id: '4', url: 'https://picsum.photos/200/300', width: 200, height: 300 } }
					]
				}
			}
		],
		reactionsCount: [
			{ id: '❤️', emoji: '❤️', count: 2 },
			{ id: '🔥', emoji: '🔥', count: 1 },
			{ id: '️👍', emoji: '️👍', count: 1 },
			{ id: '👎', emoji: '👎', count: 100 },
			{ id: '😄', emoji: '😄', count: 22 },
			{ id: '🥰', emoji: '🥰', count: 2 },
		]
	},
	{
		id: '16',
		type: 'personal',
		date: addSeconds(new Date(), 1000).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorId: '1',
		prevAuthorId: nullString(),
		nextAuthorId: nullString(),
		author: { id: '1', name: 'Patrisia' },
		content: [
			{ type: 'text', value: { text: 'If you sit or remain with a popular affirmation, peace experiences you..' } },
			{
				type: 'reply',
				value: {
					id: '13',
					author: { name: 'Patrisia' },
					date: subSeconds(new Date(), 8).toISOString(),
					content: [
						{ type: 'image', value: { id: '4', url: 'https://picsum.photos/200/300', width: 200, height: 300 } }
					]
				}
			}
		],
	},
	{
		id: '17',
		type: 'system',
		date: addSeconds(new Date(), 990).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorId: 'keenq',
		prevAuthorId: nullString(),
		nextAuthorId: nullString(),
		author: { id: 'keenq', name: 'keenq' },
		content: [
			{ type: 'text', value: { text: 'keenq shall come!' } }
		],
	},
	{
		id: '18',
		type: 'system',
		date: addSeconds(new Date(), 990).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorId: 'keenq',
		prevAuthorId: nullString(),
		nextAuthorId: nullString(),
		author: { id: 'keenq', name: 'keenq' },
		content: [
			{ type: 'text', value: { text: 'When one hurts thought and ascension, one is able to acquire truth. Not over there or earth, receive the courage.' } }
		],
	},
	{
		id: '19',
		type: 'personal',
		date: addSeconds(new Date(), 2000).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorId: '2',
		prevAuthorId: nullString(),
		nextAuthorId: nullString(),
		author: { id: '2', name: 'Mia' },
		content: [
			{ type: 'image', value: { id: '4', url: 'https://picsum.photos/200/300', width: 200, height: 300 } }
		],
		reactionsCount: [
			{ id: '1', emoji: '❤️', count: 2 },
			{ id: '2', emoji: '🔥', count: 1 },
			{ id: '3', emoji: '️👍', count: 1 },
			{ id: '4', emoji: '👎', count: 100 },
			{ id: '5', emoji: '😄', count: 22 },
			{ id: '6', emoji: '🥰', count: 2 },
		]
	},
	{
		id: '20',
		type: 'system',
		date: addSeconds(new Date(), 1990).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorId: 'keenq',
		prevAuthorId: nullString(),
		nextAuthorId: nullString(),
		author: { id: 'keenq', name: 'keenq' },
		content: [
			{ type: 'partnerRequest', value: { fromId: 'me', from: { id: 'me', name: 'boris' } } }
		],
	},
	{
		id: '21',
		type: 'personal',
		date: addSeconds(new Date(), 2001).toISOString(),
		prevDate: nullString(),
		nextDate: nullString(),
		authorId: 'me',
		prevAuthorId: nullString(),
		nextAuthorId: nullString(),
		author: { id: 'me', name: 'boris' },
		content: [
			{ type: 'image', value: { id: '4', url: 'https://picsum.photos/200/300', width: 200, height: 300 } }
		],
		reactionsCount: [
			{ id: '1', emoji: '❤️', count: 2 },
			{ id: '2', emoji: '🔥', count: 1 },
		]
	}
] as unknown as IMessage[]
