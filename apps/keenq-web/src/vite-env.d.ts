/// <reference types="vite/client" />

import {
	AnyComponent,
	ComponentChild,
	createElement,
	FunctionalComponent,
	RenderableProps, VNode
} from 'preact'

import React from 'react'

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

declare global {
	namespace React {
		interface ReactElement {
			nodeName: any
			attributes: any
			children: any
		}

		interface ReactPortal extends ReactElement {
			children?: VNode<any>;
		}
	}
}
