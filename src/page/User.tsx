import { observable } from 'mobx';
import { attribute, component, observer } from 'web-cell';

import { Loading } from '../components/Loading';
import { githubStore } from '../stores/github';

@component({ tagName: 'user-page' })
@observer
export default class UserPage extends HTMLElement {
    @observable
    @attribute
    accessor username = '';

    mountedCallback() {
        if (this.username) githubStore.fetchUser(this.username);
    }

    render() {
        const { currentUser: user, downloading } = githubStore;

        if (downloading > 0) return <Loading />;
        if (!user) return <div>用户不存在</div>;

        return (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
                <m3e-card variant="elevated">
                    <div
                        slot="content"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.75rem',
                            textAlign: 'center'
                        }}
                    >
                        <img
                            src={user.avatar_url}
                            width={150}
                            height={150}
                            alt={user.login}
                            style={{ borderRadius: '50%' }}
                        />
                        <h3 style={{ margin: '0' }}>{user.name || user.login}</h3>
                        <p
                            style={{
                                margin: '0',
                                color: 'var(--md-sys-color-on-surface-variant, #666)'
                            }}
                        >
                            @{user.login}
                        </p>
                        {user.bio && <p style={{ margin: '0' }}>{user.bio}</p>}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                width: '100%',
                                marginTop: '0.5rem'
                            }}
                        >
                            <div style={{ textAlign: 'center' }}>
                                <strong>{user.public_repos}</strong>
                                <br />
                                <small>仓库</small>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <strong>{user.followers}</strong>
                                <br />
                                <small>关注者</small>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <strong>{user.following}</strong>
                                <br />
                                <small>关注</small>
                            </div>
                        </div>
                    </div>
                </m3e-card>
                <m3e-card variant="outlined">
                    <div slot="header">
                        <h3 style={{ margin: '0' }}>用户信息</h3>
                    </div>
                    <div
                        slot="content"
                        style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
                    >
                        {user.company && (
                            <p style={{ margin: '0' }}>
                                <strong>公司:</strong> {user.company}
                            </p>
                        )}
                        {user.location && (
                            <p style={{ margin: '0' }}>
                                <strong>位置:</strong> {user.location}
                            </p>
                        )}
                        <p style={{ margin: '0' }}>
                            <strong>GitHub:</strong>{' '}
                            <a href={user.html_url} target="_blank" rel="noreferrer">
                                {user.html_url}
                            </a>
                        </p>
                    </div>
                </m3e-card>
            </div>
        );
    }
}
