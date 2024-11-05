export interface Payment {
  transferSettings: {
    creditor: string
    iban: string
    prefix: string
    type: string
  }
  provider: string | null
  method: string
  freeContribution: string | null
  settlement: string | null
  ibanName: string | null
  iban: string | null
  balanceItemPayments: BalanceItemPayment[]
  updatedAt: number
  createdAt: number
  paidAt: number
  transferDescription: string
  price: number
  status: string
  id: string
}

export interface BalanceItemPayment {
  balanceItem: {
    order: {
      webshopId: string
      status: string
      updatedAt: number
      validAt: number
      createdAt: number
      payment: string | null
      data: OrderData
      number: number
      id: string
    }
    member: string | null
    registration: string | null
    status: string
    createdAt: number
    pricePaid: number
    price: number
    description: string
    id: string
  }
  price: number
  id: string
}

export interface OrderData {
  comments: string
  paymentMethod: string
  reservedOrder: boolean
  reservedPersons: number
  consumerLanguage: string
  fieldAnswers: FieldAnswer[]
  customer: Customer
  cart: Cart
  recordAnswers: RecordAnswer[]
  address: string | null
  checkoutMethod: string | null
  timeSlot: string | null
}

export type FieldAnswer = unknown

export interface Customer {
  phone: string
  email: string
  lastName: string
  firstName: string
}

export interface Cart {
  items: CartItem[]
}

export type RecordAnswer = unknown

export interface CartItem {
  reservedAmount: number
  unitPrice: number
  id: string
  fieldAnswers: FieldAnswer[]
  amount: number
  options: Option[]
  productPrice: ProductPrice
  product: Product
}

export interface Option {
  optionMenu: OptionMenu
  option: {
    price: number
    name: string
    id: string
  }
}

export interface OptionMenu {
  options: {
    price: number
    name: string
    id: string
  }[]
  multipleChoice: boolean
  name: string
  id: string
}

export interface ProductPrice {
  discountAmount: number
  discountPrice: string | null
  price: number
  name: string
  id: string
}

export interface Product {
  unique: boolean
  allowMultiple: boolean
  disableAfter: string | null
  enableAfter: string | null
  hidden: boolean
  maxPerOrder: number | null
  dateRange: string | null
  location: string | null
  customFields: CustomField[]
  optionMenus: OptionMenu[]
  prices: ProductPrice[]
  usedStock: number
  stock: number | null
  askName: boolean
  type: string
  images: Image[]
  enabled: boolean
  description: string
  name: string
  id: string
}

export type CustomField = unknown

export interface Image {
  resolutions: Resolution[]
  source: {
    id: string
    server: string
    path: string
    size: number
    name: string | null
  }
  id: string
}

export interface Resolution {
  file: {
    id: string
    server: string
    path: string
    size: number
    name: string | null
  }
  width: number
  height: number
}
