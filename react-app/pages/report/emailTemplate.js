import { Html, Body, H1 } from '@react-email/components';
import React from 'react';

export default function EmailTemplate({ name, panel, errorExplanation, comment }) {
    return (
        <Html>
            <Body>
                <H1>Report an Error</H1>
                <p>Purchaser Name: {name}</p>
                <p>Panel: {panel}</p>
                <p>Error Explanation: {errorExplanation}</p>
                <p>Additional Comments: {comment}</p>
            </Body>
        </Html>
    )
}