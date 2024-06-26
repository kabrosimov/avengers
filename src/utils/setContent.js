import Skeleton from '../components/skeleton/Skeleton';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Spinner from '../components/spinner/Spinner';

const setContent = (process, Component, data) => {
    switch (process) {
        case 'waiting':
            return <Skeleton />;
        // break;
        case 'loading':
            return <Spinner />;
        // break;
        case 'confirmed':
            return <Component data={data} />;
        // break;
        case 'error':
            return <ErrorMessage />;
        // break;
        default:
            throw new Error('Unexpected process state');
    }
};

const setContentCardList = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner />;
        // break;
        case 'loading':
            return newItemLoading ? <Component /> : <Spinner />;
        // break;
        case 'confirmed':
            return <Component />;
        // break;
        case 'error':
            return <ErrorMessage />;
        // break;
        default:
            throw new Error('Unexpected process state');
    }
};

export default setContent;
export { setContentCardList };
