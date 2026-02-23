import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  setEmployees,
  setSelectedEmployee,
  setEmployeesLoading,
  setEmployeesError,
} from '@/features/employees/employeeSlice'
import { fetchEmployeeData, FALLBACK_EMPLOYEES } from '@/services/api'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader2, AlertCircle, ChevronLeft, ChevronRight, Search, Users } from 'lucide-react'

const PAGE_SIZE = 10

export function List() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { employees, loading, error } = useSelector((state) => state.employees)
  const [usedFallback, setUsedFallback] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')

  const loadData = useCallback(async () => {
    dispatch(setEmployeesLoading(true))
    dispatch(setEmployeesError(null))
    setUsedFallback(false)
    try {
      const data = await fetchEmployeeData()
      dispatch(setEmployees(data))
      // toast.success('Employees loaded')
    } catch (err) {
      const message = err.message || 'Failed to load employees'
      dispatch(setEmployeesError(message))
      dispatch(setEmployees(FALLBACK_EMPLOYEES))
      setUsedFallback(true)
      toast.error(message)
    } finally {
      dispatch(setEmployeesLoading(false))
    }
  }, [dispatch])

  useEffect(() => {
    loadData()
  }, [loadData])

  const filteredEmployees = search.trim()
    ? employees.filter(
        (emp) =>
          emp.name?.toLowerCase().includes(search.toLowerCase()) ||
          emp.position?.toLowerCase().includes(search.toLowerCase()) ||
          emp.city?.toLowerCase().includes(search.toLowerCase())
      )
    : employees

  const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / PAGE_SIZE))
  useEffect(() => {
    setCurrentPage((p) => Math.min(p, totalPages))
  }, [totalPages])

  const handleRowClick = (employee) => {
    dispatch(setSelectedEmployee(employee))
    navigate(`/dashboard/details/${employee.id}`)
  }

  const startIndex = (currentPage - 1) * PAGE_SIZE
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + PAGE_SIZE)

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Could not load real data</AlertTitle>
          <AlertDescription>
            <span className="block">{error}</span>
            {usedFallback && (
              <span className="mt-2 block">
                You are seeing sample data (5 rows) because the server could not be reached. Run the app with <code className="rounded bg-black/10 px-1 py-0.5 text-xs">npm run dev</code> so the API proxy is used and real employee data loads.
              </span>
            )}
            <Button variant="outline" size="sm" className="mt-3" onClick={loadData}>
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Employee List</CardTitle>
          <CardDescription>Click a row to view details</CardDescription>
          <div className="pt-2">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, position, or city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              <div className="overflow-x-auto rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>Office ID</TableHead>
                      <TableHead>Joining Date</TableHead>
                      <TableHead>Salary</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-28" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-14" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : filteredEmployees.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
              <Users className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No employees found</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                {search.trim()
                  ? 'Try a different search term.'
                  : 'There are no employees to display yet.'}
              </p>
              {search.trim() && (
                <Button variant="outline" className="mt-4" onClick={() => setSearch('')}>
                  Clear search
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>Office ID</TableHead>
                      <TableHead>Joining Date</TableHead>
                      <TableHead>Salary</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedEmployees.map((emp) => (
                      <TableRow
                        key={emp.id}
                        className="cursor-pointer hover:bg-indigo-50"
                        onClick={() => handleRowClick(emp)}
                      >
                        <TableCell className="font-medium">{emp.name}</TableCell>
                        <TableCell>{emp.position}</TableCell>
                        <TableCell>{emp.city}</TableCell>
                        <TableCell>{emp.office}</TableCell>
                        <TableCell>{emp.joiningDate}</TableCell>
                        <TableCell>{emp.salary}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {filteredEmployees.length > PAGE_SIZE && (
                <div className="mt-4 flex items-center justify-between border-t pt-4">
                  <p className="text-sm text-muted-foreground">
                    Showing {startIndex + 1}-{Math.min(startIndex + PAGE_SIZE, filteredEmployees.length)} of {filteredEmployees.length}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage <= 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <span className="text-sm font-medium">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage >= totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
