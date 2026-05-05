import { User } from 'mobx-github';
import { component, observer } from 'web-cell';

import { Loading } from '../components/Loading';
import { githubStore } from '../stores/github';
import { Link } from '../stores/router';

@component({ tagName: 'users-page' })
@observer
export default class UsersPage extends HTMLElement {
    mountedCallback() {
        githubStore.fetchUsers();
    }

    renderUserCard = ({ avatar_url, login, id }: User) => (
        <div key={id} className="col">
            <m3e-card variant="outlined" className="h-100 text-center">
                <div slot="content" className="d-flex flex-column align-items-center gap-2">
                    <img
                        src={avatar_url}
                        width={64}
                        height={64}
                        alt={login}
                        className="rounded-circle"
                    />
                    <h4 className="mb-0">
                        <Link to={`/users/${login}`} className="text-decoration-none">
                            {login}
                        </Link>
                    </h4>
                    <p className="mb-0 small text-muted">ID: {id}</p>
                </div>
            </m3e-card>
        </div>
    );

    render() {
        const { users, downloading } = githubStore;

        if (downloading > 0) return <Loading />;

        return (
            <div>
                <h2>GitHub 用户 (G 友)</h2>
                <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
                    {users.map(this.renderUserCard)}
                </div>
            </div>
        );
    }
}
