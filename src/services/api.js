import axios from 'axios'

// In dev, always use proxy path so the API is reached (avoids CORS). Real data loads when you run: npm run dev
const defaultBaseURL = 'https://backend.jotish.in/backend_dev'
const baseURL = import.meta.env.DEV
  ? '/backend_dev'
  : (import.meta.env.VITE_API_BASE_URL || defaultBaseURL)

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Fetch employee table data from API
 */
export async function fetchEmployeeData() {
  const { data } = await api.post('/gettabledata.php', {
    username: 'test',
    password: '123456',
  })
  const rows = data?.TABLE_DATA?.data ?? []
  return rows.map((row, index) => ({
    id: index + 1,
    name: row[0] ?? '',
    position: row[1] ?? '',
    city: row[2] ?? '',
    office: row[3] ?? '',
    joiningDate: row[4] ?? '',
    salary: row[5] ?? '',
  }))
}

export const FALLBACK_EMPLOYEES = [
  { id: 1, name: 'Tiger Nixon', position: 'System Architect', city: 'Edinburgh', office: '5421', joiningDate: '2011/04/25', salary: '$320,800' },
  { id: 2, name: 'Garrett Winters', position: 'Accountant', city: 'Tokyo', office: '8422', joiningDate: '2011/07/25', salary: '$170,750' },
  { id: 3, name: 'Ashton Cox', position: 'Junior Technical Author', city: 'San Francisco', office: '1562', joiningDate: '2009/01/12', salary: '$86,000' },
  { id: 4, name: 'Cedric Kelly', position: 'Senior Javascript Developer', city: 'Edinburgh', office: '6224', joiningDate: '2012/03/29', salary: '$433,060' },
  { id: 5, name: 'Airi Satou', position: 'Accountant', city: 'Tokyo', office: '5407', joiningDate: '2008/11/28', salary: '$162,700' },
]

export default api
