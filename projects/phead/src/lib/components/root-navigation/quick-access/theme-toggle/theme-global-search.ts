import { inject } from '@angular/core';
import Fuse from 'fuse.js';
import { Observable, map } from 'rxjs';
import { ThemeService, formatFuseText } from '../../../../base';
import { GlobalSearchSuggestion } from '../../../global-search';

export const themeGlobalSearch = (searchTerm: Observable<string>): Observable<GlobalSearchSuggestion[]> => {
  const service = inject(ThemeService);
  const suggestion: GlobalSearchSuggestion[] = [{
    title: 'Light Mode',
    description: 'Set theme to light mode',
    icon: 'light_mode',
    category: 'Actions',
    score: 1,
    onClick: () => service.setTheme('light'),
  }, {
    title: 'Dark Mode',
    description: 'Set theme to dark mode',
    icon: 'dark_mode',
    category: 'Actions',
    score: 1,
    onClick: () => service.setTheme('dark'),
  }, {
    title: 'System Theme',
    description: 'Set theme to follow device settings',
    icon: 'phone_iphone',
    category: 'Actions',
    score: 1,
    onClick: () => service.setTheme('system'),
  }]
  const fuse = new Fuse(suggestion, { includeMatches: true, includeScore: true, keys: ['title', 'description'] });
  return searchTerm.pipe(
    map(term => fuse.search(term)),
    map(result => result.map(({ item, score, matches }) => ({
      ...item,
      title: matches?.some(m => m.key === 'title') ? formatFuseText(item.title, matches.find(m => m.key === 'title')?.indices!) : item.title,
      description: (matches?.some(m => m.key === 'description') && item.description) ? formatFuseText(item.description, matches.find(m => m.key === 'description')?.indices!) : item.description,
      score: score ?? 1,
    })))
  )
}