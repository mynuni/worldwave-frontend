import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CLIENT_PATHS} from "./constants/path";
import ExplorePage from "./pages/Explore/ExplorePage";
import FeedPage from "./pages/Feed/FeedPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import HomePage from "./pages/Home/HomePage";
import {Layout, NavLayout} from "./styles/Layout";
import GlobalStyles from "./styles/GlobalStyles";
import SignUpPage from "./pages/SignUp/SignUpPage";
import LoginPage from "./pages/Login/LoginPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import {QueryClient, QueryClientProvider} from "react-query";
import ResetPassword from "./components/Auth/form/ResetPassword";
import PeoplePage from "./pages/People/PeoplePage";
import LoginSuccess from "./components/Auth/form/LoginSuccess";
import MyPage from "./pages/MyPage/MyPage";
import MemberPage from "./pages/Member/MemberPage";

const App = () => {

    const queryClient = new QueryClient();

    return (
        <BrowserRouter>
            <GlobalStyles/>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route element={<Layout/>}>
                        <Route path={CLIENT_PATHS.HOME} element={<HomePage/>}/>
                        <Route path={CLIENT_PATHS.LOGIN} element={<LoginPage/>}/>
                        <Route path={CLIENT_PATHS.LOGIN_SUCCESS} element={<LoginSuccess/>}/>
                        <Route path={CLIENT_PATHS.SIGN_UP} element={<SignUpPage/>}/>
                        <Route path={CLIENT_PATHS.RESET_PASSWORD} element={<ResetPassword/>}/>
                    </Route>
                    <Route element={<ProtectedRoute/>}>
                        <Route element={<NavLayout/>}>
                            <Route path={"/mypage/:page"} element={<MyPage/>}/>
                            <Route path={CLIENT_PATHS.EXPLORE} element={<ExplorePage/>}/>
                            <Route path={CLIENT_PATHS.MEMBERS} element={<MemberPage/>}/>
                            <Route path={CLIENT_PATHS.FEED} element={<FeedPage/>}/>
                            <Route path={CLIENT_PATHS.PEOPLE} element={<PeoplePage/>}/>
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </QueryClientProvider>
        </BrowserRouter>
    );
};

export default App;