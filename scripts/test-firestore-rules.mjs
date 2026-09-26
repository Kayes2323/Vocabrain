// Firestore security-rules checks. Run with: pnpm test:rules (starts the Firebase emulators).
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, doc, setDoc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';

const mk = (name) => {
  const app = initializeApp({ apiKey: 'fake', projectId: 'demo-vocabbrain', authDomain: 'demo.firebaseapp.com' }, name);
  const auth = getAuth(app); connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
  const db = getFirestore(app); connectFirestoreEmulator(db, '127.0.0.1', 8080);
  return { auth, db };
};
const A = mk('a'), B = mk('b');
const stamp = Date.now();
const ua = (await createUserWithEmailAndPassword(A.auth, `a${stamp}@test.dev`, 'secret123')).user;
const ub = (await createUserWithEmailAndPassword(B.auth, `b${stamp}@test.dev`, 'secret123')).user;
const results = [];
const expect = async (label, fn, shouldPass) => {
  try { await fn(); results.push([label, shouldPass ? 'PASS' : 'FAIL (was allowed)']); }
  catch (e) { results.push([label, shouldPass ? `FAIL (${e.code})` : 'PASS (denied)']); }
};
const base = (u) => ({ uid: u.uid, name: 'X', email: u.email, preferredLanguage: 'bn', createdAt: serverTimestamp(), updatedAt: serverTimestamp(), onboardingCompleted: false, targetIELTSScore: null, currentIELTSLevel: null, studyAbroadGoal: null });
await expect('A creates own profile', () => setDoc(doc(A.db, 'users', ua.uid), base(ua)), true);
await expect('B creates own profile', () => setDoc(doc(B.db, 'users', ub.uid), base(ub)), true);
await expect('A reads own profile', () => getDoc(doc(A.db, 'users', ua.uid)), true);
await expect('A reads B profile', () => getDoc(doc(A.db, 'users', ub.uid)), false);
await expect('A writes B profile', () => setDoc(doc(A.db, 'users', ub.uid), base(ub), { merge: true }), false);
await expect('A updates own profile app', () => setDoc(doc(A.db, 'users', ua.uid), { app: { goal: 'ielts' }, updatedAt: serverTimestamp() }, { merge: true }), true);
await expect('A adds unknown field', () => setDoc(doc(A.db, 'users', ua.uid), { isAdmin: true }, { merge: true }), false);
await expect('A saves own word', () => setDoc(doc(A.db, 'users', ua.uid, 'vocabulary', 'w1'), { word: 'substantial' }), true);
await expect('A saves invalid word', () => setDoc(doc(A.db, 'users', ua.uid, 'vocabulary', 'w2'), { word: '' }), false);
await expect('A reads B vocabulary', () => getDoc(doc(A.db, 'users', ub.uid, 'vocabulary', 'w1')), false);
await expect('A writes B vocabulary', () => setDoc(doc(A.db, 'users', ub.uid, 'vocabulary', 'x'), { word: 'hack' }), false);
await expect('A creates free subscription', () => setDoc(doc(A.db, 'subscriptions', ua.uid), { userId: ua.uid, email: ua.email, plan: 'free', createdAt: serverTimestamp() }), true);
await expect('A upgrades self to premium', () => updateDoc(doc(A.db, 'subscriptions', ua.uid), { plan: 'premium' }), false);
await expect('B creates premium subscription', () => setDoc(doc(B.db, 'subscriptions', ub.uid), { userId: ub.uid, email: ub.email, plan: 'premium' }), false);
await expect('A reads B subscription', () => getDoc(doc(A.db, 'subscriptions', ub.uid)), false);
const session = (u, id, extra = {}) => ({ id, testId: 'vb-practice-1', bookId: 'vb-practice', skill: 'reading', status: 'in-progress', startedAt: '2026-09-26T10:00:00Z', updatedAt: '2026-09-26T10:00:00Z', timeLimitSeconds: 2400, elapsedSeconds: 0, answers: {}, flagged: [], currentNumber: 1, ...extra });
const ts = (db, u, id) => doc(db, 'users', u.uid, 'testSessions', id);
await expect('A starts own test session', () => setDoc(ts(A.db, ua, 's1'), session(ua, 's1')), true);
await expect('A saves answers', () => setDoc(ts(A.db, ua, 's1'), session(ua, 's1', { answers: { 'r1-q1': 'ii' }, elapsedSeconds: 60 })), true);
await expect('A session with mismatched id', () => setDoc(ts(A.db, ua, 's2'), session(ua, 'other')), false);
await expect('A session with extra field', () => setDoc(ts(A.db, ua, 's3'), session(ua, 's3', { verified: true })), false);
await expect('A submits session', () => setDoc(ts(A.db, ua, 's1'), session(ua, 's1', { status: 'submitted', result: { correct: 1, total: 24 } })), true);
await expect('A edits submitted session', () => setDoc(ts(A.db, ua, 's1'), session(ua, 's1', { status: 'submitted', result: { correct: 24, total: 24 } })), false);
await expect('A reads B test session', () => getDoc(ts(A.db, ub, 's1')), false);
await expect('A writes B test session', () => setDoc(ts(A.db, ub, 'x'), session(ub, 'x')), false);
const w = (extra = {}) => session(ua, 'w1', { skill: 'writing', responses: { w1: 'Some text' }, ...extra });
await expect('A starts writing session', () => setDoc(ts(A.db, ua, 'w1'), w()), true);
await expect('A submits writing', () => setDoc(ts(A.db, ua, 'w1'), w({ status: 'submitted' })), true);
await expect('A adds feedback once', () => updateDoc(ts(A.db, ua, 'w1'), { feedback: { overall: 6 }, updatedAt: 'y' }), true);
await expect('A rewrites feedback', () => updateDoc(ts(A.db, ua, 'w1'), { feedback: { overall: 9 } }), false);
await expect('A edits submitted essay', () => updateDoc(ts(A.db, ua, 'w1'), { responses: { w1: 'better' } }), false);
await expect('A adds feedback to reading', () => updateDoc(ts(A.db, ua, 's1'), { feedback: { overall: 9 } }), false);
const mino = (db, u, id) => doc(db, 'users', u.uid, 'mino', id);
await expect('A saves Mino memory', () => setDoc(mino(A.db, ua, 'memory'), { notes: [{ id: 'n1', category: 'concern', text: 'Afraid of Speaking', at: 'x' }], updatedAt: 'x' }), true);
await expect('A memory over 15 notes', () => setDoc(mino(A.db, ua, 'memory'), { notes: Array.from({ length: 16 }, (_, i) => ({ id: `n${i}` })), updatedAt: 'x' }), false);
await expect('A saves conversation', () => setDoc(mino(A.db, ua, 'conversation'), { messages: [{ role: 'user', content: 'hi' }], updatedAt: 'x' }), true);
await expect('A other doc under mino', () => setDoc(mino(A.db, ua, 'secrets'), { x: 1 }), false);
await expect('A reads B Mino memory', () => getDoc(mino(A.db, ub, 'memory')), false);
await expect('A writes B Mino memory', () => setDoc(mino(A.db, ub, 'memory'), { notes: [], updatedAt: 'x' }), false);
await signOut(A.auth);
await expect('Signed-out reads A profile', () => getDoc(doc(A.db, 'users', ua.uid)), false);
console.table(results);
process.exit(results.some(r => r[1].startsWith('FAIL')) ? 1 : 0);
