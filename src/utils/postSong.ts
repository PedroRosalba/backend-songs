#!/usr/bin/env node

import { createInterface } from 'readline';
import { default as fetch } from 'node-fetch';

import { CreateSongDTO } from 'src/songs/dto/create-song-dto';
import { Validations } from './validations';

const validations = new Validations();

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

async function promptUser(prompt: string): Promise<string> {
  return new Promise(resolve => rl.question(prompt, resolve));
}

async function main(): Promise<void> {
  try {
    const titleInput = await promptUser('Insert title: ');
    const artistsInput = await promptUser('Insert artists: ');
    const releaseDateInput = await promptUser('Insert release date:');
    const durationInput = await promptUser('Insert duration:');
  
    const title = titleInput;
    const artists = artistsInput.split(',').map(artist => artist.trim());
    const releaseDate = new Date(releaseDateInput);
    const duration = new Date(`1970-01-01T${durationInput}:00`);
    

    if (validations.isValidDate(releaseDate)) {
      throw new Error("Invalid release date");
    }
    if (validations.isValidTime(duration)) {
      throw new Error("Invalid duration");
    }
    if (artists.length === 0 || artists.some(artist => artist.trim() === '')) {
      throw new Error("At least one artist is required");
    }

    const createSongDTO: CreateSongDTO = {
      title,
      artists: artists as string[],
      releaseDate: releaseDate as Date,
      duration: duration as Date  
    };

    const response = await fetch('http://localhost:3000/songs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createSongDTO),
    });

    const result = await response.json();
    console.log('Response:', result);

    rl.close();
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('An unknown error occurred');
    }
    rl.close();
  }
}

main();
