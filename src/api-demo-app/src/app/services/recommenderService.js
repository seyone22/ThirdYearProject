import dbConnect from "@/app/utils/dbConnect";
import Recommendation from "@/app/models/recommendation";

export async function getBookRecommendations(title, model) {
    try {
        const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: title, model: model })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        return data.prediction;
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        return null;
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

        if (!response.ok) {
            throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.models;
    } catch (error) {
        console.error('Error fetching models:', error);
        return [];
    }
}

export async function insertSelectedRecommendations(id, recommendationsList, book) {
    try {
        dbConnect()

        for (const recommendation of recommendationsList) {
            let r = new Recommendation({
                userId: id,
                bookName: book,
                recommendationName: recommendation
            })
            await r.save();
        }
        return 0;
    } catch (error) {
        console.error('Internal Server Error:', error);
        return 1;
    }
}