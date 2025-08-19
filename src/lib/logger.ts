import loggerConfig from "@/config/loggerConfig"
import { LogArg } from "@/types/common/LogArgs"
type LogLevel = "debug" | "info" | "warn" | "error"

const levelPriority: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

function shouldLog(level: LogLevel): boolean {
  if (!loggerConfig.enabled) return false
  return levelPriority[level] >= levelPriority[loggerConfig.level as LogLevel]
}

export const logger = {
  debug: (...args: LogArg[]) => shouldLog("debug") && console.debug(...args),
  info: (...args: LogArg[]) => shouldLog("info") && console.info(...args),
  warn: (...args: LogArg[]) => shouldLog("warn") && console.warn(...args),
  error: (...args: LogArg[]) => shouldLog("error") && console.error(...args),
}
