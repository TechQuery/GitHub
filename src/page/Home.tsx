export function HomePage() {
    return (
        <div className="d-flex flex-column align-items-center py-5 px-3 text-center gap-3">
            <h1 className="display-5 mb-0">GitHub 中文版</h1>
            <p className="fs-5 mb-0 text-muted">基于 WebCell v3 重写的现代化 GitHub 浏览器</p>
            <div className="d-flex gap-2 flex-wrap justify-content-center mt-2">
                <m3e-button variant="filled" href="#/events">查看 G 流</m3e-button>
                <m3e-button variant="tonal" href="#/repos">浏览 G 仓</m3e-button>
                <m3e-button variant="outlined" href="#/users">发现 G 友</m3e-button>
            </div>
        </div>
    );
}
