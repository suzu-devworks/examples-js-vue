export interface MemberValues {
  name: string
  quantity: number | ''
}

export interface FormValues {
  name: string
  age: number | ''
  agree: boolean
  startDate: string
  endDate: string
  email: string
  address: {
    postalCode: string
    city: string
  }
  members: MemberValues[]
}

export const initialValues: FormValues = {
  name: '',
  age: '',
  agree: false,
  startDate: '',
  endDate: '',
  email: '',
  address: { postalCode: '', city: '' },
  members: [{ name: '', quantity: 1 }],
}
