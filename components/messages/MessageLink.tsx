import Link from 'next/link';

function MessageLink({ message }: { message: Messages }) {
  return (
    <Link
      href={`/messages?id=${message.id}`}
      className={`hover:bg-accent block border-b p-4 ${message.resolve ? 'bg-gray-100' : 'bg-white'}`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold">{message.title}</h3>
        {message.resolve && (
          <span className="rounded-full bg-green-200 px-2 py-1 text-xs text-green-800">
            Resolved
          </span>
        )}
      </div>
      <p className="text-sm text-gray-600">From: {message.userName}</p>
      <p className="truncate text-xs text-gray-500">{message.message}</p>
    </Link>
  );
}

export default MessageLink;
