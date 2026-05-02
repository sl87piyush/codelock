"use client"

import { useCallback, useEffect, useState } from "react"
import type { MentorId, OnboardingAnswers, PersonalJourney } from "./mentor-data"

const STORAGE_KEY = "codetrackx:onboarding-v1"

export type OnboardingState = {
  onboardingCompleted: boolean
  mentorId: MentorId | null
  answers: OnboardingAnswers
  journey: PersonalJourney | null
  /** ISO timestamp of completion. */
  completedAt: string | null
}

const DEFAULT_STATE: OnboardingState = {
  onboardingCompleted: false,
  mentorId: null,
  answers: {},
  journey: null,
  completedAt: null,
}

function readState(): OnboardingState {
  if (typeof window === "undefined") return DEFAULT_STATE
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_STATE
    const parsed = JSON.parse(raw) as Partial<OnboardingState>
    return { ...DEFAULT_STATE, ...parsed }
  } catch {
    return DEFAULT_STATE
  }
}

function writeState(next: OnboardingState) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    // Notify other listeners in the same tab.
    window.dispatchEvent(new CustomEvent("codetrackx:onboarding-changed"))
  } catch {
    // ignore quota / private mode errors
  }
}

/**
 * Tri-state for the initial onboarding check:
 *  - "loading"   → we haven't read localStorage yet (SSR or first paint)
 *  - "first"     → no record found, user has never onboarded
 *  - "returning" → onboardingCompleted is true
 */
export type OnboardingStatus = "loading" | "first" | "returning"

export function useOnboarding() {
  const [state, setState] = useState<OnboardingState>(DEFAULT_STATE)
  const [status, setStatus] = useState<OnboardingStatus>("loading")

  useEffect(() => {
    const sync = () => {
      const fresh = readState()
      setState(fresh)
      setStatus(fresh.onboardingCompleted ? "returning" : "first")
    }
    sync()
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) sync()
    }
    window.addEventListener("storage", onStorage)
    window.addEventListener("codetrackx:onboarding-changed", sync as EventListener)
    return () => {
      window.removeEventListener("storage", onStorage)
      window.removeEventListener("codetrackx:onboarding-changed", sync as EventListener)
    }
  }, [])

  const setMentor = useCallback((mentorId: MentorId) => {
    const next = { ...readState(), mentorId }
    writeState(next)
    setState(next)
  }, [])

  const setAnswers = useCallback((answers: OnboardingAnswers) => {
    const current = readState()
    const next = { ...current, answers: { ...current.answers, ...answers } }
    writeState(next)
    setState(next)
  }, [])

  const setJourney = useCallback((journey: PersonalJourney) => {
    const next = { ...readState(), journey }
    writeState(next)
    setState(next)
  }, [])

  const completeOnboarding = useCallback((journey: PersonalJourney) => {
    const next: OnboardingState = {
      ...readState(),
      journey,
      mentorId: journey.mentorId,
      onboardingCompleted: true,
      completedAt: new Date().toISOString(),
    }
    writeState(next)
    setState(next)
    setStatus("returning")
  }, [])

  const reset = useCallback(() => {
    writeState(DEFAULT_STATE)
    setState(DEFAULT_STATE)
    setStatus("first")
  }, [])

  const changeMentor = useCallback((mentorId: MentorId) => {
    const current = readState()
    const next = {
      ...current,
      mentorId,
      journey: current.journey ? { ...current.journey, mentorId } : current.journey,
    }
    writeState(next)
    setState(next)
  }, [])

  return {
    status,
    state,
    setMentor,
    setAnswers,
    setJourney,
    completeOnboarding,
    changeMentor,
    reset,
  }
}
