/// <reference types="vite/client" />

import {
	AnyComponent,
	createElement,
	FunctionalComponent,
	RenderableProps,
	ComponentChild
} from 'preact'

export {
	Attributes,
	FunctionalComponent as SFC,
	AnyComponent as ComponentType,
	AnyComponent as JSXElementConstructor,
	Component as ComponentClass,
	ClassAttributes,
	PreactContext as Context,
	PreactProvider as Provider,
	VNode as ReactElement,
	VNode as ReactNode,
	createElement,
	Fragment,
	Ref,
	render,
	JSX,
	RenderableProps as ComponentPropsWithRef
} from 'preact'

declare global {
	type Timer = ReturnType<typeof setTimeout>
}
