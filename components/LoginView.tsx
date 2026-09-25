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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Callout } from '@/components/ds';
import { useAuth } from '@/components/providers/AuthProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { BrandMark } from '@/components/shell/BrandMark';
import { MinoMark } from '@/components/shell/MinoMark';
import { cn } from '@/lib/utils';

const PILLAR_ICONS = [GraduationCap, BookOpen, Plane];

function errorKey(err: unknown): string {
  const code = (err as { code?: string })?.code ?? '';
  if (code.includes('invalid-credential') || code.includes('wrong-password')) return 'login.errors.credentials';
  if (code.includes('user-not-found')) return 'login.errors.noUser';
  if (code.includes('email-already-in-use')) return 'login.errors.exists';
  if (code.includes('weak-password')) return 'login.errors.weak';
  if (code.includes('popup-closed')) return 'login.errors.popup';
  return 'login.errors.generic';
}

function LanguageToggle() {
  const { locale, setLocale } = useLocale();
  return (
    <div role="group" aria-label="Language" className="inline-flex rounded-full bg-primary-foreground/10 p-0.5 text-sm">
      {(['bn', 'en'] as const).map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={locale === l}
          onClick={() => setLocale(l)}
          className={cn(
            'rounded-full px-3 py-1 font-medium transition-colors',
            locale === l ? 'bg-primary-foreground text-primary' : 'text-primary-foreground/80 hover:text-primary-foreground',
          )}
        >
          {l === 'bn' ? 'বাংলা' : 'English'}
        </button>
      ))}
    </div>
  );
}

export default function LoginView() {
  const { continueAsGuest } = useAuth();
  const { t, list } = useLocale();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const run = async (action: () => Promise<unknown>) => {
    try {
      setLoading(true);
      setError('');
      await action();
    } catch (err) {
      setError(errorKey(err));
    } finally {
      setLoading(false);
    }
  };

  const handleEmail = (mode: 'signin' | 'signup') => (e: React.FormEvent) => {
    e.preventDefault();
    run(() =>
      mode === 'signin' ? signInWithEmailAndPassword(auth, email, password) : createUserWithEmailAndPassword(auth, email, password),
    );
  };

  const fields = (mode: 'signin' | 'signup') => (
    <form onSubmit={handleEmail(mode)} className="space-y-4 pt-2">
      <div className="space-y-2">
        <Label htmlFor={`${mode}-email`}>{t('login.email')}</Label>
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
        <Label htmlFor={`${mode}-password`}>{t('login.password')}</Label>
        <Input
          id={`${mode}-password`}
          type="password"
          autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
          placeholder={mode === 'signup' ? t('login.passwordHint') : undefined}
          className="h-11"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {mode === 'signin'
          ? loading
            ? t('login.signingIn')
            : t('login.signIn')
          : loading
            ? t('login.creating')
            : t('login.createAccount')}
      </Button>
    </form>
  );

  return (
    <div className="flex min-h-dvh flex-col bg-background md:flex-row">
      <section className="flex flex-col justify-between gap-5 bg-primary px-6 py-6 text-primary-foreground md:w-1/2 md:gap-10 md:px-12 md:py-12">
        <div className="flex items-center justify-between gap-3">
          <BrandMark className="[&>span:first-child]:bg-primary-foreground [&>span:first-child]:text-primary" />
          <LanguageToggle />
        </div>
        <div className="max-w-md space-y-6">
          <h1 className="text-2xl font-semibold tracking-tight text-balance md:text-4xl">{t('login.hero')}</h1>
          <ul className="hidden space-y-3 md:block">
            {list('login.pillars').map((text, i) => {
              const Icon = PILLAR_ICONS[i];
              return (
                <li key={text} className="flex items-start gap-3 text-primary-foreground/80">
                  <Icon className="mt-0.5 size-5 shrink-0" aria-hidden />
                  <span>{text}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="hidden items-center gap-3 text-sm text-primary-foreground/70 md:flex">
          <MinoMark size="sm" />
          <span>{t('login.guided')}</span>
        </div>
      </section>

      <section className="flex flex-1 items-center justify-center px-6 py-8 md:py-10">
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">{t('login.welcome')}</h2>
            <p className="text-muted-foreground">{t('login.subtitle')}</p>
          </div>

          <Tabs defaultValue="signin">
            <TabsList className="grid h-11 w-full grid-cols-2">
              <TabsTrigger value="signin">{t('login.signIn')}</TabsTrigger>
              <TabsTrigger value="signup">{t('login.createAccount')}</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">{fields('signin')}</TabsContent>
            <TabsContent value="signup">{fields('signup')}</TabsContent>
          </Tabs>

          {error && (
            <Callout tone="danger" className="py-3">
              <span role="alert">{t(error)}</span>
            </Callout>
          )}

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            {t('login.or')}
            <span className="h-px flex-1 bg-border" />
          </div>

          <Button
            onClick={() => run(() => signInWithPopup(auth, new GoogleAuthProvider()))}
            variant="outline"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {t('login.google')}
          </Button>

          <Button onClick={continueAsGuest} variant="secondary" size="lg" className="w-full" disabled={loading}>
            {t('login.guest')}
          </Button>
          <p className="text-center text-xs text-muted-foreground">{t('login.guestNote')}</p>
        </div>
      </section>
    </div>
  );
}
