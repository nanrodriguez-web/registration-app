import NotFound from "@/pages/notfound";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "./components/ui/sonner";
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

			<Toaster />
		</>
	);
}

export default App;
