import { ShieldCheck } from 'lucide-react';
import { Callout } from '@/components/ds';

export function TrustNote() {
  return (
    <Callout icon={ShieldCheck} title="How we handle study-abroad information">
      Every tuition, visa or deadline figure will show its official source and the date it was last verified. When
      something can&apos;t be verified, we&apos;ll say so and link you to the official source.
    </Callout>
  );
}
