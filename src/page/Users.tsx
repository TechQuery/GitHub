import { User } from 'mobx-github';
import { component, observer } from 'web-cell';

import { Loading } from '../components/Loading';
import { githubStore } from '../stores/github';

@component({ tagName: 'users-page' })
@observer
export default class UsersPage extends HTMLElement {
    mountedCallback() {
        githubStore.fetchUsers();
    }

    renderUserCard = ({ avatar_url, login, id }: User) => (
        <div key={id} className="s12 m6 l4">
            <article className="card">
                <div className="center-align">
                    <img
                        src={avatar_url}
                        className="circle"
                        width={64}
                        height={64}
                        alt={login}
                    />
                    <h5>
                        <a href={`#/users/${login}`}>{login}</a>
                    </h5>
                    <p>
                        <small>ID: {id}</small>
                    </p>
                </div>
            </article>
        </div>
    );

    render() {
        const { users, downloading } = githubStore;

        if (downloading > 0) return <Loading />;

        return (
            <div className="grid">
                <div className="s12">
                    <h2>GitHub 用户 (G 友)</h2>
                    <div className="grid">
                        {users.map(this.renderUserCard)}
                    </div>
                </div>
            </div>
        );
    }
}
