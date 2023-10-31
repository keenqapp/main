import * as Sentry from '@sentry/react'


Sentry.init({
	dsn: 'https://36d7cc6ca6a57e108467bb071eaa0a05@o4506144731627520.ingest.sentry.io/4506144732610560',
	integrations: [
		new Sentry.BrowserTracing(),
		new Sentry.Replay(),
	],
	tracePropagationTargets: ['localhost', /^https:\/\/keenq\.app/],
	tracesSampleRate: 1.0,
	replaysSessionSampleRate: 1.0,
	replaysOnErrorSampleRate: 1.0,
})
