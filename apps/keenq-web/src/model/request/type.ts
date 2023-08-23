export interface IRequest {
	id: string
	type: 'report'
	status: 'open' | 'pending' | 'closed'
	authorId: string
	content: (IReport)[]
	createdAt: string
	updatedAt: string
}

export interface IReport {
	id: string
	entity: 'member'
	clause: 'spam' | 'abuse' | 'violation'
}
