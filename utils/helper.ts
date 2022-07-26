import moment from 'moment';
import { SHORT_DATE_FORMAT } from 'utils/constants';

export const shortDateFormat = (date: Date | string): string =>
  moment(date).isValid() ? moment(date).format(SHORT_DATE_FORMAT) : '';
