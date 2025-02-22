import styles from "./Button.module.scss";

type ButtonProps = {
  /**
   * ボタンのスタイルを、以下から選択できます
   * - `fill`: ボタンの背景色が塗りつぶされる
   * - `outline`: ボタンの枠線が表示される
   * - `text`: ボタンの背景色や枠線が表示されない
   */
  variant?: "fill" | "outline" | "text";

  /**
   * ボタンに表示するテキストや要素
   */
  children?: React.ReactNode;

  /**
   * ボタンに適用するクラス名
   */
  className?: string;

  /**
   * ボタンがクリックされたときのイベントハンドラ
   */
  onClick?: () => void;

  /**
   * ボタンが無効化されるかどうか
   */
  disabled?: boolean;
};

// TODO: サイズ指定の引数もあってもよさそう？
const Button = ({
  variant = "fill",
  children,
  className,
  onClick,
  disabled = false,
}: ButtonProps) => {
  const variantClass =
    variant === "fill"
      ? styles.fill
      : variant === "outline"
        ? styles.outline
        : styles.text;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={`${styles.button} ${variantClass} ${className ? className : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
