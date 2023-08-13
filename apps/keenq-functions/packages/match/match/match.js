import { object, string } from 'yup'

import { getDb, getCreds, ensureCreds, success, error, validate } from './shared.js'


const schema = object({
	id: string().required(),
})

const dbConfig = {
	client: 'pg',
	connection: {
		connectionString: process.env.DB_CONNECTION_STRING,
		ssl: { rejectUnauthorized: false },
	},
	pool: { min: 0, max: 2 }
}

const sql = (seen = false) => `
  with current_member as (
    select * from members where members.id = :id
  )
  select matchable.id, matchable.distance
  from (
		select
		 members.id,
		 members.name,
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
	) as matchable, 
    current_member
  where (
    case
      when current_member.point is null then true
      when matchable.distance is not null then true
    end
  )
  and matchable.id not in (
    ${seen 
	    ? `select "memberId" from matches where "authorId" = :id and type in ('no', 'yes')`
	    : 'select "memberId" from matches where "authorId" = :id'}
  )
  and matchable.id not in (
    select "authorId" from matches where "memberId" = :id and type = 'no'
  )
	limit 1
`

async function search(id, seen, db) {
	try {
		const result = await db.raw(sql(seen), { id })
		return result.rows?.[0]
	}
	catch (e) {
		throw e
	}
}

async function getMatch(id, db) {
	let match = await search(id, false, db)
	if (!match) match = await search(id, true, db)
	if (!match) throw 'No match found'
	return match
}

export async function main(body) {
	let db
	try {
		const { id } = validate(body, schema)

	  db = getDb(dbConfig)

		const creds = await getCreds(id, db)
		await ensureCreds(creds)

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
