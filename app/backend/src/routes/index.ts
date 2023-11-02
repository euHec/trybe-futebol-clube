import { Router } from 'express';
import teamsRouter from './teams.raute';
import userRouter from './login.raute';
import matchesRouter from './matches.raute';
import leaderboardRouter from './leaderboard.raute';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', userRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
