import { uri } from '../config';

class GameApi {
    static createQuiz = (body) => {
        return fetch(`${uri}/quiz/create`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(response => {
                if (response.status === 200) {
                    return Promise.resolve(response.json());
                }
                else {
                    const error = {
                        status: response.status,
                        message: response.statusText
                    };
                    return Promise.reject(error);
                }
            }).catch(error => {
                return Promise.reject(error);
            });
    }
}

export default GameApi;