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
        <m3e-card key={id} variant="outlined" style={{ textAlign: 'center' }}>
            <div
                slot="content"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}
            >
                <img
                    src={avatar_url}
                    width={64}
                    height={64}
                    alt={login}
                    style={{ borderRadius: '50%' }}
                />
                <h4 style={{ margin: '0' }}>
                    <a
                        href={`#/users/${login}`}
                        style={{
                            textDecoration: 'none',
                            color: 'var(--md-sys-color-primary, #1565C0)'
                        }}
                    >
                        {login}
                    </a>
                </h4>
                <p
                    style={{
                        margin: '0',
                        fontSize: '0.75rem',
                        color: 'var(--md-sys-color-on-surface-variant, #666)'
                    }}
                >
                    ID: {id}
                </p>
            </div>
        </m3e-card>
    );

    render() {
        const { users, downloading } = githubStore;

        if (downloading > 0) return <Loading />;

        return (
            <div>
                <h2>GitHub 用户 (G 友)</h2>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                        gap: '1rem'
                    }}
                >
                    {users.map(this.renderUserCard)}
                </div>
            </div>
        );
    }
}
