export type Address = {
  street: string
  city: string
  country: string
}

export type Orders = {
  productName: string
  price: number
  quantity: number
}

export type Users = {
  userId: string
  username: string
  password: string
  fullName: {
    firstName: string
    lastName: string
  }
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: Address
  orders: Orders[]
}
