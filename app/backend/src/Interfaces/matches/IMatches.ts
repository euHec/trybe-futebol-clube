export default interface IMathes {
  id: number,
  homeTeam?: {
    teamName: string;
  };
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeam?: {
    teamName: string;
  };
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}
