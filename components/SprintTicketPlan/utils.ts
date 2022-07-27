/* eslint-disable no-restricted-syntax */
import { Sprint, Ticket } from '@prisma/client';
import moment from 'moment';
import { DATE_KEY } from 'utils/constants';
import { sortTickets } from 'utils/helper';

const isWeekDay = (date: moment.Moment): boolean => [0, 6].indexOf(date.weekday()) < 0;

const enumerateWeekDaysBetweenDates = (startDate, endDate) => {
  const dates = [];

  const currDate = moment(startDate).startOf('day');
  const lastDate = moment(endDate).startOf('day');

  if (isWeekDay(currDate)) {
    dates.push(currDate.clone());
  }

  while (currDate.add(1, 'days').diff(lastDate) < 0) {
    const date = currDate.clone();
    if (isWeekDay(date)) {
      dates.push(date);
    }
  }

  return dates;
};

export const ticketsByDay = (sprint: Sprint, tickets: Ticket[]) => {
  const dates = enumerateWeekDaysBetweenDates(sprint.startAt, sprint.endAt);
  const sortedTickets = sortTickets(tickets);

  const result = {};

  let currentTicket: Ticket | null = null;
  for (const date of dates) {
    const key = date.format(DATE_KEY);

    result[key] = [];

    let availablePoint = 2;
    while (availablePoint > 0) {
      if (!currentTicket && sortedTickets.length) {
        currentTicket = { ...sortedTickets.shift() };
      }

      if (!currentTicket) {
        break;
      }

      if (availablePoint >= currentTicket.storyPoint) {
        availablePoint -= currentTicket.storyPoint;
        result[key].push({ ...currentTicket });
        currentTicket = null;
      } else {
        result[key].push({ ...currentTicket, storyPoint: availablePoint });
        currentTicket.storyPoint -= availablePoint;
        availablePoint = 0;
      }
    }
  }

  return result;
};

export const slackUpMessage = (dailyTickets: any) => {
  const today = moment().format(DATE_KEY);
  const yesterday = moment().add(-1, 'days').format(DATE_KEY);

  const todayTickets = dailyTickets[today] || ['...'];
  const yesterdayTickets = dailyTickets[yesterday] || ['...'];

  return [
    ...['Yesterday:'].concat(yesterdayTickets.map((t) => `- ${t.name}`)),
    ...['Today:'].concat(todayTickets.map((t) => `- ${t.name}`)),
  ].join('\n');
};
