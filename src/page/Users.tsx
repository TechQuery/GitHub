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
        <div key={id} className="col-md-4 col-sm-6">
            <div className="panel panel-default">
                <div className="panel-body text-center">
                    <img
                        src={avatar_url}
                        className="img-circle"
                        width={64}
                        height={64}
                        alt={login}
                    />
                    <h4>
                        <a href={`#/users/${login}`}>{login}</a>
                    </h4>
                    <p>
                        <small>ID: {id}</small>
                    </p>
                </div>
            </div>
        </div>
    );

    render() {
        const { users, downloading } = githubStore;

        if (downloading > 0) return <Loading />;

        return (
            <div className="row">
                <div className="col-md-12">
                    <h2>GitHub 用户 (G 友)</h2>
                    <div className="row">
                        {users.map(this.renderUserCard)}
                    </div>
                </div>
            </div>
        );
    }
}
