export const APP_NAME = 'ticket-distribution';

export const requestHeaders = { 'Content-Type': 'application/json' };

export const SHORT_DATE_FORMAT = 'll';

export const TICKET_PRIORITY = {
  LOWEST: 1,
  LOW: 2,
  MEDIUM: 3,
  HIGH: 4,
  HIGHEST: 5,
};

export const TICKET_STATUS = {
  TODO: 'todo',
  BLOCKED: 'blocked',
  IN_PROGRESS: 'in_progress',
  IN_REVIEW: 'in_review',
  READY_FOR_QA: 'ready_for_qa',
  IN_TEST: 'in_test',
  STAGING: 'staging',
  DONE: 'done',
};

export const DEFAULT_SPRINT_FORMULA = {
  TODO: 0,
  BLOCKED: 0,
  IN_PROGRESS: 30,
  IN_REVIEW: 50,
  READY_FOR_QA: 60,
  IN_TEST: 70,
  STAGING: 95,
  DONE: 100,
};
