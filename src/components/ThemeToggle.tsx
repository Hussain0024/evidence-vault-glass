
import { useTheme } from './ThemeProvider';
import { Button } from './ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="glass-button"
    >
      <div className="relative w-5 h-5">
        <div
          className={`absolute inset-0 transition-transform duration-500 ${
            theme === 'dark' ? 'rotate-0' : 'rotate-90'
          }`}
        >
          🌙
        </div>
        <div
          className={`absolute inset-0 transition-transform duration-500 ${
            theme === 'light' ? 'rotate-0' : '-rotate-90'
          }`}
        >
          ☀️
        </div>
      </div>
    </Button>
  );
}
