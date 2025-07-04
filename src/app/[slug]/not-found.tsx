"use client";

import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Large 404 */}
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-gray-200 mb-2">404</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-pink-500 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or may have been
            moved. It might be a page that hasn&apos;t been published yet in our
            CMS.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Homepage
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>

        {/* Suggestion */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Search className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-800 font-medium">
              Looking for something specific?
            </span>
          </div>
          <p className="text-blue-700 text-sm">
            Try navigating through our main menu or contact us if you can&apos;t
            find what you&apos;re looking for.
          </p>
        </div>
      </div>
    </div>
  );
}
