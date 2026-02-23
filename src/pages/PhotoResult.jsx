import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export function PhotoResult() {
  const navigate = useNavigate()
  const { capturedPhoto, selectedEmployee } = useSelector((state) => state.employees)
  const name = selectedEmployee?.name ?? 'Employee'

  if (!capturedPhoto) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">No photo captured.</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate('/dashboard/list')}>
            Back to list
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Captured Photo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="font-medium">{name}</p>
          <img
            src={capturedPhoto}
            alt="Captured"
            className="max-h-96 w-auto rounded-lg border object-contain"
          />
        </div>
        <Button variant="outline" onClick={() => navigate('/dashboard/list')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to list
        </Button>
      </CardContent>
    </Card>
  )
}
