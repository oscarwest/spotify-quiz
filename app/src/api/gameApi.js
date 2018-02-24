import { uri } from '../config';

class GameApi {
    static createGame() {
        return fetch(`${uri}/quiz/create`)
            .then(response => {
                return response.json();
            }).catch(error => {
                return error;
            });
    }
}

export default GameApi;