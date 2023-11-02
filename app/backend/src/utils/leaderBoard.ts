export type Results = {
  awayTeamGoals: number,
  homeTeamGoals: number,
};

export default class LeaderBoardUtils {
  private name;
  private totalPoints;
  private totalGames;
  private totalVictories;
  private totalDraws;
  private totalLosses;
  private goalsFavor;
  private goalsOwn;
  private goalsBalance;
  private efficiency;
  private results;

  constructor(_name: string, _results: Results[]) {
    this.name = _name;
    this.results = _results;
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.efficiency = 0;
    this.goalsBalance = 0;
  }

  public getLeaderboard() {
    return {
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsBalance,
      efficiency: this.efficiency,
    };
  }

  private checkWinner(home: number, away: number): void {
    if (home > away) {
      this.totalPoints += 3;
      this.totalVictories += 1;
    }
    if (home === away) this.totalPoints += 1;
  }

  private getEfficiency() {
    const result = (this.totalPoints / (this.totalGames * 3)) * 100;
    const e = Number(result.toFixed(2));
    this.efficiency = e;
  }

  private goalBalance(): void { this.goalsBalance = (this.goalsFavor - this.goalsOwn); }

  public leaderBoards() {
    this.results.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      this.totalGames += 1;
      this.goalsFavor += homeTeamGoals;
      this.goalsOwn += awayTeamGoals;

      this.checkWinner(homeTeamGoals, awayTeamGoals);
    });

    this.getEfficiency();
    this.goalBalance();
    return this.getLeaderboard();
  }
}
