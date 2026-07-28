import { useMemo } from 'react';
import { Product, FilterCategory } from '../types';

export const useProductFilter = (
  products: Product[],
  category: FilterCategory,
  searchQuery: string
) => {
  return useMemo(() => {
    let filtered = products;

    // Apply category filter
    if (category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [products, category, searchQuery]);
};
