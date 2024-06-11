// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { UserProvider } from "./UserContext";
import EditWorkout from "./editworkout";
import HomePage from "./homepage";
import UserProfileComponent from "./profile/index";
import ProfileContainer from "./profile/profilecontainer";
import HomeContainer from "./HomeContainer";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeContainer />}>
      {/* <Route path="/progress" element={<Progress />}>
        <Route path="/insights" element={<Insights />} />
        <Route index element={<Goals />} />
      </Route> */}
      <Route path="/profile" element={<ProfileContainer />}>
        {/* <Route path="/history" element={<WorkoutHistory />} /> */}
        <Route index element={<UserProfileComponent />} />
      </Route>
      <Route path="/editworkout" element={<EditWorkout />} />
      {/* <Route path="/programs" element={<Programs />}>
        <Route path="/editexercises" element={<EditExercises />} />
        <Route path="/editprograms" element={<EditPrograms />} />
        <Route index element={<UserPrograms />} />
      </Route> */}
      <Route index element={<HomePage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
