import Skeleton from "../components/skeleton/Skeleton";
import Error from "../components/error/Error";
import Spinner from "../components/spinner/Spinner";

const setContent = (process, Component, data) => {
    switch (process) {
        case 'waiting': 
            return <Skeleton name="Please select a character to see information"/>;
        case 'loading':
            return <Spinner/>;
        case 'error':
            return <Error/>;
        case 'confirmed':
            return <Component data={data}/>;
        default: 
            throw new Error('Unexpected process state');
    }
}

export default setContent