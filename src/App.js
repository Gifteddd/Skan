import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import RequestPage from "./pages/RequestPage/RequestPage";
import CheckTokenWithoutNavigate from "./components/CheckTokenWithoutNavigate";

function App() {
    return (
        <>
            <CheckTokenWithoutNavigate />
            <BrowserRouter basename={`/${process.env.PUBLIC_URL}`}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/results" element={<ResultsPage />} />
                    <Route path="/search" element={<RequestPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;