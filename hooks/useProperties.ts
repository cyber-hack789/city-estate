// ============================================
// useProperties Hook — Property data fetching
// ============================================
"use client";

import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "./useDebounce";
import { PropertySearchFilters } from "@/types/property.types";
import { API_VERSION } from "@/config/constants";

interface UsePropertiesOptions {
  initialFilters?: Partial<PropertySearchFilters>;
  autoFetch?: boolean;
}

export function useProperties(options: UsePropertiesOptions = {}) {
  const { initialFilters = {}, autoFetch = true } = options;

  const [properties, setProperties] = useState<unknown[]>([]);
  const [meta, setMeta] = useState({ page: 1, limit: 12, total: 0, totalPages: 0 });
  const [filters, setFilters] = useState<Partial<PropertySearchFilters>>(initialFilters);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(filters.query || "", 400);

  const fetchProperties = useCallback(async (searchFilters?: Partial<PropertySearchFilters>) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      const activeFilters = searchFilters || filters;

      Object.entries(activeFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          if (key === "query") {
            params.set(key, debouncedQuery);
          } else {
            params.set(key, String(value));
          }
        }
      });

      const res = await fetch(`/api/${API_VERSION}/properties?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setProperties(data.data);
        if (data.meta) setMeta(data.meta);
      } else {
        setError(data.error || "Failed to fetch properties");
      }
    } catch {
      setError("Network error");
    } finally {
      setIsLoading(false);
    }
  }, [filters, debouncedQuery]);

  // Auto-fetch on mount and filter changes
  useEffect(() => {
    if (autoFetch) {
      fetchProperties();
    }
  }, [autoFetch, fetchProperties]);

  const updateFilter = useCallback((key: string, value: unknown) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  }, []);

  const nextPage = useCallback(() => {
    if (meta.page < meta.totalPages) {
      setFilters((prev) => ({ ...prev, page: (prev.page || 1) + 1 }));
    }
  }, [meta]);

  const prevPage = useCallback(() => {
    if ((filters.page || 1) > 1) {
      setFilters((prev) => ({ ...prev, page: (prev.page || 2) - 1 }));
    }
  }, [filters.page]);

  return {
    properties,
    meta,
    filters,
    isLoading,
    error,
    fetchProperties,
    updateFilter,
    setFilters,
    nextPage,
    prevPage,
  };
}
