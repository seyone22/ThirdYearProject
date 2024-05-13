async function getBookRecommendations(title, model='fuzzy-tf-idf') {
    try {
        const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: title, model: model})
        });
        const data = await response.json();
        console.log(data.prediction);

        if(data.error) {
            throw data.error
        }

        return data.prediction;
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        return [];
    }
}

export default getBookRecommendations;