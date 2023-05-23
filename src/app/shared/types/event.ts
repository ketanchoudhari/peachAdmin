export interface IEvent {

  tv: number;
  isFancy: number;
  usersLogged?: number;
  sportId: string;
  activeStatus: number;
  sportsName: string;
  competitionName: string;
  totalMatched: number;
  tvPid: number;
  tvMapid: number;
  time: string;
  bet: number;
  isInPlay: number;
  usersOnline: number;
  noOfBets: number;
  session: '';
  unmatched: number;
  id: number;
  eventTypeId: string;
  competitionId: number;
  eventId: number;
  eventName: string;
  status: number;
  markets: {
    marketName: string;
    gameId: number;
    sportsName: string;
    marketId: string;
    runners: string[];
  }[];
}
