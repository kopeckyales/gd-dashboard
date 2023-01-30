import React from "react";
import Page from "../components/Page";
import { HomeContextProvider } from "../contexts/Home/context";
import { HomePageContent } from "../components/Home/HomePageContent";

const Home: React.FC = () => {
    return (
        <Page>
            <HomeContextProvider>
                <HomePageContent />
            </HomeContextProvider>
        </Page>
    );
};

export default Home;
