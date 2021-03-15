import React, { FC } from 'react';
import Page from '../components/Page';

export interface AboutUsProps { };

export const AboutUs : FC<AboutUsProps> = ({ children }) => {
    return (
        <Page>
            <h1>Hello world</h1>
        </Page>
    )
}

export default AboutUs;