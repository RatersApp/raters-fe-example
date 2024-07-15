import type { ReactNode } from 'react';
import {
  ActorProvider,
  createActorContext,
  createUseActorHook,
} from 'ic-use-actor';
import { canisterId, idlFactory } from './declarations/backend/index';
import type { _SERVICE } from './declarations/backend/backend.did';
import { useInternetIdentity } from 'ic-use-internet-identity';

const actorContext = createActorContext<_SERVICE>();
export const useActor = createUseActorHook<_SERVICE>(actorContext);

export function Actors({ children }: { children: ReactNode }) {
  const { identity } = useInternetIdentity();

  return (
    <ActorProvider<_SERVICE>
      canisterId={canisterId}
      context={actorContext}
      identity={identity}
      idlFactory={idlFactory}
    >
      {children}
    </ActorProvider>
  );
}
