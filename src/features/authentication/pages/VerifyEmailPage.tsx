import Layout from "@/layouts/Layout";
import api from "@/core/api/ApiService";
import { Button } from "@/shared/components/form/Button";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

type Status = "loading" | "success" | "error";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<Status>("loading");

  const token = searchParams.get("token");

  useEffect(() => {
    async function verifyToken() {
      if (!token) {
        setStatus("error");
        return;
      }

      try {
        await api.get("/auth/verify-email", {
          params: { token }, // ✅ FIXED
        });
        setStatus("success");
      } catch (error) {
        setStatus("error");
      }
    }

    verifyToken();
  }, [token]);

  return (
    <Layout>
      <div className="flex items-center justify-center flex-1 relative p-3 md:p-0">
        {status === "loading" && <LoadingVerification />}
        {status === "success" && <SuccessVerification />}
        {status === "error" && <VerificationExpired />}
      </div>
    </Layout>
  );
}

function LoadingVerification() {
  return (
    <div className="w-60 md:w-96 lg:w-md p-5 md:p-7 lg:p-9 border h-fit shadow rounded bg-gray-100 dark:bg-slate-800 text-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-5"></div>
      <h1 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
        Verifying your account...
      </h1>
      <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
        Please wait while we confirm your email.
      </p>
    </div>
  );
}

function SuccessVerification() {
  return (
    <div className="w-60 md:w-96 lg:w-md p-5 md:p-7 lg:p-9 border h-fit shadow rounded bg-gray-100 dark:bg-slate-800">
      <ShieldCheckIcon className="size-12 md:size-14 mx-auto text-green-600 mb-5" />

      <h1 className="text-xl md:text-2xl text-center lg:text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Account Verified
      </h1>

      <p className="text-center text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-300 mb-5">
        Welcome to the Collective, your account is now active and ready for your
        first story.
      </p>

      <Link to="/dashboard">
        <Button className="flex items-center justify-center gap-2 w-full rounded">
          <span className="text-sm md:text-base text-gray-100">
            Go to Dashboard
          </span>
          <ArrowRightIcon className="text-gray-100 size-4" />
        </Button>
      </Link>
    </div>
  );
}

function VerificationExpired() {
  return (
    <div className="w-60 md:w-96 lg:w-md p-5 md:p-7 lg:p-9 border h-fit shadow rounded bg-red-50 dark:bg-red-900/20">
      <ExclamationTriangleIcon className="size-12 md:size-14 mx-auto text-red-600 mb-5" />

      <h1 className="text-xl md:text-2xl text-center lg:text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Verification Link Expired
      </h1>

      <p className="text-center text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-300 mb-5">
        The verification link may have expired or already been used. These links
        are only valid for a limited time for security reasons.
      </p>

      <Link to="/">
        <Button
          variant="danger"
          className="flex items-center justify-center gap-2 w-full rounded"
        >
          <ArrowLeftIcon className="text-gray-100 size-4" />
          <span className="text-sm md:text-base text-gray-100">
            Go to Homepage
          </span>
        </Button>
      </Link>
    </div>
  );
}
