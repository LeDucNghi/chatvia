import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";

function App() {
  return (
    <>
      {/* <div className="bg-red-600 w-full h-3"> app</div> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
