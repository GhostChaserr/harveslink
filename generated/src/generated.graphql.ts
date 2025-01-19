import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type Account = {
  __typename?: 'Account';
  accountType: AccountType;
  address?: Maybe<Scalars['String']>;
  avatar: Scalars['String'];
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['String'];
  languages?: Maybe<Array<Scalars['String']>>;
  locationLat?: Maybe<Scalars['Float']>;
  locationLon?: Maybe<Scalars['Float']>;
  password: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  ratingAverage: Scalars['Float'];
  reviewsCount: Scalars['Float'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** Different types of accounts */
export enum AccountType {
  Admin = 'ADMIN',
  Charity = 'CHARITY',
  Consumer = 'CONSUMER',
  Farmer = 'FARMER',
  Restaurant = 'RESTAURANT',
}

export type Auction = {
  __typename?: 'Auction';
  account: Account;
  bids?: Maybe<Array<Bid>>;
  createdAt: Scalars['DateTime'];
  currentBid?: Maybe<Scalars['Float']>;
  endDate: Scalars['DateTime'];
  id: Scalars['String'];
  minBid: Scalars['Float'];
  product: Product;
  startDate: Scalars['DateTime'];
  status: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

/** Different types of auction types */
export enum AuctionStatusEnum {
  Bidding = 'BIDDING',
  Closed = 'CLOSED',
  Pending = 'PENDING',
  Started = 'STARTED',
  Timeout = 'TIMEOUT',
}

export type AuthPayload = {
  __typename?: 'AuthPayload';
  accessToken: Scalars['String'];
  accountType: Scalars['String'];
};

export type Bid = {
  __typename?: 'Bid';
  account?: Maybe<Account>;
  amount: Scalars['Float'];
  auction?: Maybe<Auction>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
};

export type Branch = {
  __typename?: 'Branch';
  address: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  cover: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  locationLat?: Maybe<Scalars['Float']>;
  locationLon?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Category = {
  __typename?: 'Category';
  category: CategoryEnum;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

/** Different types of categories */
export enum CategoryEnum {
  BakedGoods = 'BAKED_GOODS',
  Beverages = 'BEVERAGES',
  Dairy = 'DAIRY',
  Eggs = 'EGGS',
  Fruits = 'FRUITS',
  Grains = 'GRAINS',
  HerbsSpices = 'HERBS_SPICES',
  Legumes = 'LEGUMES',
  Meat = 'MEAT',
  Nuts = 'NUTS',
  Other = 'OTHER',
  Processed = 'PROCESSED',
  Seafood = 'SEAFOOD',
  Seeds = 'SEEDS',
  Vegetables = 'VEGETABLES',
}

export type CreateAccountInput = {
  accountType?: AccountType;
  address?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  fullName: Scalars['String'];
  languages?: InputMaybe<Array<Scalars['String']>>;
  locationLat?: InputMaybe<Scalars['Float']>;
  locationLon?: InputMaybe<Scalars['Float']>;
  otp: Scalars['Float'];
  password?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  ratingAverage?: Scalars['Float'];
  reviewsCount?: Scalars['Int'];
};

export type CreateAuctionInput = {
  endDate: Scalars['DateTime'];
  minBid: Scalars['Float'];
  productId: Scalars['String'];
  startDate: Scalars['DateTime'];
  status: AuctionStatusEnum;
};

export type CreateBranchInput = {
  address: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  locationLat?: InputMaybe<Scalars['Float']>;
  locationLon?: InputMaybe<Scalars['Float']>;
  name: Scalars['String'];
};

export type CreateCategoryInput = {
  category: CategoryEnum;
};

export type CreateFarmerAccountInput = {
  accountType?: InputMaybe<AccountType>;
  address: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  email?: InputMaybe<Scalars['String']>;
  fullName: Scalars['String'];
  languages: Array<Scalars['String']>;
  locationLat?: InputMaybe<Scalars['Float']>;
  locationLon?: InputMaybe<Scalars['Float']>;
  otp: Scalars['Float'];
  password?: InputMaybe<Scalars['String']>;
  phone: Scalars['String'];
  ratingAverage?: InputMaybe<Scalars['Float']>;
  reviewsCount?: InputMaybe<Scalars['Int']>;
};

export type CreateProductFilterInput = {
  address?: InputMaybe<Scalars['String']>;
  branchId?: InputMaybe<Scalars['String']>;
  categoryId?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  expiryDate?: InputMaybe<Scalars['DateTime']>;
  expiryDateGte?: InputMaybe<Scalars['DateTime']>;
  expiryDateLte?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
  priceGte?: InputMaybe<Scalars['Float']>;
  priceLte?: InputMaybe<Scalars['Float']>;
  productName?: InputMaybe<Scalars['String']>;
  quantityAvailable?: InputMaybe<Scalars['Float']>;
  quantityAvailableGte?: InputMaybe<Scalars['Float']>;
  quantityAvailableLte?: InputMaybe<Scalars['Float']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  unitId?: InputMaybe<Scalars['String']>;
};

export type CreateProductInput = {
  address?: InputMaybe<Scalars['String']>;
  branchId?: InputMaybe<Scalars['String']>;
  categoryId: Scalars['String'];
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  description: Scalars['String'];
  expiryDate: Scalars['DateTime'];
  price: Scalars['Float'];
  productName: Scalars['String'];
  quantityAvailable: Scalars['Float'];
  startDate: Scalars['DateTime'];
  unitId: Scalars['String'];
};

export type CreateUnitInput = {
  name: UnitEnum;
};

export type InputCreateProductsReservaton = {
  accountId: Scalars['String'];
  products: Array<ProductToReserve>;
};

export type Mutation = {
  __typename?: 'Mutation';
  checkAccount: Scalars['Boolean'];
  createAccount: Account;
  createAuction: Auction;
  createBranch: Branch;
  createCategory: Product;
  createFarmerAccount: AuthPayload;
  createProduct: Product;
  createProductReservationRequest: Scalars['String'];
  createUnit: Unit;
  generateOtp: Scalars['Boolean'];
  signIn: AuthPayload;
  signUp: AuthPayload;
};

export type MutationCheckAccountArgs = {
  phone: Scalars['String'];
};

export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};

export type MutationCreateAuctionArgs = {
  input: CreateAuctionInput;
};

export type MutationCreateBranchArgs = {
  input: CreateBranchInput;
};

export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};

export type MutationCreateFarmerAccountArgs = {
  input: CreateFarmerAccountInput;
};

export type MutationCreateProductArgs = {
  input: CreateProductInput;
};

export type MutationCreateProductReservationRequestArgs = {
  input: InputCreateProductsReservaton;
};

export type MutationCreateUnitArgs = {
  input: CreateUnitInput;
};

export type MutationGenerateOtpArgs = {
  phone: Scalars['String'];
};

export type MutationSignInArgs = {
  code: Scalars['Float'];
  phone: Scalars['String'];
};

export type MutationSignUpArgs = {
  code: Scalars['Float'];
  input: CreateAccountInput;
};

export type PaginatedProducts = {
  __typename?: 'PaginatedProducts';
  items: Array<Product>;
  meta: PaginationMeta;
};

export type PaginationMeta = {
  __typename?: 'PaginationMeta';
  currentPage: Scalars['Float'];
  itemCount: Scalars['Float'];
  itemsPerPage: Scalars['Float'];
  totalItems: Scalars['Float'];
  totalPages: Scalars['Float'];
};

export type Product = {
  __typename?: 'Product';
  account?: Maybe<Account>;
  address?: Maybe<Scalars['String']>;
  auction?: Maybe<Auction>;
  branch?: Maybe<Branch>;
  category?: Maybe<Category>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  currency: Scalars['String'];
  description: Scalars['String'];
  expiryDate: Scalars['DateTime'];
  gallery?: Maybe<Scalars['JSON']>;
  id: Scalars['String'];
  price: Scalars['Float'];
  productName: Scalars['String'];
  quantityAvailable: Scalars['Float'];
  reservations?: Maybe<Array<Reservation>>;
  startDate: Scalars['DateTime'];
  status: Scalars['String'];
  unit?: Maybe<Unit>;
  updatedAt: Scalars['DateTime'];
};

export type ProductToReserve = {
  count: Scalars['Float'];
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  branches: Array<Branch>;
  categories: Array<Category>;
  products: PaginatedProducts;
  reservations: Array<Reservation>;
  session: Session;
  units: Array<Unit>;
};

export type QueryProductsArgs = {
  filter?: InputMaybe<CreateProductFilterInput>;
  limit: Scalars['Float'];
  page: Scalars['Float'];
};

export type QueryReservationsArgs = {
  productId: Scalars['String'];
};

export type Reservation = {
  __typename?: 'Reservation';
  account: Account;
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  productUsageDetails?: Maybe<Scalars['JSON']>;
  products: Array<Product>;
  status: ReservationStatusEnum;
};

/** Different types of reservation status enums */
export enum ReservationStatusEnum {
  Accepted = 'ACCEPTED',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
}

export type Session = {
  __typename?: 'Session';
  accountType: AccountType;
  createdAt: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  fullName: Scalars['String'];
  id: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  profile: Scalars['String'];
};

export type Unit = {
  __typename?: 'Unit';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  name: UnitEnum;
  updatedAt: Scalars['DateTime'];
};

/** Different types of units */
export enum UnitEnum {
  Bag = 'BAG',
  Box = 'BOX',
  Bunch = 'BUNCH',
  Bushel = 'BUSHEL',
  Crate = 'CRATE',
  Dozen = 'DOZEN',
  Gram = 'GRAM',
  Kg = 'KG',
  Liter = 'LITER',
  Milliliter = 'MILLILITER',
  Other = 'OTHER',
  Ounce = 'OUNCE',
  Pack = 'PACK',
  Pound = 'POUND',
  Tray = 'TRAY',
  Unit = 'UNIT',
}

export type GetBranchesQueryVariables = Exact<{ [key: string]: never }>;

export type GetBranchesQuery = {
  __typename?: 'Query';
  branches: Array<{
    __typename?: 'Branch';
    id: string;
    country: string;
    city: string;
    address: string;
    name: string;
    cover: string;
    locationLat?: number | null;
    locationLon?: number | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  }>;
};

export type GetUnitsQueryVariables = Exact<{ [key: string]: never }>;

export type GetUnitsQuery = {
  __typename?: 'Query';
  units: Array<{ __typename?: 'Unit'; id: string; name: UnitEnum }>;
};

export type SignInMutationVariables = Exact<{
  phone: Scalars['String'];
  code: Scalars['Float'];
}>;

export type SignInMutation = {
  __typename?: 'Mutation';
  signIn: {
    __typename?: 'AuthPayload';
    accessToken: string;
    accountType: string;
  };
};

export type GenerateOtpMutationVariables = Exact<{
  phone: Scalars['String'];
}>;

export type GenerateOtpMutation = {
  __typename?: 'Mutation';
  generateOtp: boolean;
};

export type CheckAccountMutationVariables = Exact<{
  phone: Scalars['String'];
}>;

export type CheckAccountMutation = {
  __typename?: 'Mutation';
  checkAccount: boolean;
};

export type CreateFarmerAccountMutationVariables = Exact<{
  input: CreateFarmerAccountInput;
}>;

export type CreateFarmerAccountMutation = {
  __typename?: 'Mutation';
  createFarmerAccount: {
    __typename?: 'AuthPayload';
    accessToken: string;
    accountType: string;
  };
};

export type SignUpMutationVariables = Exact<{
  input: CreateAccountInput;
  code: Scalars['Float'];
}>;

export type SignUpMutation = {
  __typename?: 'Mutation';
  signUp: {
    __typename?: 'AuthPayload';
    accessToken: string;
    accountType: string;
  };
};

export type CreateUnitMutationVariables = Exact<{
  input: CreateUnitInput;
}>;

export type CreateUnitMutation = {
  __typename?: 'Mutation';
  createUnit: {
    __typename?: 'Unit';
    id: string;
    name: UnitEnum;
    createdAt: any;
    updatedAt: any;
  };
};

export type CreateCategoryMutationVariables = Exact<{
  input: CreateCategoryInput;
}>;

export type CreateCategoryMutation = {
  __typename?: 'Mutation';
  createCategory: {
    __typename?: 'Product';
    id: string;
    productName: string;
    description: string;
  };
};

export type CreateAccountMutationVariables = Exact<{
  input: CreateAccountInput;
}>;

export type CreateAccountMutation = {
  __typename?: 'Mutation';
  createAccount: {
    __typename?: 'Account';
    id: string;
    fullName: string;
    email: string;
    accountType: AccountType;
    phone?: string | null;
    ratingAverage: number;
    reviewsCount: number;
    createdAt?: any | null;
    updatedAt?: any | null;
  };
};

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;

export type CreateProductMutation = {
  __typename?: 'Mutation';
  createProduct: {
    __typename?: 'Product';
    id: string;
    productName: string;
    description: string;
    price: number;
    currency: string;
    quantityAvailable: number;
    expiryDate: any;
    startDate: any;
    country?: string | null;
    city?: string | null;
    address?: string | null;
    status: string;
    createdAt: any;
    updatedAt: any;
    reservations?: Array<{
      __typename?: 'Reservation';
      id: string;
      code: string;
      status: ReservationStatusEnum;
    }> | null;
  };
};

export type CreateProductReservationRequestMutationVariables = Exact<{
  input: InputCreateProductsReservaton;
}>;

export type CreateProductReservationRequestMutation = {
  __typename?: 'Mutation';
  createProductReservationRequest: string;
};

export type CreateBranchMutationVariables = Exact<{
  input: CreateBranchInput;
}>;

export type CreateBranchMutation = {
  __typename?: 'Mutation';
  createBranch: {
    __typename?: 'Branch';
    id: string;
    country: string;
    city: string;
    address: string;
    name: string;
    cover: string;
    locationLat?: number | null;
    locationLon?: number | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  };
};

export type GetSessionQueryVariables = Exact<{ [key: string]: never }>;

export type GetSessionQuery = {
  __typename?: 'Query';
  session: {
    __typename?: 'Session';
    fullName: string;
    email?: string | null;
    profile: string;
    phone?: string | null;
    id: string;
    createdAt: any;
    accountType: AccountType;
  };
};

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type GetCategoriesQuery = {
  __typename?: 'Query';
  categories: Array<{
    __typename?: 'Category';
    id: string;
    category: CategoryEnum;
    createdAt: any;
    updatedAt: any;
  }>;
};

export type GetProductsQueryVariables = Exact<{
  page: Scalars['Float'];
  limit: Scalars['Float'];
  filter?: InputMaybe<CreateProductFilterInput>;
}>;

export type GetProductsQuery = {
  __typename?: 'Query';
  products: {
    __typename?: 'PaginatedProducts';
    items: Array<{
      __typename?: 'Product';
      id: string;
      productName: string;
      description: string;
      price: number;
      currency: string;
      quantityAvailable: number;
      expiryDate: any;
      startDate: any;
      country?: string | null;
      city?: string | null;
      address?: string | null;
      status: string;
      createdAt: any;
      updatedAt: any;
      reservations?: Array<{
        __typename?: 'Reservation';
        id: string;
        status: ReservationStatusEnum;
      }> | null;
    }>;
    meta: {
      __typename?: 'PaginationMeta';
      itemCount: number;
      totalItems: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    };
  };
};

export type GetReservationsQueryVariables = Exact<{
  productId: Scalars['String'];
}>;

export type GetReservationsQuery = {
  __typename?: 'Query';
  reservations: Array<{
    __typename?: 'Reservation';
    id: string;
    code: string;
    createdAt: any;
    status: ReservationStatusEnum;
    productUsageDetails?: any | null;
    account: {
      __typename?: 'Account';
      id: string;
      fullName: string;
      email: string;
      accountType: AccountType;
    };
    products: Array<{
      __typename?: 'Product';
      id: string;
      productName: string;
      quantityAvailable: number;
      status: string;
    }>;
  }>;
};

export const GetBranchesDocument = gql`
  query GetBranches {
    branches {
      id
      country
      city
      address
      name
      cover
      locationLat
      locationLon
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useGetBranchesQuery__
 *
 * To run a query within a React component, call `useGetBranchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBranchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBranchesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBranchesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetBranchesQuery,
    GetBranchesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetBranchesQuery, GetBranchesQueryVariables>(
    GetBranchesDocument,
    options
  );
}
export function useGetBranchesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetBranchesQuery,
    GetBranchesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetBranchesQuery, GetBranchesQueryVariables>(
    GetBranchesDocument,
    options
  );
}
export type GetBranchesQueryHookResult = ReturnType<typeof useGetBranchesQuery>;
export type GetBranchesLazyQueryHookResult = ReturnType<
  typeof useGetBranchesLazyQuery
>;
export type GetBranchesQueryResult = Apollo.QueryResult<
  GetBranchesQuery,
  GetBranchesQueryVariables
>;
export const GetUnitsDocument = gql`
  query GetUnits {
    units {
      id
      name
    }
  }
`;

/**
 * __useGetUnitsQuery__
 *
 * To run a query within a React component, call `useGetUnitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnitsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUnitsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUnitsQuery, GetUnitsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUnitsQuery, GetUnitsQueryVariables>(
    GetUnitsDocument,
    options
  );
}
export function useGetUnitsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUnitsQuery,
    GetUnitsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUnitsQuery, GetUnitsQueryVariables>(
    GetUnitsDocument,
    options
  );
}
export type GetUnitsQueryHookResult = ReturnType<typeof useGetUnitsQuery>;
export type GetUnitsLazyQueryHookResult = ReturnType<
  typeof useGetUnitsLazyQuery
>;
export type GetUnitsQueryResult = Apollo.QueryResult<
  GetUnitsQuery,
  GetUnitsQueryVariables
>;
export const SignInDocument = gql`
  mutation SignIn($phone: String!, $code: Float!) {
    signIn(phone: $phone, code: $code) {
      accessToken
      accountType
    }
  }
`;
export type SignInMutationFn = Apollo.MutationFunction<
  SignInMutation,
  SignInMutationVariables
>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      phone: // value for 'phone'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useSignInMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignInMutation,
    SignInMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignInMutation, SignInMutationVariables>(
    SignInDocument,
    options
  );
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<
  SignInMutation,
  SignInMutationVariables
>;
export const GenerateOtpDocument = gql`
  mutation GenerateOtp($phone: String!) {
    generateOtp(phone: $phone)
  }
`;
export type GenerateOtpMutationFn = Apollo.MutationFunction<
  GenerateOtpMutation,
  GenerateOtpMutationVariables
>;

/**
 * __useGenerateOtpMutation__
 *
 * To run a mutation, you first call `useGenerateOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateOtpMutation, { data, loading, error }] = useGenerateOtpMutation({
 *   variables: {
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useGenerateOtpMutation(
  baseOptions?: Apollo.MutationHookOptions<
    GenerateOtpMutation,
    GenerateOtpMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<GenerateOtpMutation, GenerateOtpMutationVariables>(
    GenerateOtpDocument,
    options
  );
}
export type GenerateOtpMutationHookResult = ReturnType<
  typeof useGenerateOtpMutation
>;
export type GenerateOtpMutationResult =
  Apollo.MutationResult<GenerateOtpMutation>;
export type GenerateOtpMutationOptions = Apollo.BaseMutationOptions<
  GenerateOtpMutation,
  GenerateOtpMutationVariables
>;
export const CheckAccountDocument = gql`
  mutation CheckAccount($phone: String!) {
    checkAccount(phone: $phone)
  }
`;
export type CheckAccountMutationFn = Apollo.MutationFunction<
  CheckAccountMutation,
  CheckAccountMutationVariables
>;

/**
 * __useCheckAccountMutation__
 *
 * To run a mutation, you first call `useCheckAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkAccountMutation, { data, loading, error }] = useCheckAccountMutation({
 *   variables: {
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useCheckAccountMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CheckAccountMutation,
    CheckAccountMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CheckAccountMutation,
    CheckAccountMutationVariables
  >(CheckAccountDocument, options);
}
export type CheckAccountMutationHookResult = ReturnType<
  typeof useCheckAccountMutation
>;
export type CheckAccountMutationResult =
  Apollo.MutationResult<CheckAccountMutation>;
export type CheckAccountMutationOptions = Apollo.BaseMutationOptions<
  CheckAccountMutation,
  CheckAccountMutationVariables
>;
export const CreateFarmerAccountDocument = gql`
  mutation CreateFarmerAccount($input: CreateFarmerAccountInput!) {
    createFarmerAccount(input: $input) {
      accessToken
      accountType
    }
  }
`;
export type CreateFarmerAccountMutationFn = Apollo.MutationFunction<
  CreateFarmerAccountMutation,
  CreateFarmerAccountMutationVariables
>;

/**
 * __useCreateFarmerAccountMutation__
 *
 * To run a mutation, you first call `useCreateFarmerAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFarmerAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFarmerAccountMutation, { data, loading, error }] = useCreateFarmerAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateFarmerAccountMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateFarmerAccountMutation,
    CreateFarmerAccountMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateFarmerAccountMutation,
    CreateFarmerAccountMutationVariables
  >(CreateFarmerAccountDocument, options);
}
export type CreateFarmerAccountMutationHookResult = ReturnType<
  typeof useCreateFarmerAccountMutation
>;
export type CreateFarmerAccountMutationResult =
  Apollo.MutationResult<CreateFarmerAccountMutation>;
export type CreateFarmerAccountMutationOptions = Apollo.BaseMutationOptions<
  CreateFarmerAccountMutation,
  CreateFarmerAccountMutationVariables
>;
export const SignUpDocument = gql`
  mutation SignUp($input: CreateAccountInput!, $code: Float!) {
    signUp(input: $input, code: $code) {
      accessToken
      accountType
    }
  }
`;
export type SignUpMutationFn = Apollo.MutationFunction<
  SignUpMutation,
  SignUpMutationVariables
>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useSignUpMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignUpMutation,
    SignUpMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(
    SignUpDocument,
    options
  );
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<
  SignUpMutation,
  SignUpMutationVariables
>;
export const CreateUnitDocument = gql`
  mutation CreateUnit($input: CreateUnitInput!) {
    createUnit(input: $input) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export type CreateUnitMutationFn = Apollo.MutationFunction<
  CreateUnitMutation,
  CreateUnitMutationVariables
>;

/**
 * __useCreateUnitMutation__
 *
 * To run a mutation, you first call `useCreateUnitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUnitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUnitMutation, { data, loading, error }] = useCreateUnitMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUnitMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUnitMutation,
    CreateUnitMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateUnitMutation, CreateUnitMutationVariables>(
    CreateUnitDocument,
    options
  );
}
export type CreateUnitMutationHookResult = ReturnType<
  typeof useCreateUnitMutation
>;
export type CreateUnitMutationResult =
  Apollo.MutationResult<CreateUnitMutation>;
export type CreateUnitMutationOptions = Apollo.BaseMutationOptions<
  CreateUnitMutation,
  CreateUnitMutationVariables
>;
export const CreateCategoryDocument = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      productName
      description
    }
  }
`;
export type CreateCategoryMutationFn = Apollo.MutationFunction<
  CreateCategoryMutation,
  CreateCategoryMutationVariables
>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCategoryMutation,
    CreateCategoryMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCategoryMutation,
    CreateCategoryMutationVariables
  >(CreateCategoryDocument, options);
}
export type CreateCategoryMutationHookResult = ReturnType<
  typeof useCreateCategoryMutation
>;
export type CreateCategoryMutationResult =
  Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<
  CreateCategoryMutation,
  CreateCategoryMutationVariables
>;
export const CreateAccountDocument = gql`
  mutation CreateAccount($input: CreateAccountInput!) {
    createAccount(input: $input) {
      id
      fullName
      email
      accountType
      phone
      ratingAverage
      reviewsCount
      createdAt
      updatedAt
    }
  }
`;
export type CreateAccountMutationFn = Apollo.MutationFunction<
  CreateAccountMutation,
  CreateAccountMutationVariables
>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAccountMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAccountMutation,
    CreateAccountMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateAccountMutation,
    CreateAccountMutationVariables
  >(CreateAccountDocument, options);
}
export type CreateAccountMutationHookResult = ReturnType<
  typeof useCreateAccountMutation
>;
export type CreateAccountMutationResult =
  Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<
  CreateAccountMutation,
  CreateAccountMutationVariables
>;
export const CreateProductDocument = gql`
  mutation createProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      productName
      description
      price
      currency
      quantityAvailable
      expiryDate
      startDate
      country
      city
      address
      status
      createdAt
      updatedAt
      reservations {
        id
        code
        status
      }
    }
  }
`;
export type CreateProductMutationFn = Apollo.MutationFunction<
  CreateProductMutation,
  CreateProductMutationVariables
>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateProductMutation,
    CreateProductMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateProductMutation,
    CreateProductMutationVariables
  >(CreateProductDocument, options);
}
export type CreateProductMutationHookResult = ReturnType<
  typeof useCreateProductMutation
>;
export type CreateProductMutationResult =
  Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<
  CreateProductMutation,
  CreateProductMutationVariables
>;
export const CreateProductReservationRequestDocument = gql`
  mutation CreateProductReservationRequest(
    $input: InputCreateProductsReservaton!
  ) {
    createProductReservationRequest(input: $input)
  }
`;
export type CreateProductReservationRequestMutationFn = Apollo.MutationFunction<
  CreateProductReservationRequestMutation,
  CreateProductReservationRequestMutationVariables
>;

/**
 * __useCreateProductReservationRequestMutation__
 *
 * To run a mutation, you first call `useCreateProductReservationRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductReservationRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductReservationRequestMutation, { data, loading, error }] = useCreateProductReservationRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductReservationRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateProductReservationRequestMutation,
    CreateProductReservationRequestMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateProductReservationRequestMutation,
    CreateProductReservationRequestMutationVariables
  >(CreateProductReservationRequestDocument, options);
}
export type CreateProductReservationRequestMutationHookResult = ReturnType<
  typeof useCreateProductReservationRequestMutation
>;
export type CreateProductReservationRequestMutationResult =
  Apollo.MutationResult<CreateProductReservationRequestMutation>;
export type CreateProductReservationRequestMutationOptions =
  Apollo.BaseMutationOptions<
    CreateProductReservationRequestMutation,
    CreateProductReservationRequestMutationVariables
  >;
export const CreateBranchDocument = gql`
  mutation CreateBranch($input: CreateBranchInput!) {
    createBranch(input: $input) {
      id
      country
      city
      address
      name
      cover
      locationLat
      locationLon
      createdAt
      updatedAt
    }
  }
`;
export type CreateBranchMutationFn = Apollo.MutationFunction<
  CreateBranchMutation,
  CreateBranchMutationVariables
>;

/**
 * __useCreateBranchMutation__
 *
 * To run a mutation, you first call `useCreateBranchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBranchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBranchMutation, { data, loading, error }] = useCreateBranchMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBranchMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateBranchMutation,
    CreateBranchMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateBranchMutation,
    CreateBranchMutationVariables
  >(CreateBranchDocument, options);
}
export type CreateBranchMutationHookResult = ReturnType<
  typeof useCreateBranchMutation
>;
export type CreateBranchMutationResult =
  Apollo.MutationResult<CreateBranchMutation>;
export type CreateBranchMutationOptions = Apollo.BaseMutationOptions<
  CreateBranchMutation,
  CreateBranchMutationVariables
>;
export const GetSessionDocument = gql`
  query GetSession {
    session {
      fullName
      email
      profile
      phone
      id
      createdAt
      accountType
    }
  }
`;

/**
 * __useGetSessionQuery__
 *
 * To run a query within a React component, call `useGetSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSessionQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSessionQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetSessionQuery,
    GetSessionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetSessionQuery, GetSessionQueryVariables>(
    GetSessionDocument,
    options
  );
}
export function useGetSessionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSessionQuery,
    GetSessionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetSessionQuery, GetSessionQueryVariables>(
    GetSessionDocument,
    options
  );
}
export type GetSessionQueryHookResult = ReturnType<typeof useGetSessionQuery>;
export type GetSessionLazyQueryHookResult = ReturnType<
  typeof useGetSessionLazyQuery
>;
export type GetSessionQueryResult = Apollo.QueryResult<
  GetSessionQuery,
  GetSessionQueryVariables
>;
export const GetCategoriesDocument = gql`
  query GetCategories {
    categories {
      id
      category
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(
    GetCategoriesDocument,
    options
  );
}
export function useGetCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(
    GetCategoriesDocument,
    options
  );
}
export type GetCategoriesQueryHookResult = ReturnType<
  typeof useGetCategoriesQuery
>;
export type GetCategoriesLazyQueryHookResult = ReturnType<
  typeof useGetCategoriesLazyQuery
>;
export type GetCategoriesQueryResult = Apollo.QueryResult<
  GetCategoriesQuery,
  GetCategoriesQueryVariables
>;
export const GetProductsDocument = gql`
  query GetProducts(
    $page: Float!
    $limit: Float!
    $filter: CreateProductFilterInput
  ) {
    products(page: $page, limit: $limit, filter: $filter) {
      items {
        id
        productName
        description
        price
        currency
        quantityAvailable
        expiryDate
        startDate
        country
        city
        address
        status
        createdAt
        updatedAt
        reservations {
          id
          status
        }
      }
      meta {
        itemCount
        totalItems
        itemsPerPage
        totalPages
        currentPage
      }
    }
  }
`;

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetProductsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetProductsQuery,
    GetProductsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetProductsQuery, GetProductsQueryVariables>(
    GetProductsDocument,
    options
  );
}
export function useGetProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetProductsQuery,
    GetProductsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetProductsQuery, GetProductsQueryVariables>(
    GetProductsDocument,
    options
  );
}
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<
  typeof useGetProductsLazyQuery
>;
export type GetProductsQueryResult = Apollo.QueryResult<
  GetProductsQuery,
  GetProductsQueryVariables
>;
export const GetReservationsDocument = gql`
  query GetReservations($productId: String!) {
    reservations(productId: $productId) {
      id
      code
      createdAt
      status
      productUsageDetails
      account {
        id
        fullName
        email
        accountType
      }
      products {
        id
        productName
        quantityAvailable
        status
      }
    }
  }
`;

/**
 * __useGetReservationsQuery__
 *
 * To run a query within a React component, call `useGetReservationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReservationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReservationsQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetReservationsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetReservationsQuery,
    GetReservationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetReservationsQuery, GetReservationsQueryVariables>(
    GetReservationsDocument,
    options
  );
}
export function useGetReservationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetReservationsQuery,
    GetReservationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetReservationsQuery,
    GetReservationsQueryVariables
  >(GetReservationsDocument, options);
}
export type GetReservationsQueryHookResult = ReturnType<
  typeof useGetReservationsQuery
>;
export type GetReservationsLazyQueryHookResult = ReturnType<
  typeof useGetReservationsLazyQuery
>;
export type GetReservationsQueryResult = Apollo.QueryResult<
  GetReservationsQuery,
  GetReservationsQueryVariables
>;
