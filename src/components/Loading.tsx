import { FC } from 'web-cell';

export const Loading: FC = () => (
    <div className="center-align">
        <progress className="circle"></progress>
        <p>加载中...</p>
    </div>
);