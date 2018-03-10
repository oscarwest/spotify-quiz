import { uri } from '../config';

class GameApi {
    static createGame = (body) => {
        return fetch(`${uri}/quiz/create`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(response => {
                return response.json();
            }).catch(error => {
                throw error;
            });
    }
}

export default GameApi;