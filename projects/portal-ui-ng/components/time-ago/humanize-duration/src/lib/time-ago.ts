import { makeEnvironmentProviders } from '@angular/core';
import humanizeDuration from 'humanize-duration';
import { TIME_AGO_FUNCTION } from 'portal-ui-ng';

const SUPPORTED = humanizeDuration.getSupportedLanguages().map(s => s.toLowerCase());

export function timeAgo(date: Date, localeId: string) {
  let locale: string;
  if (SUPPORTED.includes(localeId)) {
    locale = localeId;
  } else {
    const countryCode = localeId.split('-').at(0)!;
    if (SUPPORTED.includes(countryCode)) {
      locale = countryCode;
    } else {
      locale = 'en';
    }
  }
  const diff = Date.now() - date.getTime();
  return humanizeDuration(diff, {
    language: locale,
    largest: 1,
    round: true,
    units: ['y', 'mo', 'w', 'd', 'h', 'm']
  })
}

export function provideHumanizeDurationTimeAgo() {
  return makeEnvironmentProviders([
    {
      provide: TIME_AGO_FUNCTION,
      useValue: timeAgo,
    }
  ])
}