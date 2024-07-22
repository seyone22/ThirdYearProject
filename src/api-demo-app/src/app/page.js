'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './page.module.css'
import {useEffect, useState} from "react";
import {getBookRecommendations, getModels} from "@/app/services/recommenderService";
import {Button, Dropdown, Form, Toast} from "react-bootstrap";
import TopNav from "../../components/TopNav";

export default function Home() {
    const [bookName, setBookName] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [selectedRecommendations, setSelectedRecommendations] = useState([]);

    const [loading, setLoading] = useState(false);
    const [modelList, setModelList] = useState([]);
    const [selectedModel, setSelectedModel] = useState('fuzzy-tf-idf');
    const [gotData, setGotData] = useState('');

    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 3000); // Assuming you want to reset success after 3 seconds (adjust as needed)
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    useEffect(() => {
        getModels().then(data => {
            setModelList(data);
        });
    }, []);

    const handleRecommendation = async (e) => {
        e.preventDefault()
        setLoading(true);
        const data = await getBookRecommendations(bookName, selectedModel);
        console.log(data);
        if (Array.isArray(data)) {
            setRecommendations(data);
        } else {
            setGotData(data)
            setShowToast(true)
        }
        setLoading(false);
    };

    const handleSelect = (eventKey) => {
        setSelectedModel(eventKey);
    };

    const handleCheckboxChange = (recommendation) => {
        setSelectedRecommendations((prevSelected) => {
            if (prevSelected.includes(recommendation)) {
                return prevSelected.filter((item) => item !== recommendation);
            } else {
                return [...prevSelected, recommendation];
            }
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5000/selected-recommendations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ selectedRecommendations, bookName })
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Data saved successfully:', data);
        } catch (error) {
            console.error('Error saving selected recommendations:', error);
        }
    };

    return (
        <main className={styles.main}>
            <TopNav/>
            {showToast && (
                <Toast className={styles.toast}>
                    <Toast.Header>
                        <strong className="mr-auto">Error:</strong>
                    </Toast.Header>
                    <Toast.Body>{gotData.toString()}</Toast.Body>
                </Toast>
            )}

            <div className={styles.title}>
                <h1>Book Recommender</h1>
            </div>
            <div className={styles.inputArea}>
                <div>
                    <Form>
                        <Form.Control
                            className={styles.input}
                            value={bookName}
                            onChange={(e) => setBookName(e.target.value)}
                            type="text"
                            name='bookName'
                            placeholder="Book Name"
                            onSubmit={(e) => handleRecommendation(e)}
                        />

                        <Form.Label>
                            Model:
                        </Form.Label>
                        <Form.Select className={styles.input} onChange={(e) => handleSelect(e.target.value)}
                                     aria-label="Default select example">
                            {modelList.map(item => (
                                <option key={item.id} value={item}>{item}</option>
                            ))}
                        </Form.Select>

                        <Button
                            className={styles.button}
                            variant="primary"
                            onClick={(e) => handleRecommendation(e)}
                            disabled={loading}
                        >
                            {loading ? 'Fetching...' : 'Recommend'}
                        </Button>
                    </Form>
                </div>
            </div>

            <>
                {recommendations.length > 0 && (
                    <div>
                        {recommendations.map((recommendation, index) => (
                            <div className={styles.card} key={recommendation}>
                                <div className={styles.row}>
                                    <input
                                        className={styles.checkbox}
                                        type="checkbox"
                                        checked={selectedRecommendations.includes(recommendation)}
                                        onChange={() => handleCheckboxChange(recommendation)}
                                    />
                                    <p className={styles.recommendationText}>{recommendation}</p>
                                </div>
                            </div>
                        ))}
                        <Button onClick={handleSubmit}>Relevant!</Button>
                    </div>
                )}
            </>
        </main>
    );
}
