'use client';

import { useState } from 'react';
import { BookOpen, GraduationCap, MailCheck, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Callout } from '@/components/ds';
import { useAuth } from '@/components/providers/AuthProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { BrandMark } from '@/components/shell/BrandMark';
import { MinoMark } from '@/components/shell/MinoMark';
import { authErrorKey } from '@/lib/auth-errors';
import { cn } from '@/lib/utils';

const PILLAR_ICONS = [GraduationCap, BookOpen, Plane];

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

type Mode = 'signin' | 'signup' | 'reset';

export default function LoginView() {
  const { signIn, signUp, signInWithGoogle, resetPassword, continueAsGuest, canSignIn } = useAuth();
  const { t, list } = useLocale();
  const [mode, setMode] = useState<Mode>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetSentTo, setResetSentTo] = useState('');

  const run = async (action: () => Promise<unknown>) => {
    setLoading(true);
    setError('');
    try {
      await action();
    } catch (err) {
      setError(authErrorKey(err));
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    setError('');
    setResetSentTo('');
  };

  const emailField = (id: string) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{t('login.email')}</Label>
      <Input
        id={id}
        type="email"
        inputMode="email"
        autoComplete="email"
        autoCapitalize="none"
        className="h-11"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        required
      />
    </div>
  );

  const passwordField = (id: string, isNew: boolean) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{t('login.password')}</Label>
      <Input
        id={id}
        type="password"
        autoComplete={isNew ? 'new-password' : 'current-password'}
        placeholder={isNew ? t('login.passwordHint') : undefined}
        minLength={isNew ? 6 : undefined}
        className="h-11"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
        required
      />
    </div>
  );

  const errorBox = error && (
    <Callout tone="danger" className="py-3">
      <span role="alert">{t(error)}</span>
    </Callout>
  );

  const resetView = (
    <div className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">{t('auth.resetTitle')}</h2>
        <p className="text-muted-foreground">{t('auth.resetBody')}</p>
      </div>
      {resetSentTo ? (
        <Callout tone="success" icon={MailCheck}>
          <span role="status">{t('auth.resetSent', { email: resetSentTo })}</span>
        </Callout>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            run(async () => {
              await resetPassword(email);
              setResetSentTo(email.trim());
            });
          }}
        >
          {emailField('reset-email')}
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? t('auth.resetSending') : t('auth.resetCta')}
          </Button>
        </form>
      )}
      {errorBox}
      <Button variant="ghost" className="w-full" onClick={() => switchMode('signin')}>
        {t('auth.backToSignIn')}
      </Button>
    </div>
  );

  const mainView = (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">{t('login.welcome')}</h2>
        <p className="text-muted-foreground">{t('login.subtitle')}</p>
      </div>

      {canSignIn && (
        <>
          <Tabs value={mode} onValueChange={(v) => switchMode(v as Mode)}>
            <TabsList className="grid h-11 w-full grid-cols-2">
              <TabsTrigger value="signin">{t('login.signIn')}</TabsTrigger>
              <TabsTrigger value="signup">{t('login.createAccount')}</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form
                className="space-y-4 pt-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  run(() => signIn(email, password));
                }}
              >
                {emailField('signin-email')}
                {passwordField('signin-password', false)}
                <div className="-mt-1 text-right">
                  <button type="button" onClick={() => switchMode('reset')} className="text-sm font-medium text-brand hover:underline">
                    {t('auth.forgot')}
                  </button>
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading ? t('login.signingIn') : t('login.signIn')}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form
                className="space-y-4 pt-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  run(() => signUp(name, email, password));
                }}
              >
                <div className="space-y-2">
                  <Label htmlFor="signup-name">{t('auth.name')}</Label>
                  <Input
                    id="signup-name"
                    autoComplete="name"
                    placeholder={t('auth.namePlaceholder')}
                    className="h-11"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                  />
                </div>
                {emailField('signup-email')}
                {passwordField('signup-password', true)}
                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading ? t('login.creating') : t('login.createAccount')}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {errorBox}

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            {t('login.or')}
            <span className="h-px flex-1 bg-border" />
          </div>

          <Button onClick={() => run(signInWithGoogle)} variant="outline" size="lg" className="w-full" disabled={loading}>
            {t('login.google')}
          </Button>
        </>
      )}

      <Button onClick={continueAsGuest} variant="secondary" size="lg" className="w-full" disabled={loading}>
        {t('login.guest')}
      </Button>
      <p className="text-center text-xs text-muted-foreground">{t('login.guestNote')}</p>
    </div>
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
        <div className="w-full max-w-sm">{mode === 'reset' ? resetView : mainView}</div>
      </section>
    </div>
  );
}
