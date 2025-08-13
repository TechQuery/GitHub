import { observable } from 'mobx';
import { attribute, component, observer } from 'web-cell';

import { Loading } from '../components/Loading';
import { GitHubGistFile, githubStore } from '../stores/github';

@component({ tagName: 'gist-detail-page' })
@observer
export default class GistDetailPage extends HTMLElement {
    @observable
    @attribute
    accessor gistId!: string;

    connectedCallback() {
        if (this.gistId) {
            githubStore.fetchGist(this.gistId);
        }
    }

    attributeChangedCallback() {
        if (this.gistId) {
            githubStore.fetchGist(this.gistId);
        }
    }

    renderFile = ([filename, file]: [string, GitHubGistFile | null]) => (
        <section key={filename} className="panel panel-info">
            <header className="panel-heading">
                <a className="panel-title" target="_blank" rel="noreferrer" href={file?.raw_url}>
                    {filename}
                </a>
                <span className="pull-right">[ {file?.language || 'Text'} ]</span>
            </header>
            <div className="panel-body">
                <pre>{file?.content || 'Content not available'}</pre>
            </div>
        </section>
    );

    render() {
        const { downloading, currentGist } = githubStore;

        if (downloading) return <Loading />;

        if (!currentGist) {
            return (
                <div className="row">
                    <div className="col-md-12">
                        <div className="alert alert-warning">
                            <p>Gist 未找到</p>
                        </div>
                    </div>
                </div>
            );
        }

        const files = currentGist.files ? Object.entries(currentGist.files) : [];

        return (
            <div className="row">
                <div className="col-md-12">
                    <h2>{currentGist.description || currentGist.id}</h2>
                    <div className="mb-3">
                        <span>
                            创建于{' '}
                            {currentGist.created_at
                                ? new Date(currentGist.created_at).toLocaleDateString('zh-CN')
                                : '未知'}
                        </span>
                        <span className="pull-right">
                            更新于{' '}
                            {currentGist.updated_at
                                ? new Date(currentGist.updated_at).toLocaleDateString('zh-CN')
                                : '未知'}
                        </span>
                    </div>

                    <h3>代码文件</h3>
                    <div>{files.map(this.renderFile)}</div>
                </div>
            </div>
        );
    }
}
