import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';

/**
 * Supabase‑backed storage hook.
 * Mirrors the original `useLocalStorageState` API while persisting data
 * to a Supabase table. The generic type `T` must include an `id: string`
 * field which Supabase uses as the primary key.
 */
export function useLocalStorageState<T extends { id: string }>(
  table: string,
  initialValue: T[] = []
) {
  const [data, setData] = useState<T[]>(initialValue);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ---------------------------------------------------------------------------
  // Load data on mount (or when the table name changes)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: rows, error } = await supabase.from<T>(table).select('*');
      if (error) {
        console.error('[Supabase] fetch error:', error);
        setError(error.message);
        setData(initialValue);
      } else {
        setData(rows ?? []);
        setError(null);
      }
      setLoading(false);
    };
    fetchData();
    // eslint‑disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  // ---------------------------------------------------------------------------
  // CRUD helpers – all return a Promise so callers can await if needed
  // ---------------------------------------------------------------------------
  const save = useCallback(async (newData: T[]) => {
    setData(newData);
    const { error } = await supabase.from<T>(table).upsert(newData, { onConflict: 'id' });
    if (error) {
      console.error('[Supabase] save error:', error);
      setError(error.message);
    } else {
      setError(null);
    }
  }, [table]);

  const addItem = useCallback(async (item: T) => {
    const newData = [item, ...data];
    setData(newData);
    const { error } = await supabase.from<T>(table).insert(item);
    if (error) {
      console.error('[Supabase] add error:', error);
      setError(error.message);
    } else {
      setError(null);
    }
  }, [data, table]);

  const updateItem = useCallback(async (id: string, patch: Partial<T>) => {
    const updated = data.map((it) => (it.id === id ? { ...it, ...patch } : it));
    setData(updated);
    const { error } = await supabase.from<T>(table).update(patch as any).eq('id', id);
    if (error) {
      console.error('[Supabase] update error:', error);
      setError(error.message);
    } else {
      setError(null);
    }
  }, [data, table]);

  const deleteItem = useCallback(async (id: string) => {
    const filtered = data.filter((it) => it.id !== id);
    setData(filtered);
    const { error } = await supabase.from<T>(table).delete().eq('id', id);
    if (error) {
      console.error('[Supabase] delete error:', error);
      setError(error.message);
    } else {
      setError(null);
    }
  }, [data, table]);

  // Alias kept for backward compatibility – many components still destructure
  // `removeItem`.
  const removeItem = deleteItem;

  return { data, loading, error, addItem, updateItem, deleteItem, removeItem, save };
}
