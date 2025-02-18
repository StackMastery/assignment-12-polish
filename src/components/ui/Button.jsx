const Button = ({ variant, children, className, ...props }) => {
  const commonClassBtn = `px-5 py-2 border rounded-xl font-semibold`;

  if (variant === 1 || !variant) {
    return (
      <button
        {...props}
        className={`${commonClassBtn} hover:bg-black dark:hover:bg-white dark:hover:border-white dark:border-white/10 dark:hover:text-color-1 hover:text-white transition-all ${className}`}
      >
        {children}
      </button>
    );
  }
};

export default Button;
