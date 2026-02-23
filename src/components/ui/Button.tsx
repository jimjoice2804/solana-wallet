import type { ButtonPropsType } from '@/types/ButtonPropsType';

const Button = ({ children, onClick, style }: ButtonPropsType) => {
  return (
    <button onClick={onClick} className={style}>
      {children}
    </button>
  );
};

export default Button;
