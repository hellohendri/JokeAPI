import { Request, Response } from 'express';
import Joke from '../../models/joke/jokeModel';
import * as fs from 'fs';

const jokes: Joke[] = JSON.parse(fs.readFileSync('./jokes.json', 'utf-8'));

export const getRandomJoke = (req: Request, res: Response) => {
    const randomNumber = Math.floor(Math.random() * jokes.length);
    res.json(jokes[randomNumber]);
};

export const getJokeById = (req: Request, res: Response) => {
    const { id } = req.params;
    const numericId = Number(id);

    if (isNaN(numericId)) {
        res.status(400).json({ error: 'Invalid ID format' });
        return;
    }

    const joke = jokes.find(joke => joke.id === numericId);

    if (joke) {
        res.json(joke);
    } else {
        res.status(404).json({ error: 'Joke not found' });
    }
};

export const getJokesByType = (req: Request, res: Response) => {
    const jokeType = req.query['type'] as string;
    const joke = jokes.filter(joke => joke.jokeType === jokeType);

    if (joke) {
        res.json(joke);
    } else {
        res.status(404).json({ error: 'Joke not found' });
    }
};

export const addNewJokes = (req: Request, res: Response) => {
    const { body } = req;

    const newJoke = new Joke(jokes.length + 1, body['text'], body['type']);
    jokes.push(newJoke);

    try {
        fs.writeFileSync('./jokes.json', JSON.stringify(jokes, null, 2), 'utf-8');
        res.status(201).json({ success: true, message: 'Joke added successfully', joke: jokes.slice(-1) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to add joke' });
    }
}

export const replaceJoke = (req: Request, res: Response) => {
    const { params } = req;
    const { body } = req;

    const targetId = Number(params.id);

    if (isNaN(targetId)) {
        res.status(400).json({ error: 'Invalid ID format' });
        return;
    }

    const existingJokeIndex = jokes.findIndex(joke => joke.id === targetId);

    if (existingJokeIndex === -1) {
        res.status(404).json({ error: 'Joke not found' });
        return;
    }

    const updatedJoke = new Joke(targetId, body['text'], body['type']);
    jokes[existingJokeIndex] = updatedJoke;

    try {
        fs.writeFileSync('./jokes.json', JSON.stringify(jokes, null, 2), 'utf-8');
        res.status(201).json({ success: true, message: 'Success updating joke', joke: jokes[existingJokeIndex] });
    } catch (error) {
        console.error('Error writing to file:', error);
        res.status(500).json({ error: 'Failed to update joke' });
    }
}

export const patchJoke = (req: Request, res: Response) => {
    const { params } = req;
    const { body } = req;

    const targetId = Number(params.id);

    if (isNaN(targetId)) {
        res.status(400).json({ error: 'Invalid ID format' });
        return;
    }

    const existingJokeIndex = jokes.findIndex(joke => joke.id === targetId);

    if (existingJokeIndex === -1) {
        res.status(404).json({ error: 'Joke not found' });
        return;
    }

    const existingJoke = jokes[existingJokeIndex];

    body['text'] ? existingJoke['jokeText'] = body['text'] : existingJoke['jokeText'];

    body['type'] ? existingJoke['jokeType'] = body['type'] : existingJoke['jokeType'];

    try {
        fs.writeFileSync('./jokes.json', JSON.stringify(jokes, null, 2), 'utf-8');
        res.status(201).json({ success: true, message: 'Success patching joke', joke: jokes[existingJokeIndex] });
    } catch (error) {
        console.error('Error writing to file:', error);
        res.status(500).json({ error: 'Failed to update joke' });
    }
}

export const deleteJoke = (req: Request, res: Response) => {
    const { params } = req;
    const targetId = Number(params.id);

    if (isNaN(targetId)) {
        res.status(400).json({ error: 'Invalid ID format' });
        return;
    }

    const indexToDelete = jokes.findIndex(joke => joke.id === targetId);

    if (indexToDelete === -1) {
        res.status(404).json({ error: 'Joke not found' });
        return;
    }

    jokes.splice(indexToDelete, 1);

    try {
        fs.writeFileSync('./jokes.json', JSON.stringify(jokes, null, 2), 'utf-8');
        res.status(200).json({ success: true, message: 'Joke has been succesfully deleted' });
    } catch (error) {
        console.error('Error writing to file:', error);
        res.status(500).json({ error: 'Failed deleting the joke' });
    }
}

export const deleteAllJokes = (req: Request, res: Response) => {

    jokes.length = 0;

    try {
        fs.writeFileSync('./jokes.json', JSON.stringify(jokes, null, 2), 'utf-8');
        res.status(200).json({ success: true, message: 'All jokes deleted successfully' });
    } catch (error) {
        console.error('Error writing to file:', error);
        res.status(500).json({ success: false, message: 'Failed to delete all jokes' });
    }
};
