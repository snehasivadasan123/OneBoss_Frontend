import { AlertTriangle } from "lucide-react";

type Props = {
  title: string;
  message: string;
  onRetry?: () => void;
};

export default function ErrorState({ title, message, onRetry }: Props) {
  return (
    <div className="flex items-center justify-center h-[70vh]">
      <div className="flex flex-col items-center justify-center w-full max-w-md px-6 py-8 text-center rounded-2xl border border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-900 shadow-sm">
        <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />

        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {title}
        </h2>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {message}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium shadow hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
