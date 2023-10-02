import { RouterProvider } from 'react-router-dom'
import router from './Routes and Store/routes'


const SampleRoute = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default SampleRoute