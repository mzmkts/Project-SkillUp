import { useParams } from 'react-router-dom';

export default function UserPage() {
    const { username } = useParams();
    return <h1>Профиль пользователя: {username}</h1>;
}
