import moment from 'moment';
import { SHORT_DATE_FORMAT } from 'utils/constants';

export const shortDateFormat = (date: Date | string): string =>
  moment(date).isValid() ? moment(date).format(SHORT_DATE_FORMAT) : '';

export const objectToOptions = (
  object: { [s: string]: unknown } | ArrayLike<unknown>
): {
  label: string;
  value: any;
}[] => Object.entries(object).map(([label, value]) => ({ label, value }));

export const getKeyByValue = (object, value) =>
  Object.keys(object).find((key) => object[key] === value);

export const stringToColor = (str: string): string => {
  let hash = 0;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < str.length; i++) {
    // eslint-disable-next-line no-bitwise
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 3; i++) {
    // eslint-disable-next-line no-bitwise
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  return color;
};
