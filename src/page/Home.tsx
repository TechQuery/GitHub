export function HomePage() {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="jumbotron">
          <h1>GitHub 中文版</h1>
          <p>基于 WebCell v3 重写的现代化 GitHub 浏览器</p>
          <p>
            <a className="btn btn-primary btn-lg" href="#/events" role="button">查看 G 流</a>
            <a className="btn btn-success btn-lg" href="#/repos" role="button">浏览 G 仓</a>
            <a className="btn btn-info btn-lg" href="#/users" role="button">发现 G 友</a>
          </p>
        </div>
      </div>
    </div>
  );
}