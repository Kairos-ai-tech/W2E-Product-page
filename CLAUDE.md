# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **product promotional landing page** for W2E (What to Eat), a food discovery and matching app for Gen Z. The page is intended to showcase features, attract new users, and drive downloads/sign-ups.

The main W2E product (backend, mobile, web app) lives in a separate repository (`https://github.com/sean85120/Qubic.git`). This repo is only the promotional page.

## Current State

The project is in early bootstrapping — no application code, build tooling, or dependencies have been set up yet. Firebase Hosting has been partially initialized (firebase-debug.log exists, but no `firebase.json` or `.firebaserc` yet).

## Hosting & Deployment

- **Firebase Hosting** — the intended deployment target
- GitHub remote: `https://github.com/Kairos-ai-tech/W2E-Product-page.git`
- Firebase CLI is required: `npm install -g firebase-tools`
- Run `firebase init hosting` to complete Firebase setup when ready

## Key Files

- `product-readme.md` — full W2E product documentation (features, tech stack, architecture, roadmap). Reference this for accurate product descriptions and feature lists.
- `README.md` — project-level documentation for this promotional page repo.

## W2E Product Context

When writing promotional copy or building feature sections, reference `product-readme.md` for accurate details. Key selling points:

- Food discovery via Google Maps integration
- Squad matching — group food preference matching
- Taste profiles, rewards, achievements, streaks, food journey
- Live location sharing with travel time estimates
- Cross-platform: mobile (React Native/Expo) and web (React/Vite)
- AI-powered recommendations (OpenAI integration)
- Multi-language support (5 languages)
