/* eslint-disable no-restricted-syntax */
import { Sprint, Ticket } from '@prisma/client';
import { TICKET_STATUS } from 'utils/constants';
import { getKeyByValue, sortTickets } from 'utils/helper';

export const ticketsByEpic = (tickets: Ticket[]) => {
  const result = [...tickets].reduce((obj, currentValue) => {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    if (!obj['Others']) {
      // eslint-disable-next-line @typescript-eslint/dot-notation, no-param-reassign
      obj['Others'] = [];
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
      obj['Others'] = sortTickets([...obj['Others'], currentValue]);
    }

    // eslint-disable-next-line @typescript-eslint/dot-notation
    if (obj['Others'].length === 0) {
      // eslint-disable-next-line @typescript-eslint/dot-notation, no-param-reassign
      delete obj['Others'];
    }

    return obj;
  }, {});

  return result;
};

export const groupTicketByStatus = (tickets: Ticket[]) => {
  const result = [...tickets].reduce((obj, currentValue) => {
    if (!obj[currentValue.status]) {
      // eslint-disable-next-line no-param-reassign
      obj[currentValue.status] = [];
    }

    // eslint-disable-next-line no-return-assign, no-param-reassign
    obj[currentValue.status] = [...obj[currentValue.status], currentValue];

    return obj;
  }, {});

  return result;
};

export const calculateSprintProgress = (sprint: Sprint, tickets: Ticket[]) => {
  const { formula } = sprint;

  const totalPoints = tickets.reduce((total, current) => total + current.storyPoint, 0);

  const completedPoints = tickets.reduce((completed, current) => {
    const status = getKeyByValue(TICKET_STATUS, current.status);
    const rate = (formula[status] === undefined ? 100 : formula[status]) / 100;
    const point = rate * current.storyPoint;
    return completed + point;
  }, 0);

  return {
    completedPoints: completedPoints.toFixed(3),
    totalPoints,
    percentCompleted: Math.round((completedPoints / totalPoints) * 100),
  };
};
