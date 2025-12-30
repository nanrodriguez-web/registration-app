import NotFound from "@/pages/notfound";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { routes } from "./routes";

function App() {
	return (
		<>
			<Router>
				<Routes>
					{routes.map((route, index) => (
						<Route
							key={index}
							path={route.path}
							element={<route.component />}
						/>
					))}

					{/* page not found */}
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
