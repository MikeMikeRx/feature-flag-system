# Feature Flag System

A minimal feature flag system built with TypeScript.

## Features

- Boolean feature flags
- User-based targeting
- Role-based targeting
- Percentage rollout support

## How it works

Flags are evaluated by key:

- `isEnabled(flagKey, context)`

Evaluation can use:

- enabled / disabled state
- user ID
- role
- rollout percentage

## Running locally

Install dependencies:
```bash
npm install
```

Run tests
```bash
npm run test
```