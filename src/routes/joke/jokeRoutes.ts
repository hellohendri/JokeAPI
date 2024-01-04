import express from 'express';
import authorizationMiddleware from '../../middleware/authorizationMiddleware';
import { getRandomJoke, getJokeById, getJokesByType, addNewJokes, replaceJoke, patchJoke, deleteJoke, deleteAllJokes } from '../../controllers/joke/jokeController';

const router = express.Router();

router.use(authorizationMiddleware);

router.get('/random', getRandomJoke);
router.get('/filter', getJokesByType);
router.get('/:id', getJokeById);

router.post('/', addNewJokes);
router.put('/:id', replaceJoke);
router.patch('/:id', patchJoke);
router.delete('/all', deleteAllJokes);
router.delete('/:id', deleteJoke);

export default router;
