import { FC } from 'web-cell';

export function createLazyComponent(loader: () => Promise<{ default: FC } | FC>): FC {
  let loadedComponent: FC | null = null;
  let loading = true;
  
  // Start loading immediately
  loader().then(module => {
    loadedComponent = 'default' in module ? module.default : module;
    loading = false;
  });

  return (props: Record<string, unknown>) => {
    if (loading) {
      return (
        <div className="text-center">
          <div className="spinner">加载中...</div>
        </div>
      );
    }

    if (!loadedComponent) {
      return <div>加载失败</div>;
    }

    const Component = loadedComponent;
    return <Component {...props} />;
  };
}