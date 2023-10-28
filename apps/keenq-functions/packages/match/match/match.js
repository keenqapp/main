import { object, string } from 'yup'

import { getDb, getCreds, ensureCreds, success, error, validate } from './shared.js'


const schema = object({
	id: string().required(),
})

const dbConfig = {
	client: 'pg',
	connection: {
		connectionString: process.env.DB_CONNECTION_STRING,
		application_name: 'keenq-functions_match_match',
		ssl: { rejectUnauthorized: false },
	},
	pool: { min: 0, max: 2 }
}

const sql = (seen = false) => `
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
           when (current_member.gender = 'male' and current_member.sexuality = 'hetero') then members.gender != 'male'
           when (current_member.gender = 'female' and current_member.sexuality = 'hetero') then members.gender != 'female'
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
limit 3
`

async function search(id, seen, db) {
	try {
		const result = await db.raw(sql(seen), { id })
		return result.rows
	}
	catch (e) {
		throw e
	}
}

async function getMatch(id, db) {
	let match = await search(id, false, db)
	if (match.length === 0) throw { reason: 'No match found' }
	return match
}

export async function main(body) {
	let db
	try {
		const { id } = validate(body, schema)

	  db = getDb(dbConfig)

		const creds = await getCreds(id, db)
		await ensureCreds(creds, id)

		const match = await getMatch(id, db)

		return success(match)
	}
	catch(e) {
		return error(e)
	}
	finally {
		db?.destroy()
	}
}
