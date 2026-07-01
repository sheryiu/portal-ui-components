import { format as fmt } from 'date-fns';
import { TIME_DISPLAY_FORMATTER } from './time-display.component';

export function provideDateFnsTimeDisplayFormatter() {
  return {
    provide: TIME_DISPLAY_FORMATTER,
    useValue: (date: Date, format: string) => {
      return fmt(date, format);
    }
  }
}