function If({ cond, children }: { cond: boolean, children: any }) {
	if (!cond) return null
	return (
		<>
			{children}
		</>
	)
}

export default If
