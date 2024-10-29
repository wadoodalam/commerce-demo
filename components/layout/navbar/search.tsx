'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Form from 'next/form';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export default function Search() {
  const searchParams = useSearchParams();


  const showSearchTop = useMemo(() => {
    return searchParams.toString() === '';
  }, [searchParams]); 

  return (
    <>
      {showSearchTop && (
        <Form action="/search" className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
          <input
            key={searchParams?.get('q')}
            type="text"
            name="q"
            placeholder="Search for products...(TEST)"
            autoComplete="off"
            defaultValue={searchParams?.get('q') || ''}
            className="px-6 text-md w-full border-4 rounded-lg bg-white px-4 py-2 text-black placeholder:text-neutral-500 md:text-sm dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400 bg-clip-border
            shadow-[0_0_3px_3px_rgba(67,56,202,0.5)]"
          />
          <div className="absolute left-2 top-0 mr-3 flex h-full items-center">
            <MagnifyingGlassIcon className="h-4" />
          </div>
        </Form>
      )}
    </>
  );
}

export function SearchSkeleton() {
  return (
    <form className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        placeholder="Search for products..."
        className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}
