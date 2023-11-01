import { object, string, number } from 'yup'

import { getCreds, ensureCreds, success, error, validate } from '../../shared.js'


const schema = object({
	id: string().required(),
	offset: number().default(0),
	limit: number().default(3)
})

const sql = `
with current_member as (
	select * from members where members.id = :id
)
select
	matchable.id,
	matchable.distance,
	matchable.images,
	match_type.type as match_type
from current_member, 
	lateral (
		select
			members.id,
			members.name,
			members.images,
			ST_DistanceSphere(
				current_member.point,
				members.point
		) as distance
		from
			members,
			current_member
		where members.id != :id
		and members."deletedAt" is null
		and members."bannedAt" is null
		and members.visible = true
		and members.done = true
		and (
			case
          when (current_member.gender = 'male' and current_member.sexuality = 'hetero') then members.gender = 'female'
          when (current_member.gender = 'male' and current_member.sexuality = 'flexible')
              then (members.gender = 'female' or (members.gender = 'male' and members.sexuality != 'hetero'))
          when (current_member.gender = 'female' and current_member.sexuality = 'hetero') then members.gender != 'female'
          when (current_member.gender = 'female' and current_member.sexuality = 'flexible')
              then (members.gender = 'male' or (members.gender = 'female' and members.sexuality != 'hetero'))
				when current_member.gender is null then true
				else true
			end
		)
		order by distance
	) as matchable
left join (
	select "memberId", type
	from matches
	where "authorId" = :id
) as match_type on matchable.id = match_type."memberId"
where (
	case
		when current_member.point is null then true
		when matchable.distance is not null then true
	end
)
and matchable.id not in (
	select "memberId" from matches where "authorId" = :id and type in ('no', 'yes')
)
and matchable.id not in (
	select "authorId" from matches where "memberId" = :id and type = 'no'
)
order by
	case
		when match_type.type is null then 1
		when match_type.type = 'seen' then 2
		else 3
	end,
	matchable.distance
limit :limit
offset :offset
`

async function getMatches({ id, offset, limit }, db) {
	const result = await db.raw(sql, { id, offset, limit })
	if (result?.rows?.length === 0) return []
	return result?.rows
}

export default async function match(body, db) {
	try {
		const { id, offset, limit } = validate(body, schema)

		const creds = await getCreds(id, db)
		await ensureCreds(creds, id)

		const match = await getMatches({ id, offset, limit }, db)

		return success(match)
	}
	catch(e) {
		return error(e)
	}
}
