export function HomePage() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '4rem 1rem',
                textAlign: 'center',
                gap: '1rem'
            }}
        >
            <h1 style={{ fontSize: '2.5rem', margin: '0' }}>GitHub 中文版</h1>
            <p
                style={{
                    fontSize: '1.125rem',
                    color: 'var(--md-sys-color-on-surface-variant, #666)',
                    margin: '0'
                }}
            >
                基于 WebCell v3 重写的现代化 GitHub 浏览器
            </p>
            <div
                style={{
                    display: 'flex',
                    gap: '0.75rem',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    marginTop: '1rem'
                }}
            >
                <m3e-button variant="filled" href="#/events">
                    查看 G 流
                </m3e-button>
                <m3e-button variant="tonal" href="#/repos">
                    浏览 G 仓
                </m3e-button>
                <m3e-button variant="outlined" href="#/users">
                    发现 G 友
                </m3e-button>
            </div>
        </div>
    );
}
