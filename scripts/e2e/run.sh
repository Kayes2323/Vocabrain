#!/usr/bin/env bash
# Runs one E2E spec against local Firebase emulators, a mock Gemini server and
# `next dev`. No real API key or Firebase project is used.
#   bash scripts/e2e/run.sh tenses
set -euo pipefail
SPEC="${1:-tenses}"
cd "$(dirname "$0")/../.."
exec npx -y firebase-tools@15 emulators:exec --only auth,firestore --project demo-vocabbrain "bash scripts/e2e/serve-and-test.sh $SPEC"
