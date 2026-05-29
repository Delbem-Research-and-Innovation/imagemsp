'use client';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';
import React from 'react';

/**
 * Emotion cache registry for Next.js App Router.
 *
 * Intercepts Emotion style insertions and flushes them into the
 * `<head>` via `useServerInsertedHTML` instead of letting Emotion
 * inject `<style>` tags inline inside the React component tree.
 * Inline injection causes hydration mismatches with Turbopack's
 * streaming SSR because React expects a component element at the
 * position where Emotion's `<Insertion>` writes a `<style>` node.
 *
 * @see https://nextjs.org/docs/app/guides/css-in-js#emotion
 */
export const EmotionRegistry = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [{ cache, flush }] = React.useState(() => {
    const c = createCache({ key: 'css' });
    c.compat = true;
    const prevInsert = c.insert;
    let inserted: string[] = [];
    c.insert = (...args) => {
      const serialized = args[1];
      if (c.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache: c, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
};
