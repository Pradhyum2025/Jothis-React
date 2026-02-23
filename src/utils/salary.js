/**
 * Parse salary string (e.g. "$320,800") to number
 * @param {string} salaryStr
 * @returns {number}
 */
export function parseSalary(salaryStr) {
  if (salaryStr == null || typeof salaryStr !== 'string') return 0
  const cleaned = salaryStr.replace(/[$,]/g, '')
  return Number(cleaned) || 0
}
