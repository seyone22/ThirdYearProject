'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './page.module.css'
import {useEffect, useState} from "react";
import {getBookRecommendations, getModels} from "@/app/services/recommender.api.service";
import {Button, Dropdown, Form, Toast} from "react-bootstrap";

export default function Home() {
    const [bookName, setBookName] = useState('');
    const [recommendations, setRecommendations] = useState([]);
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

    return (
        <main className={styles.main}>
            {showToast && (
                <Toast className={styles.toast}>
                    <Toast.Header >
                        <strong className="mr-auto">Error:</strong>
                    </Toast.Header>
                    <Toast.Body>{gotData.toString()}</Toast.Body>
                </Toast>
            )}

            <div className={styles.title}>
                <h1>Recommendation API Demo</h1>
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
                        <Form.Select className={styles.input} onChange={(e) => handleSelect(e.target.value)} aria-label="Default select example">
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
            <div>
                {recommendations.map((recommendation, index) => (
                    <div className={styles.card} key={recommendation}>
                        <h5>{recommendation}</h5>
                    </div>
                ))}
            </div>
        </main>
    );
}
