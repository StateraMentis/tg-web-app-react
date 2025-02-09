import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import {Route, Routes} from 'react-router-dom'
import InlineForm from "./components/InlineForm/InlineForm";
import Form from "./components/Form/Form";

function App() {
    const {onToggleButton, tg} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [])

    return (
        <div className="App">
            {/* <Header /> */}
            <Routes>
                <Route index element={<Form />}/>
                {/* <Route path={'inline'} element={<InlineForm />}/> */}
            </Routes>
        </div>
    );
}

export default App;
