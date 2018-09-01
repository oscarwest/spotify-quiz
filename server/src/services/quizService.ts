'use strict';

import { Quiz } from '../models/quiz';
import { SpotifyService } from '../services/spotifyService';
import { Question } from '../models/question';
import { Song } from '../models/song';

export class QuizService {
  constructor() {}

  // CRUD quiz
  public async createQuiz(userId: string,
                          playlistId: string,
                          count: number,
                          name: string,
                          description: string) : Promise<Quiz> {
    const spotifyService = new SpotifyService();
    const songs = await spotifyService.getSongs(userId, playlistId);

    const quiz = new Quiz({
      userId,
      description,
      name,
      questions: this.generateQuestions(songs, count),
    });

    return Promise.resolve(quiz);
  }

  private generateQuestions(songs: Song[], count: number) : Question[] {
    return songs.slice(0, count).map((song) => {
      const index = Math.floor(Math.random() * songs.length - 3);
      return new Question({
        answer: Math.floor(Math.random() * 4),
        songs: [
          songs[index],
          songs[index + 1],
          songs[index + 2],
          songs[index + 3],
        ],
      });
    });
  }
}
