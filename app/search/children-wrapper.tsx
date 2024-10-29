'use client';

import { useSearchParams } from 'next/navigation';
import { Fragment } from 'react';

// Ensure children are re-rendered when the search query changes
export default function ChildrenWrapper({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  //console.log(searchParams.get('q'))
  return <Fragment key={searchParams.get('q')}>{children}</Fragment>;
}
