import { Suspense } from "react"
import PaymentSuccessContent from "./PageContent"

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="flex h-[100%] flex-col items-center justify-center">
  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#E5A000]"></div>
  <p className="mt-2 text-gray-700">Loading...</p>
  </div>}>
      <PaymentSuccessContent />
    </Suspense>
  )
}
