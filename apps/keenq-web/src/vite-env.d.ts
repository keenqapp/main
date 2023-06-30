/// <reference types="vite/client" />

declare global {
	type Timer = ReturnType<typeof setTimeout>
}
