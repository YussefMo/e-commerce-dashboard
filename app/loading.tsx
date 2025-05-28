import { Ring } from 'ldrs/react';
import 'ldrs/react/Ring.css';

function Loading() {
  return (
    <div className="flex min-h-full w-full items-center justify-center">
      <Ring size="40" stroke="5" bgOpacity="0" speed="2" color="#5f3bb5" />
    </div>
  );
}

export default Loading;
