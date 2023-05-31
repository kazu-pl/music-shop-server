import { GraphQLResolveInfo } from 'graphql';
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

export type GetGuitarsSortInput = {
  sortBy: SortByKeys;
  sortOrder?: InputMaybe<SortOrder>;
};

export type Guitar = {
  __typename?: 'Guitar';
  _id: Scalars['ID'];
  availability: GuitarFilter;
  bodyWood: GuitarFilter;
  bridge: GuitarFilter;
  description: Scalars['String'];
  fingerboardWood: GuitarFilter;
  fretsNumber: Scalars['Int'];
  guitarType: GuitarFilter;
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

export type GuitarsList = {
  __typename?: 'GuitarsList';
  data: Array<Guitar>;
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


export type MutationRenewAccessTokenArgs = {
  refreshCredentials: RefreshTokenInput;
};


export type MutationUpdateGuitarArgs = {
  guitar: UpdateGuitarInput;
};


export type MutationUpdateGuitarFilterArgs = {
  guitarFilter: UpdateGuitarFilterInput;
};


export type MutationUpdateUserDataArgs = {
  data: User;
};


export type MutationUpdateUserPasswordArgs = {
  newPasswordInput: NewPasswordInput;
};

export type Query = {
  __typename?: 'Query';
  /**
   * **PROTECTED**
   * -
   * **ONLY FOR ADMIN**
   */
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
  /**
   * **PROTECTED**
   * -
   * **ONLY FOR ADMIN**
   */
  getGuitars: GuitarsList;
  /** **PROTECTED** */
  getUserData: UserType;
  /** **PROTECTED** */
  removeUser: SuccessfulReqMsg;
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
  Float: ResolverTypeWrapper<Scalars['Float']>;
  GetGuitarsSortInput: GetGuitarsSortInput;
  Guitar: ResolverTypeWrapper<Guitar>;
  GuitarFilter: ResolverTypeWrapper<GuitarFilter>;
  GuitarFilterTypeEnum: GuitarFilterTypeEnum;
  GuitarFiltersList: ResolverTypeWrapper<GuitarFiltersList>;
  GuitarsList: ResolverTypeWrapper<GuitarsList>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LoginCredentialsInput: LoginCredentialsInput;
  Mutation: ResolverTypeWrapper<{}>;
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
  Float: Scalars['Float'];
  GetGuitarsSortInput: GetGuitarsSortInput;
  Guitar: Guitar;
  GuitarFilter: GuitarFilter;
  GuitarFiltersList: GuitarFiltersList;
  GuitarsList: GuitarsList;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  LoginCredentialsInput: LoginCredentialsInput;
  Mutation: {};
  Query: {};
  RefreshTokenInput: RefreshTokenInput;
  RegisterCredentialsInput: RegisterCredentialsInput;
  String: Scalars['String'];
  SuccessfulReqMsg: SuccessfulReqMsg;
  Tokens: Tokens;
  UpdateGuitarFilterInput: UpdateGuitarFilterInput;
  UpdateGuitarInput: UpdateGuitarInput;
  User: User;
  UserType: UserType;
  newPasswordInput: NewPasswordInput;
};

export type AccessTokenResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AccessTokenResponse'] = ResolversParentTypes['AccessTokenResponse']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pickupsSet?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  producer?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  scaleLength?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  shape?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType>;
  stringsNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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

export type GuitarsListResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GuitarsList'] = ResolversParentTypes['GuitarsList']> = {
  data?: Resolver<Array<ResolversTypes['Guitar']>, ParentType, ContextType>;
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
  renewAccessToken?: Resolver<ResolversTypes['AccessTokenResponse'], ParentType, ContextType, RequireFields<MutationRenewAccessTokenArgs, 'refreshCredentials'>>;
  updateGuitar?: Resolver<ResolversTypes['SuccessfulReqMsg'], ParentType, ContextType, RequireFields<MutationUpdateGuitarArgs, 'guitar'>>;
  updateGuitarFilter?: Resolver<ResolversTypes['SuccessfulReqMsg'], ParentType, ContextType, RequireFields<MutationUpdateGuitarFilterArgs, 'guitarFilter'>>;
  updateUserData?: Resolver<ResolversTypes['SuccessfulReqMsg'], ParentType, ContextType, RequireFields<MutationUpdateUserDataArgs, 'data'>>;
  updateUserPassword?: Resolver<ResolversTypes['SuccessfulReqMsg'], ParentType, ContextType, RequireFields<MutationUpdateUserPasswordArgs, 'newPasswordInput'>>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getGuitar?: Resolver<ResolversTypes['Guitar'], ParentType, ContextType, RequireFields<QueryGetGuitarArgs, 'id'>>;
  getGuitarFilter?: Resolver<ResolversTypes['GuitarFilter'], ParentType, ContextType, RequireFields<QueryGetGuitarFilterArgs, 'id'>>;
  getGuitarFilters?: Resolver<ResolversTypes['GuitarFiltersList'], ParentType, ContextType, RequireFields<QueryGetGuitarFiltersArgs, 'type'>>;
  getGuitars?: Resolver<ResolversTypes['GuitarsList'], ParentType, ContextType, RequireFields<QueryGetGuitarsArgs, 'sort'>>;
  getUserData?: Resolver<ResolversTypes['UserType'], ParentType, ContextType>;
  removeUser?: Resolver<ResolversTypes['SuccessfulReqMsg'], ParentType, ContextType>;
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
  Guitar?: GuitarResolvers<ContextType>;
  GuitarFilter?: GuitarFilterResolvers<ContextType>;
  GuitarFiltersList?: GuitarFiltersListResolvers<ContextType>;
  GuitarsList?: GuitarsListResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SuccessfulReqMsg?: SuccessfulReqMsgResolvers<ContextType>;
  Tokens?: TokensResolvers<ContextType>;
  UserType?: UserTypeResolvers<ContextType>;
};

