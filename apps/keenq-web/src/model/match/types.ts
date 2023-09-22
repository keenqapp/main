import { IMember } from '@/model/member'


export interface IMatch {
	id: string
	authorId: string
	memberId: string
	type: 'yes' | 'no'
	result: boolean
	member?: IMember
	author?: IMember
}
