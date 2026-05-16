import { DashboardPage, QuestionPage, CollectionPage, CollectionDetailsPage, ContestPage, PrivateContestLobbyPage, GroupContestLobby, LiveContestPage } from "../../pages";
import { Route } from "react-router-dom";
import GuestOnlyWrapper from "../GuestOnlyWrapper.jsx";
import TalkTown from "../../pages/TalkTown.jsx";
import TalkTownGateway from "../../components/TalkTownGateway.jsx";
import CreatedContestsPage from "../../components/ContestPage/CreatedContestsPage.jsx";
import JoinedContestsPage from "../../components/ContestPage/JoinedContestsPage.jsx"



export const ProtectedRoutes = (
    <>



        <Route path="user/dashboard" element={
            <GuestOnlyWrapper>
                <DashboardPage />
            </GuestOnlyWrapper>
        } />

        {/* Questions Listing Page */}
        <Route path="user/questions" element={
            <QuestionPage />
        } />

       
        <Route path="user/contests" element={
            <ContestPage />
        } />

        <Route path="user/collections" element={
            <CollectionPage />
        } />

        <Route path="/user/contests/public/:contestId" element = {
             <GroupContestLobby/>
        }/>

        <Route path="/user/contests/private/:contestId" element = {
             <PrivateContestLobbyPage/>
        }/>

         <Route path="/contests/:contestId/live" element = {
             <LiveContestPage/> 
        }/>

        <Route path="user/collections/:collectionId" element={
            <CollectionDetailsPage />
        } />

        <Route path="user/talktown" element={<TalkTown />} />

        <Route path="/talktown-gateway" element={<TalkTownGateway />} />


        <Route path="/contests/created" element={<CreatedContestsPage />} />

        <Route path="/contests/joined" element={<JoinedContestsPage />} />
    </>
)