import '@src/SidePanel.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { ErrorDisplay, LoadingSpinner } from '@extension/ui';

const SidePanel = () => {
  // The URL where your Next.js writeflow-chat app is running
  // Default to localhost:3000 for development
  const NEXT_APP_URL = import.meta.env?.CEB_NEXT_APP_URL || 'http://localhost:3000';

  return (
    <div style={{ width: '100%', height: '100vh', margin: 0, padding: 0, overflow: 'hidden' }}>
      <iframe
        src={NEXT_APP_URL}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
        }}
        title="WriteFlow Chat"
        allow="clipboard-read; clipboard-write"
      />
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <LoadingSpinner />), ErrorDisplay);
