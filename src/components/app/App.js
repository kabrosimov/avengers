import { lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';
// import { MainPage, ComicsPage, SingleComicPage } from '../pages';

const Page404 = lazy(() => import('../../pages/404'));
const MainPage = lazy(() => import('../../pages/MainPage'));
const ComicsPage = lazy(() => import('../../pages/ComicsPage'));
// const SingleComicPage = lazy(
//     () => import('../../pages/singleComicPage/SingleComicPage'),
// );
const SinglePage = lazy(() => import('../../pages/SinglePage'));
const SingleComicLayout = lazy(
    () => import('../../pages/singleComicLayout/SingleComicLayout'),
);
const SingleCharLayout = lazy(
    () => import('../../pages/singleCharLayout/SingleCharLayout'),
);

const App = () => {
    return (
        <Router>
            <main>
                <div className="app">
                    <AppHeader />
                    <main>
                        <Suspense
                            fallback={
                                <span>
                                    {' '}
                                    <Spinner></Spinner>{' '}
                                </span>
                            }
                        >
                            <Routes>
                                <Route path="/" element={<MainPage />} />
                                <Route
                                    path="/comics"
                                    element={<ComicsPage />}
                                />
                                {/* <Route
                                    path="/comics/:comicID"
                                    element={<SingleComicPage />}
                                />
                                <Route
                                    path="/characters/:charName"
                                    element={<SingleComicPage />}
                                /> */}
                                <Route
                                    path="/comics/:id"
                                    element={
                                        <SinglePage
                                            Component={SingleComicLayout}
                                            dataType="comic"
                                        />
                                    }
                                />
                                <Route
                                    path="/characters/:id"
                                    element={
                                        <SinglePage
                                            Component={SingleCharLayout}
                                            dataType="character"
                                        />
                                    }
                                />
                                <Route path="*" element={<Page404 />} />
                            </Routes>
                        </Suspense>
                    </main>
                </div>
            </main>
        </Router>
    );
};

export default App;
