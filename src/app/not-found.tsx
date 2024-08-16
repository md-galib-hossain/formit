import React from 'react';
import notfoundimg from './../assets/notfound2.svg';
import Image from 'next/image';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-4/5 mb-3">
        <Image src={notfoundimg} alt="not found" layout="responsive" />
      </div>
      <h4 className="text-2xl font-bold">Page is under construction</h4>
      <Link href="/" className="text-primary hover:underline mt-3">
        Go Back
      </Link>
    </div>
  );
}

export default NotFoundPage;
