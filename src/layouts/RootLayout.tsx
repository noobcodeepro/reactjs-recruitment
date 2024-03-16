import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { auth } from "../lib/firebase";

const RootLayout = () => {
	useEffect(() => {}, []);
	return (
		<>
			<Outlet />
		</>
	);
};

export default RootLayout;
