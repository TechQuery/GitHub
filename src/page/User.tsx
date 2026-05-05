import { observable } from 'mobx';
import { attribute, component, observer } from 'web-cell';

import { Loading } from '../components/Loading';
import { githubStore } from '../model/github';

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
            <div className="row g-3">
                <div className="col-12 col-md-4">
                    <m3e-card variant="elevated" className="h-100">
                        <div
                            slot="content"
                            className="d-flex flex-column align-items-center gap-3 text-center"
                        >
                            <img
                                src={user.avatar_url}
                                width={150}
                                height={150}
                                alt={user.login}
                                className="rounded-circle"
                            />
                            <h3 className="mb-0">{user.name || user.login}</h3>
                            <p className="mb-0 text-muted">@{user.login}</p>
                            {user.bio && <p className="mb-0">{user.bio}</p>}
                            <div className="d-flex justify-content-around w-100 mt-2">
                                <div className="text-center">
                                    <strong>{user.public_repos}</strong>
                                    <br />
                                    <small>仓库</small>
                                </div>
                                <div className="text-center">
                                    <strong>{user.followers}</strong>
                                    <br />
                                    <small>关注者</small>
                                </div>
                                <div className="text-center">
                                    <strong>{user.following}</strong>
                                    <br />
                                    <small>关注</small>
                                </div>
                            </div>
                        </div>
                    </m3e-card>
                </div>
                <div className="col-12 col-md-8">
                    <m3e-card variant="outlined" className="h-100">
                        <div slot="header">
                            <h3 className="mb-0">用户信息</h3>
                        </div>
                        <div slot="content" className="d-flex flex-column gap-2">
                            {user.company && (
                                <p className="mb-0">
                                    <strong>公司:</strong> {user.company}
                                </p>
                            )}
                            {user.location && (
                                <p className="mb-0">
                                    <strong>位置:</strong> {user.location}
                                </p>
                            )}
                            <p className="mb-0">
                                <strong>GitHub:</strong>{' '}
                                <a href={user.html_url} target="_blank" rel="noreferrer">
                                    {user.html_url}
                                </a>
                            </p>
                        </div>
                    </m3e-card>
                </div>
            </div>
        );
    }
}
