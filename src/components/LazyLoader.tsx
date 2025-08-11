import { FC } from 'web-cell';

interface LazyComponentProps {
  loader: () => Promise<FC<any> | { default: FC<any> } | any>;
  [key: string]: any;
}

export function createLazyComponent(loader: () => Promise<any>): FC<any> {
  let loadedComponent: FC<any> | null = null;
  let loading = true;
  
  // Start loading immediately
  loader().then(module => {
    loadedComponent = module.default || module;
    loading = false;
  });

  return (props: any) => {
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