export type ButtonProps = React.ComponentProps<"button">;

export const Button: React.FC<ButtonProps> = ({ type = "button", ...props }) => <button type={type} {...props} />;
