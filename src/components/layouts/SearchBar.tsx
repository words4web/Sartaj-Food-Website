"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, Clock, Trash2 } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { useTranslations } from "next-intl";
import { STORAGE_KEYS } from "@/constants/storage.constants";
import { cn } from "@/utils/common/common.utils";

interface SearchBarProps {
  className?: string;
  isMobile?: boolean;
}

export function SearchBar({ className, isMobile = false }: SearchBarProps) {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setSearchValue(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Error reading recent searches from localStorage", err);
    }
  }, []);

  const saveSearchQuery = (query: string) => {
    if (!query) return;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES);
      let list: string[] = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(list)) list = [];
      list = [query, ...list.filter((item) => item !== query)];
      list = list.slice(0, 5);
      localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(list));
      setRecentSearches(list);
    } catch (err) {
      console.error("Error saving search query to localStorage", err);
    }
  };

  const handleSearchSubmit = (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const query = (customQuery !== undefined ? customQuery : searchValue)?.trim();
    const params = new URLSearchParams(searchParams?.toString());
    params.set("page", "1");
    if (query) {
      params.set("search", query);
      saveSearchQuery(query);
    } else {
      params.delete("search");
    }
    router.push(ROUTES.PRODUCTS_WITH_QUERY(params?.toString()));
    setIsFocused(false);
    if (typeof document !== "undefined" && document.activeElement instanceof HTMLInputElement) {
      document.activeElement.blur();
    }
  };

  const handleClearSearch = () => {
    setSearchValue("");
    const params = new URLSearchParams(searchParams?.toString());
    params.delete("search");
    params.set("page", "1");
    router.push(ROUTES.PRODUCTS_WITH_QUERY(params?.toString()));
  };

  const clearRecentSearches = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      localStorage.removeItem(STORAGE_KEYS.RECENT_SEARCHES);
      setRecentSearches([]);
    } catch (err) {
      console.error("Error clearing recent searches from localStorage", err);
    }
  };

  const handleRecentSearchClick = (query: string) => {
    setSearchValue(query);
    handleSearchSubmit(undefined, query);
    setIsFocused(false);
  };

  return (
    <div className={cn("relative w-full", className)}>
      <form onSubmit={handleSearchSubmit} className="w-full">
        <div className="w-full relative">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => {
              const val = e.target.value;
              setSearchValue(val);
              if (val?.trim() === "") {
                handleClearSearch();
              }
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder={`${t("common.search")}...`}
            className="w-full pl-4 pr-20 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {searchValue && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-10 top-2.5 cursor-pointer text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded-full hover:bg-secondary z-10"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button type="submit" className="absolute right-3 top-2.5 cursor-pointer z-10">
            <Search className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
          </button>
        </div>
      </form>

      {/* Recent Searches Dropdown */}
      {isFocused && recentSearches.length > 0 && (
        <div className="absolute left-0 right-0 mt-1.5 bg-popover border border-border rounded-lg shadow-xl z-[999] overflow-hidden divide-y divide-border animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="px-3 py-2 text-xs font-semibold text-muted-foreground flex justify-between items-center bg-muted/40">
            <span>{t("common.recentSearches")}</span>
            <button
              type="button"
              onMouseDown={clearRecentSearches}
              className="flex items-center gap-1 text-red-500 hover:text-red-600 transition-colors font-medium cursor-pointer"
            >
              <Trash2 className="h-3 w-3" />
              <span>{t("common.clearAll")}</span>
            </button>
          </div>
          <div className="py-1">
            {recentSearches.map((query) => (
              <button
                key={query}
                type="button"
                onMouseDown={() => handleRecentSearchClick(query)}
                className="w-full px-3 py-2 text-sm text-left hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="truncate">{query}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
