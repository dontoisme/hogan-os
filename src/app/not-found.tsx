'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function NotFound() {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0000aa] text-white font-mono flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        {/* Error Header */}
        <div className="bg-[#aaaaaa] text-[#0000aa] px-2 py-1 mb-8 inline-block">
          Don Hogan Portfolio
        </div>

        {/* Error Content */}
        <div className="space-y-6 text-sm leading-relaxed">
          <p>
            A fatal exception 0E has occurred at 0028:C0011E36 in VXD VMM(01) +
            00010E36. The current application will be terminated.
          </p>

          <p>
            * &nbsp;The page you are looking for does not exist or has been moved.
          </p>

          <p>
            * &nbsp;Press any link to return to the desktop, or
            <br />
            * &nbsp;Press CTRL+ALT+DEL to restart your browsing session.
            <br />
            &nbsp;&nbsp;&nbsp;You will lose any unsaved confusion about this website.
          </p>

          <p className="mt-8">
            Press any link to continue _{showCursor && <span className="bg-white text-[#0000aa]">&nbsp;</span>}
          </p>

          {/* Action Links */}
          <div className="mt-8 space-y-2">
            <Link
              href="/"
              className="block text-[#ffff55] hover:underline"
            >
              → Return to Desktop
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-xs text-[#aaaaaa]">
          <p>Error Code: 404_PAGE_NOT_FOUND</p>
          <p>System halted. Just kidding, this is a portfolio website.</p>
        </div>
      </div>
    </div>
  );
}
