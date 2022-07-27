/* eslint-disable no-restricted-syntax */
import { Ticket } from '@prisma/client';
import { sortTickets } from 'utils/helper';

export const ticketsByEpic = (tickets: Ticket[]) => {
  const result = [...tickets].reduce((obj, currentValue) => {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    if (!obj['Other']) {
      // eslint-disable-next-line @typescript-eslint/dot-notation, no-param-reassign
      obj['Other'] = [];
    }

    if (currentValue.epic) {
      if (!obj[currentValue.epic]) {
        // eslint-disable-next-line no-param-reassign
        obj[currentValue.epic] = [];
      }

      // eslint-disable-next-line no-return-assign, no-param-reassign
      obj[currentValue.epic] = sortTickets([...obj[currentValue.epic], currentValue]);
    } else {
      // eslint-disable-next-line @typescript-eslint/dot-notation, no-param-reassign
      obj['Other'] = sortTickets([...obj['Other'], currentValue]);
    }

    // eslint-disable-next-line @typescript-eslint/dot-notation
    if (obj['Other'].length === 0) {
      // eslint-disable-next-line @typescript-eslint/dot-notation, no-param-reassign
      delete obj['Other'];
    }

    return obj;
  }, {});

  return result;
};
