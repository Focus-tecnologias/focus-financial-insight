import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';

/**
 * Supabase-backed storage hook using a unified Single-Table JSONB architecture (`focus_app_state`).
 * Persists all dynamic entity data (99+ tables/keys) seamlessly without requiring 99 separate DB tables.
 *
 * Each row in `focus_app_state` has:
 * - table_name (text)
 * - id (text)
 * - data (jsonb)
 * - updated_at (timestamptz)
 */
export function useLocalStorageState<T extends { id: string }>(
  table: string,
  initialValue: T[] = []
) {
  const [data, setData] = useState<T[]>(initialValue);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ---------------------------------------------------------------------------
  // Load data on mount (or when table name changes)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: rows, error } = await supabase
          .from('focus_app_state')
          .select('data')
          .eq('table_name', table);

        if (!isMounted) return;

        if (error) {
          console.warn(`[Supabase] Could not fetch table '${table}' from focus_app_state:`, error.message);
          setError(error.message);
          setData(initialValue);
        } else if (rows && rows.length > 0) {
          const items = rows.map((r: any) => r.data as T);
          setData(items);
          setError(null);
        } else {
          setData(initialValue);
          setError(null);
        }
      } catch (err: any) {
        if (!isMounted) return;
        console.warn(`[Supabase] Exception fetching table '${table}':`, err);
        setError(err?.message || 'Unknown fetch error');
        setData(initialValue);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  // ---------------------------------------------------------------------------
  // CRUD helpers
  // ---------------------------------------------------------------------------
  const save = useCallback(
    async (newData: T[]) => {
      setData(newData);
      try {
        if (newData.length === 0) {
          // If clearing, delete all rows for this entity table_name
          const { error } = await supabase
            .from('focus_app_state')
            .delete()
            .eq('table_name', table);
          if (error) setError(error.message);
          return;
        }

        const payload = newData.map((item) => ({
          table_name: table,
          id: String(item.id),
          data: item,
          updated_at: new Date().toISOString(),
        }));

        const { error } = await supabase
          .from('focus_app_state')
          .upsert(payload, { onConflict: 'table_name,id' });

        if (error) {
          console.error(`[Supabase] Save error for '${table}':`, error);
          setError(error.message);
        } else {
          setError(null);
        }
      } catch (err: any) {
        console.error(`[Supabase] Save exception for '${table}':`, err);
        setError(err?.message || 'Save failed');
      }
    },
    [table]
  );

  const addItem = useCallback(
    async (item: T) => {
      const newData = [item, ...data];
      setData(newData);
      try {
        const { error } = await supabase.from('focus_app_state').upsert(
          {
            table_name: table,
            id: String(item.id),
            data: item,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'table_name,id' }
        );

        if (error) {
          console.error(`[Supabase] Add item error for '${table}':`, error);
          setError(error.message);
        } else {
          setError(null);
        }
      } catch (err: any) {
        console.error(`[Supabase] Add item exception for '${table}':`, err);
        setError(err?.message || 'Add item failed');
      }
    },
    [data, table]
  );

  const updateItem = useCallback(
    async (id: string, patch: Partial<T>) => {
      let updatedItem: T | null = null;
      const updatedData = data.map((it) => {
        if (it.id === id) {
          updatedItem = { ...it, ...patch };
          return updatedItem;
        }
        return it;
      });

      setData(updatedData);

      if (updatedItem) {
        try {
          const { error } = await supabase.from('focus_app_state').upsert(
            {
              table_name: table,
              id: String(id),
              data: updatedItem,
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'table_name,id' }
          );

          if (error) {
            console.error(`[Supabase] Update item error for '${table}':`, error);
            setError(error.message);
          } else {
            setError(null);
          }
        } catch (err: any) {
          console.error(`[Supabase] Update item exception for '${table}':`, err);
          setError(err?.message || 'Update item failed');
        }
      }
    },
    [data, table]
  );

  const deleteItem = useCallback(
    async (id: string) => {
      const filtered = data.filter((it) => it.id !== id);
      setData(filtered);
      try {
        const { error } = await supabase
          .from('focus_app_state')
          .delete()
          .eq('table_name', table)
          .eq('id', String(id));

        if (error) {
          console.error(`[Supabase] Delete item error for '${table}':`, error);
          setError(error.message);
        } else {
          setError(null);
        }
      } catch (err: any) {
        console.error(`[Supabase] Delete item exception for '${table}':`, err);
        setError(err?.message || 'Delete item failed');
      }
    },
    [data, table]
  );

  const removeItem = deleteItem;
  const setAllItems = save;

  return {
    data,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    removeItem,
    save,
    setAllItems,
  };
}
