import { FC } from "react";

export const SpinnerLoader: FC = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 bg-paper">
      <div className="brand-loader__mark">Home of Design</div>
      <div className="brand-loader__bar">
        <span />
      </div>
    </div>
  );
};
