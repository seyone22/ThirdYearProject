async function getBookRecommendations(title) {
    try {
        const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: title})
        });
        const data = await response.json();
        console.log(data.prediction);

        return data.prediction;
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        return [];
    }
}

export default getBookRecommendations;