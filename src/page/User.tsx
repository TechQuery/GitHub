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
            <div className="grid">
                <div className="s12 m4">
                    <article className="card">
                        <div className="center-align">
                            <img
                                src={user.avatar_url}
                                className="circle"
                                width={150}
                                height={150}
                                alt={user.login}
                            />
                            <h4>{user.name || user.login}</h4>
                            <p className="secondary-text">@{user.login}</p>
                            {user.bio && <p>{user.bio}</p>}
                            <div className="grid no-space">
                                <div className="s4">
                                    <strong>{user.public_repos}</strong>
                                    <br />
                                    <small>仓库</small>
                                </div>
                                <div className="s4">
                                    <strong>{user.followers}</strong>
                                    <br />
                                    <small>关注者</small>
                                </div>
                                <div className="s4">
                                    <strong>{user.following}</strong>
                                    <br />
                                    <small>关注</small>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                <div className="s12 m8">
                    <h4>用户信息</h4>
                    <article className="card">
                        <div>
                            {user.company && (
                                <p>
                                    <strong>公司:</strong> {user.company}
                                </p>
                            )}
                            {user.location && (
                                <p>
                                    <strong>位置:</strong> {user.location}
                                </p>
                            )}
                            <p>
                                <strong>GitHub:</strong>{' '}
                                <a href={user.html_url} target="_blank" rel="noreferrer">
                                    {user.html_url}
                                </a>
                            </p>
                        </div>
                    </article>
                </div>
            </div>
        );
    }
}
