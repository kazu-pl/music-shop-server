import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../context';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export type AccessTokenResponse = {
  __typename?: 'AccessTokenResponse';
  accessToken: Scalars['String'];
};

export type AddGuitarFilterInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  type: GuitarFilterTypeEnum;
};

export type AddGuitarInput = {
  availabilityId: Scalars['String'];
  bodyWoodId: Scalars['String'];
  bridgeId: Scalars['String'];
  description: Scalars['String'];
  fingerboardWoodId: Scalars['String'];
  fretsNumber: Scalars['Int'];
  guitarTypeId: Scalars['String'];
  name: Scalars['String'];
  pickupsSetId: Scalars['String'];
  price: Scalars['Int'];
  producerId: Scalars['String'];
  scaleLength: Scalars['Float'];
  shapeId: Scalars['String'];
  stringsNumber: Scalars['Int'];
};

export type File = {
  __typename?: 'File';
  encoding: Scalars['String'];
  filename: Scalars['String'];
  mimetype: Scalars['String'];
};

export type GetGuitarsFilters = {
  /** Id of availability */
  availability?: InputMaybe<Scalars['ID']>;
  /** Id of bodyWood */
  bodyWood?: InputMaybe<Scalars['ID']>;
  /** Id of bridge */
  bridge?: InputMaybe<Scalars['ID']>;
  /** Id of fingerboardWood */
  fingerboardWood?: InputMaybe<Scalars['ID']>;
  /** Id of guitarType */
  guitarType?: InputMaybe<Scalars['ID']>;
  /** Id of pickupsSet */
  pickupsSet?: InputMaybe<Scalars['ID']>;
  price?: InputMaybe<PriceRange>;
  /** Id of producer */
  producer?: InputMaybe<Scalars['ID']>;
  /** Id of shape */
  shape?: InputMaybe<Scalars['ID']>;
  stringsNumber?: InputMaybe<Scalars['Int']>;
};

export type GetGuitarsSortInput = {
  sortBy: SortByKeys;
  sortOrder?: InputMaybe<SortOrder>;
};

export type Guitar = GuitarBase & {
  __typename?: 'Guitar';
  _id: Scalars['ID'];
  availability: GuitarFilter;
  bodyWood: GuitarFilter;
  bridge: GuitarFilter;
  description: Scalars['String'];
  fingerboardWood: GuitarFilter;
  fretsNumber: Scalars['Int'];
  guitarType: GuitarFilter;
  imageId?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  pickupsSet: GuitarFilter;
  price: Scalars['Int'];
  producer: GuitarFilter;
  scaleLength: Scalars['Float'];
  shape: GuitarFilter;
  stringsNumber: Scalars['Int'];
};

export type GuitarBase = {
  _id: Scalars['ID'];
  availability: GuitarFilter;
  bodyWood: GuitarFilter;
  bridge: GuitarFilter;
  description: Scalars['String'];
  fingerboardWood: GuitarFilter;
  fretsNumber: Scalars['Int'];
  guitarType: GuitarFilter;
  imageId?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  pickupsSet: GuitarFilter;
  price: Scalars['Int'];
  producer: GuitarFilter;
  scaleLength: Scalars['Float'];
  shape: GuitarFilter;
  stringsNumber: Scalars['Int'];
};

export type GuitarFilter = {
  __typename?: 'GuitarFilter';
  _id: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  type: GuitarFilterTypeEnum;
};

export enum GuitarFilterTypeEnum {
  Availability = 'AVAILABILITY',
  BodyWood = 'BODY_WOOD',
  Bridge = 'BRIDGE',
  FingerboardWood = 'FINGERBOARD_WOOD',
  GuitarType = 'GUITAR_TYPE',
  PickupsSet = 'PICKUPS_SET',
  Producer = 'PRODUCER',
  Shape = 'SHAPE'
}

export type GuitarFiltersList = {
  __typename?: 'GuitarFiltersList';
  data: Array<GuitarFilter>;
  totalItems: Scalars['Int'];
};

export type GuitarPopulated = GuitarBase & {
  __typename?: 'GuitarPopulated';
  _id: Scalars['ID'];
  availability: GuitarFilter;
  bodyWood: GuitarFilter;
  bridge: GuitarFilter;
  description: Scalars['String'];
  fingerboardWood: GuitarFilter;
  fretsNumber: Scalars['Int'];
  guitarType: GuitarFilter;
  imageId?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  pickupsSet: GuitarFilter;
  price: Scalars['Int'];
  producer: GuitarFilter;
  scaleLength: Scalars['Float'];
  shape: GuitarFilter;
  stringsNumber: Scalars['Int'];
};

export type GuitarWithDataLoader = GuitarBase & {
  __typename?: 'GuitarWithDataLoader';
  _id: Scalars['ID'];
  availability: GuitarFilter;
  bodyWood: GuitarFilter;
  bridge: GuitarFilter;
  description: Scalars['String'];
  fingerboardWood: GuitarFilter;
  fretsNumber: Scalars['Int'];
  guitarType: GuitarFilter;
  imageId?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  pickupsSet: GuitarFilter;
  price: Scalars['Int'];
  producer: GuitarFilter;
  scaleLength: Scalars['Float'];
  shape: GuitarFilter;
  stringsNumber: Scalars['Int'];
};

export type GuitarsList = {
  __typename?: 'GuitarsList';
  data: Array<Guitar>;
  totalItems: Scalars['Int'];
};

export type GuitarsListPopulated = {
  __typename?: 'GuitarsListPopulated';
  data: Array<GuitarPopulated>;
  totalItems: Scalars['Int'];
};

export type GuitarsListWithdataLoder = {
  __typename?: 'GuitarsListWithdataLoder';
  data: Array<GuitarWithDataLoader>;
  totalItems: Scalars['Int'];
};

export type LoginCredentialsInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * **PROTECTED**
   * -
   * **ONLY FOR ADMIN**
   */
  addGuitar: SuccessfulReqMsg;
  /**
   * **PROTECTED**
   * -
   * **ONLY FOR ADMIN**
   */
  addGuitarFilter: SuccessfulReqMsg;
  /** use this mutation to send email and password and get JWT tokens */
  login: Tokens;
  /**
   * Description for field
   * Supports **multi-line** description for your [API](http://example.com)!
   */
  register: SuccessfulReqMsg;
  /**
   * **PROTECTED**
   * -
   * **ONLY FOR ADMIN**
   */
  removeGuitar: SuccessfulReqMsg;
  /**
   * **PROTECTED**
   * -
   * **ONLY FOR ADMIN**
   */
  removeGuitarFilter: SuccessfulReqMsg;
  /**
   * **PROTECTED**
   * -
   * **ONLY FOR ADMIN**
   *
   * remove guitar image
   */
  removeGuitarImage: SuccessfulReqMsg;
  /** **PROTECTED** */
  removeUser: SuccessfulReqMsg;
  /** use this to get new accessToken if yours expired. Pass refreshToken to obtain accessToken */
  renewAccessToken: AccessTokenResponse;
  /**
   * **PROTECTED**
   * -
   * **ONLY FOR ADMIN**
   */
  updateGuitar: SuccessfulReqMsg;
  /**
   * **PROTECTED**
   * -
   * **ONLY FOR ADMIN**
   */
  updateGuitarFilter: SuccessfulReqMsg;
  /**
   * **PROTECTED**
   * -
   * **ONLY FOR ADMIN**
   *
   * Send guitar id and its new image and obtain id of the new image
   */
  updateGuitarImage: Scalars['ID'];
  /** **PROTECTED** */
  updateUserData: SuccessfulReqMsg;
  /** **PROTECTED** */
  updateUserPassword: SuccessfulReqMsg;
};


export type MutationAddGuitarArgs = {
  newGuitar: AddGuitarInput;
};


export type MutationAddGuitarFilterArgs = {
  newGuitarFilter: AddGuitarFilterInput;
};


export type MutationLoginArgs = {
  loginCredentials: LoginCredentialsInput;
};


export type MutationRegisterArgs = {
  registerCredentials: RegisterCredentialsInput;
};


export type MutationRemoveGuitarArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveGuitarFilterArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveGuitarImageArgs = {
  guitarId: Scalars['ID'];
};


export type MutationRenewAccessTokenArgs = {
  refreshCredentials: RefreshTokenInput;
};


export type MutationUpdateGuitarArgs = {
  guitar: UpdateGuitarInput;
};


export type MutationUpdateGuitarFilterArgs = {
  guitarFilter: UpdateGuitarFilterInput;
};


export type MutationUpdateGuitarImageArgs = {
  guitarId: Scalars['ID'];
  image: Scalars['Upload'];
};


export type MutationUpdateUserDataArgs = {
  data: User;
};


export type MutationUpdateUserPasswordArgs = {
  newPasswordInput: NewPasswordInput;
};

export type PriceRange = {
  from: Scalars['Int'];
  to: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  getGuitar: Guitar;
  /**
   * **PROTECTED**
   * -
   * **ONLY FOR ADMIN**
   */
  getGuitarFilter: GuitarFilter;
  /**
   * **PROTECTED**
   * -
   * **ONLY FOR ADMIN**
   */
  getGuitarFilters: GuitarFiltersList;
  getGuitars: GuitarsList;
  getGuitarsPopulated: GuitarsListPopulated;
  getGuitarsPopulatedOptionally: GuitarsListPopulated;
  getGuitarsWithDataLoader: GuitarsListWithdataLoder;
  /** **PROTECTED** */
  getUserData: UserType;
};


export type QueryGetGuitarArgs = {
  id: Scalars['ID'];
};


export type QueryGetGuitarFilterArgs = {
  id: Scalars['ID'];
};


export type QueryGetGuitarFiltersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  type: GuitarFilterTypeEnum;
};


export type QueryGetGuitarsArgs = {
  filters?: InputMaybe<GetGuitarsFilters>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort: GetGuitarsSortInput;
};


export type QueryGetGuitarsPopulatedArgs = {
  filters?: InputMaybe<GetGuitarsFilters>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort: GetGuitarsSortInput;
};


export type QueryGetGuitarsPopulatedOptionallyArgs = {
  filters?: InputMaybe<GetGuitarsFilters>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort: GetGuitarsSortInput;
};


export type QueryGetGuitarsWithDataLoaderArgs = {
  filters?: InputMaybe<GetGuitarsFilters>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort: GetGuitarsSortInput;
};

export type RefreshTokenInput = {
  refreshToken: Scalars['String'];
};

export type RegisterCredentialsInput = {
  data: User;
  password: Scalars['String'];
};

export enum SortByGeneral {
  Default = 'DEFAULT',
  Latest = 'LATEST'
}

export enum SortByKeys {
  Default = 'DEFAULT',
  Latest = 'LATEST',
  Name = 'NAME',
  Price = 'PRICE'
}

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type SuccessfulReqMsg = {
  __typename?: 'SuccessfulReqMsg';
  message: Scalars['String'];
};

export type Tokens = {
  __typename?: 'Tokens';
  /**
   * Description for field
   * Supports **multi-line** description for your [API](http://example.com)!
   */
  accessToken: Scalars['String'];
  /** Description for argument */
  refreshToken: Scalars['String'];
};

export type UpdateGuitarFilterInput = {
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  type: GuitarFilterTypeEnum;
};

export type UpdateGuitarInput = {
  availabilityId: Scalars['String'];
  bodyWoodId: Scalars['String'];
  bridgeId: Scalars['String'];
  description: Scalars['String'];
  fingerboardWoodId: Scalars['String'];
  fretsNumber: Scalars['Int'];
  guitarTypeId: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  pickupsSetId: Scalars['String'];
  price: Scalars['Int'];
  producerId: Scalars['String'];
  scaleLength: Scalars['Float'];
  shapeId: Scalars['String'];
  stringsNumber: Scalars['Int'];
};

export type User = {
  city: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['Int'];
  postalCode: Scalars['String'];
  street: Scalars['String'];
  streetNumber: Scalars['String'];
  surname: Scalars['String'];
};

export type UserType = {
  __typename?: 'UserType';
  city: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['Int'];
  postalCode: Scalars['String'];
  street: Scalars['String'];
  streetNumber: Scalars['String'];
  surname: Scalars['String'];
};

export type NewPasswordInput = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AccessTokenResponse: ResolverTypeWrapper<AccessTokenResponse>;
  AddGuitarFilterInput: AddGuitarFilterInput;
  AddGuitarInput: AddGuitarInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  File: ResolverTypeWrapper<File>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  GetGuitarsFilters: GetGuitarsFilters;
  GetGuitarsSortInput: GetGuitarsSortInput;
  Guitar: ResolverTypeWrapper<Guitar>;
  GuitarBase: ResolversTypes['Guitar'] | ResolversTypes['GuitarPopulated'] | ResolversTypes['GuitarWithDataLoader'];
  GuitarFilter: ResolverTypeWrapper<GuitarFilter>;
  GuitarFilterTypeEnum: GuitarFilterTypeEnum;
  GuitarFiltersList: ResolverTypeWrapper<GuitarFiltersList>;
  GuitarPopulated: ResolverTypeWrapper<GuitarPopulated>;
  GuitarWithDataLoader: ResolverTypeWrapper<GuitarWithDataLoader>;
  GuitarsList: ResolverTypeWrapper<GuitarsList>;
  GuitarsListPopulated: ResolverTypeWrapper<GuitarsListPopulated>;
  GuitarsListWithdataLoder: ResolverTypeWrapper<GuitarsListWithdataLoder>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LoginCredentialsInput: LoginCredentialsInput;
  Mutation: ResolverTypeWrapper<{}>;
  PriceRange: PriceRange;
  Query: ResolverTypeWrapper<{}>;
  RefreshTokenInput: RefreshTokenInput;
  RegisterCredentialsInput: RegisterCredentialsInput;
  SortByGeneral: SortByGeneral;
  SortByKeys: SortByKeys;
  SortOrder: SortOrder;
  String: ResolverTypeWrapper<Scalars['String']>;
  SuccessfulReqMsg: ResolverTypeWrapper<SuccessfulReqMsg>;
  Tokens: ResolverTypeWrapper<Tokens>;
  UpdateGuitarFilterInput: UpdateGuitarFilterInput;
  UpdateGuitarInput: UpdateGuitarInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: User;
  UserType: ResolverTypeWrapper<UserType>;
  newPasswordInput: NewPasswordInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AccessTokenResponse: AccessTokenResponse;
  AddGuitarFilterInput: AddGuitarFilterInput;
  AddGuitarInput: AddGuitarInput;
  Boolean: Scalars['Boolean'];
  File: File;
  Float: Scalars['Float'];
  GetGuitarsFilters: GetGuitarsFilters;
  GetGuitarsSortInput: GetGuitarsSortInput;
  Guitar: Guitar;
  GuitarBase: ResolversParentTypes['Guitar'] | ResolversParentTypes['GuitarPopulated'] | ResolversParentTypes['GuitarWithDataLoader'];
  GuitarFilter: GuitarFilter;
  GuitarFiltersList: GuitarFiltersList;
  GuitarPopulated: GuitarPopulated;
  GuitarWithDataLoader: GuitarWithDataLoader;
  GuitarsList: GuitarsList;
  GuitarsListPopulated: GuitarsListPopulated;
  GuitarsListWithdataLoder: GuitarsListWithdataLoder;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  LoginCredentialsInput: LoginCredentialsInput;
  Mutation: {};
  PriceRange: PriceRange;
  Query: {};
  RefreshTokenInput: RefreshTokenInput;
  RegisterCredentialsInput: RegisterCredentialsInput;
  String: Scalars['String'];
  SuccessfulReqMsg: SuccessfulReqMsg;
  Tokens: Tokens;
  UpdateGuitarFilterInput: UpdateGuitarFilterInput;
  UpdateGuitarInput: UpdateGuitarInput;
  Upload: Scalars['Upload'];
  User: User;
  UserType: UserType;
  newPasswordInput: NewPasswordInput;
};

export type AccessTokenResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AccessTokenResponse'] = ResolversParentTypes['AccessTokenResponse']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FileResolvers<ContextType = Context, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  encoding?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mimetype?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GuitarResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Guitar'] = ResolversParentTypes['Guitar']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  availability?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  bodyWood?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  bridge?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fingerboardWood?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  fretsNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  guitarType?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  imageId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pickupsSet?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  producer?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  scaleLength?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  shape?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  stringsNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GuitarBaseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GuitarBase'] = ResolversParentTypes['GuitarBase']> = {
  __resolveType: TypeResolveFn<'Guitar' | 'GuitarPopulated' | 'GuitarWithDataLoader', ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  availability?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  bodyWood?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  bridge?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fingerboardWood?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  fretsNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  guitarType?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  imageId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pickupsSet?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  producer?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  scaleLength?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  shape?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  stringsNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type GuitarFilterResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GuitarFilter'] = ResolversParentTypes['GuitarFilter']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['GuitarFilterTypeEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GuitarFiltersListResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GuitarFiltersList'] = ResolversParentTypes['GuitarFiltersList']> = {
  data?: Resolver<Array<ResolversTypes['GuitarFilter']>, ParentType, ContextType>;
  totalItems?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GuitarPopulatedResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GuitarPopulated'] = ResolversParentTypes['GuitarPopulated']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  availability?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  bodyWood?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  bridge?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fingerboardWood?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  fretsNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  guitarType?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  imageId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pickupsSet?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  producer?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  scaleLength?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  shape?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  stringsNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GuitarWithDataLoaderResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GuitarWithDataLoader'] = ResolversParentTypes['GuitarWithDataLoader']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  availability?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  bodyWood?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  bridge?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fingerboardWood?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  fretsNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  guitarType?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  imageId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pickupsSet?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  producer?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  scaleLength?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  shape?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  stringsNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GuitarsListResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GuitarsList'] = ResolversParentTypes['GuitarsList']> = {
  data?: Resolver<Array<ResolversTypes['Guitar']>, ParentType, ContextType>;
  totalItems?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GuitarsListPopulatedResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GuitarsListPopulated'] = ResolversParentTypes['GuitarsListPopulated']> = {
  data?: Resolver<Array<ResolversTypes['GuitarPopulated']>, ParentType, ContextType>;
  totalItems?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GuitarsListWithdataLoderResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GuitarsListWithdataLoder'] = ResolversParentTypes['GuitarsListWithdataLoder']> = {
  data?: Resolver<Array<ResolversTypes['GuitarWithDataLoader']>, ParentType, ContextType>;
  totalItems?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addGuitar?: Resolver<ResolversTypes['SuccessfulReqMsg'], ParentType, ContextType, RequireFields<MutationAddGuitarArgs, 'newGuitar'>>;
  addGuitarFilter?: Resolver<ResolversTypes['SuccessfulReqMsg'], ParentType, ContextType, RequireFields<MutationAddGuitarFilterArgs, 'newGuitarFilter'>>;
  login?: Resolver<ResolversTypes['Tokens'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'loginCredentials'>>;
  register?: Resolver<ResolversTypes['SuccessfulReqMsg'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'registerCredentials'>>;
  removeGuitar?: Resolver<ResolversTypes['SuccessfulReqMsg'], ParentType, ContextType, RequireFields<MutationRemoveGuitarArgs, 'id'>>;
  removeGuitarFilter?: Resolver<ResolversTypes['SuccessfulReqMsg'], ParentType, ContextType, RequireFields<MutationRemoveGuitarFilterArgs, 'id'>>;
  removeGuitarImage?: Resolver<ResolversTypes['SuccessfulReqMsg'], ParentType, ContextType, RequireFields<MutationRemoveGuitarImageArgs, 'guitarId'>>;
  removeUser?: Resolver<ResolversTypes['SuccessfulReqMsg'], ParentType, ContextType>;
  renewAccessToken?: Resolver<ResolversTypes['AccessTokenResponse'], ParentType, ContextType, RequireFields<MutationRenewAccessTokenArgs, 'refreshCredentials'>>;
  updateGuitar?: Resolver<ResolversTypes['SuccessfulReqMsg'], ParentType, ContextType, RequireFields<MutationUpdateGuitarArgs, 'guitar'>>;
  updateGuitarFilter?: Resolver<ResolversTypes['SuccessfulReqMsg'], ParentType, ContextType, RequireFields<MutationUpdateGuitarFilterArgs, 'guitarFilter'>>;
  updateGuitarImage?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationUpdateGuitarImageArgs, 'guitarId' | 'image'>>;
  updateUserData?: Resolver<ResolversTypes['SuccessfulReqMsg'], ParentType, ContextType, RequireFields<MutationUpdateUserDataArgs, 'data'>>;
  updateUserPassword?: Resolver<ResolversTypes['SuccessfulReqMsg'], ParentType, ContextType, RequireFields<MutationUpdateUserPasswordArgs, 'newPasswordInput'>>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getGuitar?: Resolver<ResolversTypes['Guitar'], ParentType, ContextType, RequireFields<QueryGetGuitarArgs, 'id'>>;
  getGuitarFilter?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType, RequireFields<QueryGetGuitarFilterArgs, 'id'>>;
  getGuitarFilters?: Resolver<ResolversTypes['GuitarFiltersList'], ParentType, ContextType, RequireFields<QueryGetGuitarFiltersArgs, 'type'>>;
  getGuitars?: Resolver<ResolversTypes['GuitarsList'], ParentType, ContextType, RequireFields<QueryGetGuitarsArgs, 'sort'>>;
  getGuitarsPopulated?: Resolver<ResolversTypes['GuitarsListPopulated'], ParentType, ContextType, RequireFields<QueryGetGuitarsPopulatedArgs, 'sort'>>;
  getGuitarsPopulatedOptionally?: Resolver<ResolversTypes['GuitarsListPopulated'], ParentType, ContextType, RequireFields<QueryGetGuitarsPopulatedOptionallyArgs, 'sort'>>;
  getGuitarsWithDataLoader?: Resolver<ResolversTypes['GuitarsListWithdataLoder'], ParentType, ContextType, RequireFields<QueryGetGuitarsWithDataLoaderArgs, 'sort'>>;
  getUserData?: Resolver<ResolversTypes['UserType'], ParentType, ContextType>;
};

export type SuccessfulReqMsgResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SuccessfulReqMsg'] = ResolversParentTypes['SuccessfulReqMsg']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokensResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Tokens'] = ResolversParentTypes['Tokens']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserTypeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserType'] = ResolversParentTypes['UserType']> = {
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  postalCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  street?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  streetNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  surname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  AccessTokenResponse?: AccessTokenResponseResolvers<ContextType>;
  File?: FileResolvers<ContextType>;
  Guitar?: GuitarResolvers<ContextType>;
  GuitarBase?: GuitarBaseResolvers<ContextType>;
  GuitarFilter?: GuitarFilterResolvers<ContextType>;
  GuitarFiltersList?: GuitarFiltersListResolvers<ContextType>;
  GuitarPopulated?: GuitarPopulatedResolvers<ContextType>;
  GuitarWithDataLoader?: GuitarWithDataLoaderResolvers<ContextType>;
  GuitarsList?: GuitarsListResolvers<ContextType>;
  GuitarsListPopulated?: GuitarsListPopulatedResolvers<ContextType>;
  GuitarsListWithdataLoder?: GuitarsListWithdataLoderResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SuccessfulReqMsg?: SuccessfulReqMsgResolvers<ContextType>;
  Tokens?: TokensResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  UserType?: UserTypeResolvers<ContextType>;
};

