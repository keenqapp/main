function IfElse({ cond, children }: { cond: boolean, children: any }) {
	console.log('--- IfElse.tsx:2 -> IfElse -> ', children)
	if (cond) return children[0]
	else return children[1]
}

export default IfElse
