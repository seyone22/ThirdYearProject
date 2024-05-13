'use client'
import styles from './page.module.css'
import {useState} from "react";
import getBookRecommendations from "@/app/services/recommender.api.service";

export default function Home() {
    const [bookName, setBookName] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleRecommendation = async () => {
        setLoading(true);
        const recommendedBooks = await getBookRecommendations(bookName);
        setRecommendations(recommendedBooks);
        setLoading(false);
    }

    return (
        <main className={styles.main}>

            <div>
                <div>
                    <input
                        type="text"
                        placeholder="Enter book name"
                        value={bookName}
                        onChange={(e) => setBookName(e.target.value)}
                    />
                    <button onClick={handleRecommendation} disabled={loading}>
                        {loading ? 'Fetching...' : 'Recommend'}
                    </button>
                </div>
                <ul>
                    {recommendations.map((recommendation, index) => (
                        <li key={index}>{recommendation}</li>
                    ))}
                </ul>
            </div>
        </main>
    )
}
