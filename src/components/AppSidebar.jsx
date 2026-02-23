import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  BarChart3,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '@/features/auth/authSlice'

const navItems = [
  { to: '/dashboard/list', label: 'Employee List', icon: Users },
  { to: '/dashboard/chart', label: 'Chart', icon: BarChart3 },
]

export function AppSidebar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <aside className="flex h-full w-56 flex-col border-r bg-indigo-600 text-white">
      <div className="flex h-14 items-center gap-2 border-b border-indigo-500 px-4">
        <LayoutDashboard className="h-6 w-6" />
        <span className="font-semibold">Employee Insights</span>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-indigo-500 text-white'
                  : 'text-white/90 hover:bg-indigo-700 hover:text-white'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <Separator className="bg-indigo-500" />
      <div className="p-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-white hover:bg-indigo-700 hover:text-white"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Button>
      </div>
    </aside>
  )
}
