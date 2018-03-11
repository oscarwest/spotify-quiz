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
                if (response.status === 200) {
                    return response.json();
                }
                else {
                    const error = {
                        status: response.status,
                        message: response.statusText
                    };
                    throw error;
                }

            }).catch(error => {
                throw error;
            });
    }
}

export default GameApi;