
import { Button } from '@/components/ui/button';

export function SkipLinks() {
  const handleSkipToMain = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView();
    }
  };

  const handleSkipToNav = () => {
    const navigation = document.querySelector('[role="navigation"]');
    if (navigation) {
      (navigation as HTMLElement).focus();
      navigation.scrollIntoView();
    }
  };

  return (
    <div className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-4 focus-within:left-4 focus-within:z-50">
      <div className="flex space-x-2">
        <Button
          onClick={handleSkipToMain}
          className="bg-blue-600 text-white px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"
          onFocus={(e) => e.target.classList.remove('sr-only')}
          onBlur={(e) => e.target.classList.add('sr-only')}
        >
          Skip to main content
        </Button>
        <Button
          onClick={handleSkipToNav}
          className="bg-blue-600 text-white px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"
          onFocus={(e) => e.target.classList.remove('sr-only')}
          onBlur={(e) => e.target.classList.add('sr-only')}
        >
          Skip to navigation
        </Button>
      </div>
    </div>
  );
}
