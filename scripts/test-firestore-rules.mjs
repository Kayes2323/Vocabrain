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
await signOut(A.auth);
await expect('Signed-out reads A profile', () => getDoc(doc(A.db, 'users', ua.uid)), false);
console.table(results);
process.exit(results.some(r => r[1].startsWith('FAIL')) ? 1 : 0);
