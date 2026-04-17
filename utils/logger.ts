// ============================================
// Structured Logger
// ============================================

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: string;
  data?: unknown;
}

function formatLog(entry: LogEntry): string {
  const { level, message, timestamp, context, data } = entry;
  const prefix = context ? `[${context}]` : "";
  const dataStr = data ? ` | ${JSON.stringify(data)}` : "";
  return `${timestamp} [${level.toUpperCase()}] ${prefix} ${message}${dataStr}`;
}

function createLogEntry(
  level: LogLevel,
  message: string,
  context?: string,
  data?: unknown
): LogEntry {
  return {
    level,
    message,
    timestamp: new Date().toISOString(),
    context,
    data,
  };
}

export const logger = {
  info(message: string, context?: string, data?: unknown) {
    const entry = createLogEntry("info", message, context, data);
    console.log(formatLog(entry));
  },

  warn(message: string, context?: string, data?: unknown) {
    const entry = createLogEntry("warn", message, context, data);
    console.warn(formatLog(entry));
  },

  error(message: string, context?: string, data?: unknown) {
    const entry = createLogEntry("error", message, context, data);
    console.error(formatLog(entry));
  },

  debug(message: string, context?: string, data?: unknown) {
    if (process.env.NODE_ENV === "development") {
      const entry = createLogEntry("debug", message, context, data);
      console.debug(formatLog(entry));
    }
  },

  /**
   * Log an API request
   */
  request(method: string, path: string, statusCode: number, duration?: number) {
    const data = { method, path, statusCode, duration: duration ? `${duration}ms` : undefined };
    this.info(`${method} ${path} → ${statusCode}`, "API", data);
  },

  /**
   * Log an admin action for audit
   */
  admin(adminId: string, action: string, entity: string, entityId?: string) {
    const data = { adminId, action, entity, entityId };
    this.info(`Admin action: ${action} on ${entity}`, "ADMIN", data);
  },
};

export default logger;
