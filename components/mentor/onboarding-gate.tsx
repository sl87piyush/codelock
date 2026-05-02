"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useOnboarding } from "@/lib/use-onboarding"

/**
 * Watches first-paint onboarding state and redirects users on protected
 * routes to the cinematic intro the very first time. After
 * `onboardingCompleted` flips to true, the gate is silent.
 *
 * Routes that are always allowed (do not trigger redirect):
 *   - /onboarding/*
 *   - /mentor (so a user can still revisit)
 */
export function OnboardingGate() {
  const router = useRouter()
  const pathname = usePathname()
  const { status } = useOnboarding()

  useEffect(() => {
    if (status === "loading") return
    if (status === "returning") return
    if (!pathname) return

    // Do not redirect while already inside the onboarding flow.
    if (pathname.startsWith("/onboarding")) return
    // Only force redirect from the dashboard root — every other route lets
    // the user keep browsing the app even before onboarding.
    if (pathname !== "/") return

    router.replace("/onboarding/intro")
  }, [status, pathname, router])

  return null
}
