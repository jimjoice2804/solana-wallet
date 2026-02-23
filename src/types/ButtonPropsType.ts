import type { ReactNode } from "react";

export interface ButtonPropsType {
    children: ReactNode,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    style: string,
}