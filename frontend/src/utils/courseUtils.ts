import type { Module } from "@/types"

export function calculateProgress(modules: Module[]): number {
  if (modules.length === 0) return 0
  const completedCount = modules.filter((m) => m.completed).length
  return Math.round((completedCount / modules.length) * 100)
}

export function getNextIncompleteModule(modules: Module[]): Module | null {
  const sortedModules = modules.sort((a, b) => a.order - b.order)
  return sortedModules.find((module) => !module.completed) || null
}

export function canCompleteModule(modules: Module[], targetModuleId: string): boolean {
  const sortedModules = modules.sort((a, b) => a.order - b.order)
  const targetIndex = sortedModules.findIndex((m) => m.id === targetModuleId)

  if (targetIndex === -1) return false
  if (targetIndex === 0) return true // First module can always be completed

  // Check if all previous modules are completed
  for (let i = 0; i < targetIndex; i++) {
    if (!sortedModules[i].completed) {
      return false
    }
  }

  return true
}
