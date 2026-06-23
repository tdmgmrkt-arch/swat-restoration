import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { categoryParent, type ServiceConfig } from "@/lib/services-config"

export default function ServiceBreadcrumb({ cfg }: { cfg: ServiceConfig }) {
  const parent = categoryParent(cfg.href)

  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-white border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-3">
        <ol
          className="flex items-center gap-1.5 text-xs text-gray-500 flex-wrap"
          role="list"
        >
          <li>
            <Link
              href="/"
              className="hover:text-gray-900 transition-colors font-medium"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3 w-3 text-red-500" />
          </li>
          {parent && (
            <>
              <li>
                <Link
                  href={parent.href}
                  className="hover:text-gray-900 transition-colors font-medium"
                >
                  {parent.name}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3 w-3 text-red-500" />
              </li>
            </>
          )}
          <li>
            <span className="text-gray-900 font-semibold" aria-current="page">
              {cfg.name}
            </span>
          </li>
        </ol>
      </div>
    </nav>
  )
}
