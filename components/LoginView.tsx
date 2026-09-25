'use client';

import { useState } from 'react';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { BookOpen, GraduationCap, Plane } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { APP_NAME, MINO } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Callout } from '@/components/ds';
import { BrandMark } from '@/components/shell/BrandMark';
import { MinoMark } from '@/components/shell/MinoMark';

const PILLARS = [
  { icon: GraduationCap, text: 'A personal IELTS plan that adapts as you improve' },
  { icon: BookOpen, text: 'Vocabulary you actually remember and use' },
  { icon: Plane, text: 'Study-abroad planning from country to departure' },
];

function friendlyError(err: unknown, fallback: string): string {
  const code = (err as { code?: string })?.code ?? '';
  if (code.includes('invalid-credential') || code.includes('wrong-password')) return 'Email or password is incorrect.';
  if (code.includes('user-not-found')) return 'No account found for this email.';
  if (code.includes('email-already-in-use')) return 'An account with this email already exists. Try signing in.';
  if (code.includes('weak-password')) return 'Use a password with at least 6 characters.';
  if (code.includes('popup-closed')) return 'Google sign-in was closed before finishing.';
  return (err as Error)?.message || fallback;
}

export default function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const run = async (action: () => Promise<unknown>, fallback: string) => {
    try {
      setLoading(true);
      setError('');
      await action();
    } catch (err) {
      setError(friendlyError(err, fallback));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => run(() => signInWithPopup(auth, new GoogleAuthProvider()), 'Failed to sign in');

  const handleEmail = (mode: 'signin' | 'signup') => (e: React.FormEvent) => {
    e.preventDefault();
    run(
      () =>
        mode === 'signin'
          ? signInWithEmailAndPassword(auth, email, password)
          : createUserWithEmailAndPassword(auth, email, password),
      mode === 'signin' ? 'Failed to sign in' : 'Failed to create account',
    );
  };

  const fields = (mode: 'signin' | 'signup') => (
    <form onSubmit={handleEmail(mode)} className="space-y-4 pt-2">
      <div className="space-y-2">
        <Label htmlFor={`${mode}-email`}>Email</Label>
        <Input
          id={`${mode}-email`}
          type="email"
          autoComplete="email"
          className="h-11"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${mode}-password`}>Password</Label>
        <Input
          id={`${mode}-password`}
          type="password"
          autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
          placeholder={mode === 'signup' ? 'At least 6 characters' : undefined}
          className="h-11"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {mode === 'signin' ? (loading ? 'Signing in…' : 'Sign in') : loading ? 'Creating account…' : 'Create account'}
      </Button>
    </form>
  );

  return (
    <div className="flex min-h-dvh flex-col bg-background md:flex-row">
      <section className="flex flex-col justify-between gap-10 bg-primary px-6 py-8 text-primary-foreground md:w-1/2 md:px-12 md:py-12">
        <BrandMark className="[&>span:first-child]:bg-primary-foreground [&>span:first-child]:text-primary" />
        <div className="max-w-md space-y-6">
          <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Your journey from IELTS to studying abroad, one clear step at a time.
          </h1>
          <ul className="space-y-3">
            {PILLARS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-primary-foreground/80">
                <Icon className="mt-0.5 size-5 shrink-0" aria-hidden />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
          <MinoMark size="sm" />
          <span>
            Guided by {MINO.name}, {MINO.role.toLowerCase()}.
          </span>
        </div>
      </section>

      <section className="flex flex-1 items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Welcome to {APP_NAME}</h2>
            <p className="text-muted-foreground">Sign in or create a free account.</p>
          </div>

          <Tabs defaultValue="signin">
            <TabsList className="grid h-11 w-full grid-cols-2">
              <TabsTrigger value="signin">Sign in</TabsTrigger>
              <TabsTrigger value="signup">Create account</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">{fields('signin')}</TabsContent>
            <TabsContent value="signup">{fields('signup')}</TabsContent>
          </Tabs>

          {error && (
            <Callout tone="danger" className="py-3">
              <span role="alert">{error}</span>
            </Callout>
          )}

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            or
            <span className="h-px flex-1 bg-border" />
          </div>

          <Button onClick={handleGoogleSignIn} variant="outline" size="lg" className="w-full" disabled={loading}>
            Continue with Google
          </Button>
        </div>
      </section>
    </div>
  );
}
