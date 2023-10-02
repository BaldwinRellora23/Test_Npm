import { createBrowserRouter } from "react-router-dom"


import ReactTableWithDnd from '../Components/ReactTableWithDnd'
import Layout from "../Components/Layout"



const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            { index: true, element: <ReactTableWithDnd /> }
         
        

        ]

    }
])

export default router