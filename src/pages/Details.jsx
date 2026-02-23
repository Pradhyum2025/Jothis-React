import { useRef, useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Webcam from 'react-webcam'
import toast from 'react-hot-toast'
import { setSelectedEmployee, setCapturedPhoto } from '@/features/employees/employeeSlice'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { Camera, Loader2 } from 'lucide-react'

export function Details() {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const { employees, selectedEmployee } = useSelector((state) => state.employees)
  const webcamRef = useRef(null)
  const [captureModalOpen, setCaptureModalOpen] = useState(false)
  const [capturedPreview, setCapturedPreview] = useState(null)
  const [cameraReady, setCameraReady] = useState(false)

  const employee =
    selectedEmployee?.id === Number(id)
      ? selectedEmployee
      : employees.find((e) => String(e.id) === id)

  useEffect(() => {
    const fromList = employees.find((e) => String(e.id) === id)
    if (fromList) dispatch(setSelectedEmployee(fromList))
  }, [id, employees, dispatch])

  const handleOpenCaptureModal = () => {
    setCapturedPreview(null)
    setCameraReady(false)
    setCaptureModalOpen(true)
  }

  const handleCloseCaptureModal = () => {
    setCaptureModalOpen(false)
    setCapturedPreview(null)
    setCameraReady(false)
  }

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) setCapturedPreview(imageSrc)
  }, [])

  const usePhoto = useCallback(() => {
    if (capturedPreview && employee) {
      dispatch(setCapturedPhoto(capturedPreview))
      setCaptureModalOpen(false)
      setCapturedPreview(null)
      toast.success('Photo saved')
      navigate('/dashboard/photo')
    }
  }, [capturedPreview, employee, dispatch, navigate])

  const retake = () => {
    setCapturedPreview(null)
  }

  if (!employee) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Employee not found.</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate('/dashboard/list')}>
            Back to list
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Employee Details</CardTitle>
          <CardDescription>Details for {employee.name}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><span className="font-medium">Name:</span> {employee.name}</p>
          <p><span className="font-medium">Position:</span> {employee.position}</p>
          <p><span className="font-medium">City:</span> {employee.city}</p>
          <p><span className="font-medium">Office:</span> {employee.office}</p>
          <p><span className="font-medium">Joining Date:</span> {employee.joiningDate}</p>
          <p><span className="font-medium">Salary:</span> {employee.salary}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Capture Photo</CardTitle>
          <CardDescription>Open the camera in a modal to capture a photo</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleOpenCaptureModal}>
            <Camera className="mr-2 h-4 w-4" />
            Capture Photo
          </Button>
        </CardContent>
      </Card>

      <Dialog open={captureModalOpen} onOpenChange={(open) => !open && handleCloseCaptureModal()}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Capture Photo</DialogTitle>
            <DialogDescription>
              Position yourself and click Capture. Then use the photo or retake.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {capturedPreview ? (
              <div className="space-y-2">
                <p className="text-sm font-medium">Preview</p>
                <img
                  src={capturedPreview}
                  alt="Captured"
                  className="w-full rounded-lg border bg-gray-100 object-contain"
                />
              </div>
            ) : (
              <div className="overflow-hidden rounded-lg border bg-gray-100">
                {!cameraReady && (
                  <div className="flex flex-col items-center justify-center gap-2 py-12">
                    <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
                    <p className="text-sm text-muted-foreground">Initializing camera...</p>
                    <Skeleton className="mt-2 h-48 w-full max-w-sm rounded" />
                  </div>
                )}
                <div className={cameraReady ? 'block' : 'hidden'}>
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    width="100%"
                    videoConstraints={{ facingMode: 'user' }}
                    className="block w-full"
                    onUserMedia={() => setCameraReady(true)}
                  />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            {capturedPreview ? (
              <>
                <Button variant="outline" onClick={retake}>
                  Retake
                </Button>
                <Button onClick={usePhoto}>Use this photo</Button>
              </>
            ) : (
              <Button onClick={capture} disabled={!cameraReady}>
                <Camera className="mr-2 h-4 w-4" />
                Capture
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
