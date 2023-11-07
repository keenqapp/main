function IfElse({ cond, children }: { cond: boolean, children: any }) {
	if (cond) return children[0]
	else return children[1]
}

export default IfElse
