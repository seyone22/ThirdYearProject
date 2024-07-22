'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './page.module.css'; // Ensure this path is correct
import React, {useState} from 'react';
import {useRouter} from 'next/navigation'
import {Button, Form, Toast} from 'react-bootstrap';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const [show, setShow] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:8080/api/users/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password}),
        });

        if (res.ok) {
            router.push(`/`);
        } else {
            const { error } = await res.json()
            setError(error)
            setShow(true)
        }
    };

    return (
        <main className={styles.main}>
            <div className={styles.loginArea}>
                <div className={styles.textArea}>
                    <div className={styles.title}>
                        <h2 className={styles.title}>Login</h2>
                    </div>
                    <div>
                        <Form onSubmit={handleSubmit}>
                            <Form.Control
                                className={styles.input}
                                placeholder="Email Address"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Form.Control
                                className={styles.input}
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <Button type="submit" className={styles.button}>Login</Button>
                        </Form>
                    </div>
                </div>
            </div>


            <div className={styles.toastContainer}>
                <Toast onClose={() => setShow(false)} show={show} delay={9000} autohide bg='danger'>
                    <Toast.Header>
                        <strong className="me-auto">Login Failed!</strong>
                        <small>Error</small>
                    </Toast.Header>
                    <Toast.Body className={'text-white'}>{error}</Toast.Body>
                </Toast>
            </div>
        </main>
    );
}
