import { createBrowserRouter } from "react-router-dom"

import HomePage from "@/pages/HomePage"
import LoginPage from "@/pages/LoginPage"
import NotFoundPage from "@/pages/NotFoundPage"
import RoomPage from "@/pages/RoomPage"

export const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/room/:roomId",
		element: <RoomPage />,
	},
	{
		path: "/room/:roomId/login",
		element: <LoginPage />,
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
])
