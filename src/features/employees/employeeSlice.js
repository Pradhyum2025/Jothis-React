import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  employees: [],
  selectedEmployee: null,
  capturedPhoto: null,
  loading: false,
  error: null,
}

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload
      state.error = null
    },
    setEmployeesLoading: (state, action) => {
      state.loading = action.payload
      if (action.payload) state.error = null
    },
    setEmployeesError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    setSelectedEmployee: (state, action) => {
      state.selectedEmployee = action.payload
    },
    setCapturedPhoto: (state, action) => {
      state.capturedPhoto = action.payload
    },
    clearCapturedPhoto: (state) => {
      state.capturedPhoto = null
    },
  },
})

export const {
  setEmployees,
  setEmployeesLoading,
  setEmployeesError,
  setSelectedEmployee,
  setCapturedPhoto,
  clearCapturedPhoto,
} = employeeSlice.actions
export default employeeSlice.reducer
