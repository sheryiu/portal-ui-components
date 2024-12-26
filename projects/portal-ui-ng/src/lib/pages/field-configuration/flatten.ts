import { get } from 'lodash-es';
import { FieldConfiguration, ObjectFieldConfiguration } from './field-configuration';

/** @internal */
export function flatten(fieldConfiguration: ObjectFieldConfiguration, data: any, keyPrefix: string, descriptionPrefix: string): Array<{ key: string; fieldConfiguration: FieldConfiguration; }> {
  const entries = Object.entries(fieldConfiguration.properties);
  return entries.flatMap(([key, value]) => {
    if (value.type == 'object') return flatten(value, data, `${!!keyPrefix ? `${keyPrefix}.` : ''}${key}`, `${descriptionPrefix}${value.description??''} / `);
    if (value.type == 'array') {
      const dataArray = get(data, `${!!keyPrefix ? `${keyPrefix}.` : ''}${key}`);
      return [{
        key: `${!!keyPrefix ? `${keyPrefix}.` : ''}${key}`,
        fieldConfiguration: {
          ...value,
          description: `${descriptionPrefix}${value.description??''}`,
        }
      }, ...(Array.isArray(dataArray)
        ? dataArray.flatMap((_, i) => value.items.type == 'object'
          ? [...flatten(value.items, data, `${!!keyPrefix ? `${keyPrefix}.` : ''}${key}[${i}]`, `${descriptionPrefix}${value.description??''} / #${i} / `)]
          : [{
            key: `${!!keyPrefix ? `${keyPrefix}.` : ''}${key}[${i}]`,
            fieldConfiguration: {
              ...value.items,
              description: `${descriptionPrefix}${value.description??''} / #${i}`,
            }
          }])
        : [])
      ]
    }
    return [
      {
        key: `${!!keyPrefix ? `${keyPrefix}.` : ''}${key}`,
        fieldConfiguration: {
          ...value,
          description: descriptionPrefix + value.description,
        }
      }
    ]
  })
}