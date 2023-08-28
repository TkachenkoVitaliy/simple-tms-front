import {BrowserRouter} from "react-router-dom";
import Lazy from "./Lazy";
import {createRoot} from "react-dom/client";


const container = document.getElementById('root')
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <Lazy />
    </BrowserRouter>
)