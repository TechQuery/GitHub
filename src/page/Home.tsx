export function HomePage() {
  return (
    <div className="grid">
      <div className="s12">
        <div className="large-space center-align">
          <h1>GitHub 中文版</h1>
          <p className="large-text">基于 WebCell v3 重写的现代化 GitHub 浏览器</p>
          <div className="space">
            <a className="button large fill" href="#/events" role="button">查看 G 流</a>
            <a className="button large fill" href="#/repos" role="button">浏览 G 仓</a>
            <a className="button large fill" href="#/users" role="button">发现 G 友</a>
          </div>
        </div>
      </div>
    </div>
  );
}