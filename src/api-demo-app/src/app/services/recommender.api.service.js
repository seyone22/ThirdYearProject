export async function getBookRecommendations(title, model) {
    try {
        const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: title, model: model})
        });
        const data = await response.json();
        console.log(data.prediction);

        if (data.error) {
            throw data.error
        }

        return data.prediction;
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        return error;
    }
}

export async function getModels() {
    try {
        const response = await fetch('http://localhost:5000/models', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json()
        return data.models;
    } catch (error) {
    console.error('Error fetching models:', error);
    return[];
    }
}