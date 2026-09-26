#!/usr/bin/env bash
# Inside the emulators: start the mock AI and the app, run the spec, stop both.
set -euo pipefail
SPEC="$1"
PORT="${E2E_PORT:-3105}"
LOGS="${E2E_LOGS:-.e2e-logs}"
mkdir -p "$LOGS"
# Each background job gets its own process group, so cleanup stops its children too.
set -m

export NEXT_PUBLIC_FIREBASE_API_KEY=demo-key
export NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=demo-vocabbrain.firebaseapp.com
export NEXT_PUBLIC_FIREBASE_PROJECT_ID=demo-vocabbrain
export NEXT_PUBLIC_FIREBASE_APP_ID=demo-app
export NEXT_PUBLIC_FIREBASE_USE_EMULATOR=true
export GEMINI_API_KEY=e2e-dummy-not-a-real-key
export GEMINI_API_BASE_URL=http://localhost:4010/v1beta
export E2E_BASE_URL="http://localhost:$PORT"

if curl -s -o /dev/null "http://localhost:$PORT/"; then echo "port $PORT is already in use (an old dev server?)"; exit 1; fi

node scripts/e2e/mock-gemini.mjs >"$LOGS/mock-gemini.log" 2>&1 &
MOCK=$!
rm -rf .next/dev
npx next dev -p "$PORT" >"$LOGS/next.log" 2>&1 &
APP=$!
trap 'kill -- -$MOCK -$APP 2>/dev/null || true' EXIT

for i in $(seq 1 120); do
  curl -s -o /dev/null -w "%{http_code}" "http://localhost:$PORT/" | grep -q "^[23]" && break
  sleep 1
done
curl -s -o /dev/null -w "%{http_code}" "http://localhost:$PORT/" | grep -q "^[23]" || { echo "app did not start"; tail -40 "$LOGS/next.log"; exit 1; }

npx -y tsx "scripts/e2e/$SPEC.e2e.ts"
