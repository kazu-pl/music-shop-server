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

export type AddGuitarProducentInput = {
  description: Scalars['String'];
  name: Scalars['String'];
};

export type AddGuitarShapeInput = {
  name: Scalars['String'];
};

export type GetGuitarProducentsRes = {
  __typename?: 'GetGuitarProducentsRes';
  data: Array<GuitarProducent>;
  totalItems: Scalars['Int'];
};

export type GetGuitarShapesRes = {
  __typename?: 'GetGuitarShapesRes';
  data: Array<GuitarShape>;
  totalItems: Scalars['Int'];
};

export type GuitarProducent = {
  __typename?: 'GuitarProducent';
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type GuitarShape = {
  __typename?: 'GuitarShape';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type LoginCredentialsInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * **PROTECTED**
   * **ONLY FOR ADMIN**
   */
  addGuitarProducent: SuccessfulReqMsg;
  /**
   * **PROTECTED**
   * **ONLY FOR ADMIN**
   */
  addGuitarShape: SuccessfulReqMsg;
  /** use this mutation to send email and password and get JWT tokens */
  login: Tokens;
  /**
   * Description for field
   * Supports **multi-line** description for your [API](http://example.com)!
   */
  register: SuccessfulReqMsg;
  /** use this to get new accessToken if yours expired. Pass refreshToken to obtain accessToken */
  renewAccessToken: AccessTokenResponse;
  /**
   * **PROTECTED**
   * **ONLY FOR ADMIN**
   */
  updateGuitarProducent: SuccessfulReqMsg;
  /**
   * **PROTECTED**
   * **ONLY FOR ADMIN**
   */
  updateGuitarShape: SuccessfulReqMsg;
  /** **PROTECTED** */
  updateUserData: SuccessfulReqMsg;
  /** **PROTECTED** */
  updateUserPassword: SuccessfulReqMsg;
};


export type MutationAddGuitarProducentArgs = {
  producentData: AddGuitarProducentInput;
};


export type MutationAddGuitarShapeArgs = {
  newGuitarShape: AddGuitarShapeInput;
};


export type MutationLoginArgs = {
  loginCredentials: LoginCredentialsInput;
};


export type MutationRegisterArgs = {
  registerCredentials: RegisterCredentialsInput;
};


export type MutationRenewAccessTokenArgs = {
  refreshCredentials: RefreshTokenInput;
};


export type MutationUpdateGuitarProducentArgs = {
  producentData: UpdateGuitarProducentInput;
};


export type MutationUpdateGuitarShapeArgs = {
  guitarShapeData: UpdateGuitarShapeInput;
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
   * **ONLY FOR ADMIN**
   */
  getGuitarProducent: GuitarProducent;
  getGuitarProducents: GetGuitarProducentsRes;
  /**
   * **PROTECTED**
   * **ONLY FOR ADMIN**
   */
  getGuitarShape: GuitarShape;
  getGuitarShapes: GetGuitarShapesRes;
  /** **PROTECTED** */
  getUserData: UserType;
  /**
   * **PROTECTED**
   * **ONLY FOR ADMIN**
   */
  removeGuitarProducent: SuccessfulReqMsg;
  /**
   * **PROTECTED**
   * **ONLY FOR ADMIN**
   */
  removeGuitarShape: SuccessfulReqMsg;
  /** **PROTECTED** */
  removeUser: SuccessfulReqMsg;
};


export type QueryGetGuitarProducentArgs = {
  id: Scalars['ID'];
};


export type QueryGetGuitarProducentsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetGuitarShapeArgs = {
  id: Scalars['ID'];
};


export type QueryGetGuitarShapesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryRemoveGuitarProducentArgs = {
  id: Scalars['ID'];
};


export type QueryRemoveGuitarShapeArgs = {
  id: Scalars['ID'];
};

export type RefreshTokenInput = {
  refreshToken: Scalars['String'];
};

export type RegisterCredentialsInput = {
  data: User;
  password: Scalars['String'];
};

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

export type UpdateGuitarProducentInput = {
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type UpdateGuitarShapeInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
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
  AddGuitarProducentInput: AddGuitarProducentInput;
  AddGuitarShapeInput: AddGuitarShapeInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  GetGuitarProducentsRes: ResolverTypeWrapper<GetGuitarProducentsRes>;
  GetGuitarShapesRes: ResolverTypeWrapper<GetGuitarShapesRes>;
  GuitarProducent: ResolverTypeWrapper<GuitarProducent>;
  GuitarShape: ResolverTypeWrapper<GuitarShape>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LoginCredentialsInput: LoginCredentialsInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RefreshTokenInput: RefreshTokenInput;
  RegisterCredentialsInput: RegisterCredentialsInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  SuccessfulReqMsg: ResolverTypeWrapper<SuccessfulReqMsg>;
  Tokens: ResolverTypeWrapper<Tokens>;
  UpdateGuitarProducentInput: UpdateGuitarProducentInput;
  UpdateGuitarShapeInput: UpdateGuitarShapeInput;
  User: User;
  UserType: ResolverTypeWrapper<UserType>;
  newPasswordInput: NewPasswordInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AccessTokenResponse: AccessTokenResponse;
  AddGuitarProducentInput: AddGuitarProducentInput;
  AddGuitarShapeInput: AddGuitarShapeInput;
  Boolean: Scalars['Boolean'];
  GetGuitarProducentsRes: GetGuitarProducentsRes;
  GetGuitarShapesRes: GetGuitarShapesRes;
  GuitarProducent: GuitarProducent;
  GuitarShape: GuitarShape;
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
  UpdateGuitarProducentInput: UpdateGuitarProducentInput;
  UpdateGuitarShapeInput: UpdateGuitarShapeInput;
  User: User;
  UserType: UserType;
  newPasswordInput: NewPasswordInput;
};

export type AccessTokenResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AccessTokenResponse'] = ResolversParentTypes['AccessTokenResponse']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetGuitarProducentsResResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GetGuitarProducentsRes'] = ResolversParentTypes['GetGuitarProducentsRes']> = {
  data?: Resolver<Array<ResolversTypes['GuitarProducent']>, ParentType, ContextType>;
  totalItems?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetGuitarShapesResResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GetGuitarShapesRes'] = ResolversParentTypes['GetGuitarShapesRes']> = {
  data?: Resolver<Array<ResolversTypes['GuitarShape']>, ParentType, ContextType>;
  totalItems?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GuitarProducentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GuitarProducent'] = ResolversParentTypes['GuitarProducent']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GuitarShapeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GuitarShape'] = ResolversParentTypes['GuitarShape']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addGuitarProducent?: Resolver<ResolversTypes['SuccessfulReqMsg'], ParentType, ContextType, RequireFields<MutationAddGuitarProducentArgs, 'producentData'>>;
  addGuitarShape?: Resolver<ResolversTypes['SuccessfulReqMsg'], ParentType, ContextType, RequireFields<MutationAddGuitarShapeArgs, 'newGuitarShape'>>;
  login?: Resolver<ResolversTypes['Tokens'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'loginCredentials'>>;
  register?: Resolver<ResolversTypes['SuccessfulReqMsg'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'registerCredentials'>>;
  renewAccessToken?: Resolver<ResolversTypes['AccessTokenResponse'], ParentType, ContextType, RequireFields<MutationRenewAccessTokenArgs, 'refreshCredentials'>>;
  updateGuitarProducent?: Resolver<ResolversTypes['SuccessfulReqMsg'], ParentType, ContextType, RequireFields<MutationUpdateGuitarProducentArgs, 'producentData'>>;
  updateGuitarShape?: Resolver<ResolversTypes['SuccessfulReqMsg'], ParentType, ContextType, RequireFields<MutationUpdateGuitarShapeArgs, 'guitarShapeData'>>;
  updateUserData?: Resolver<ResolversTypes['SuccessfulReqMsg'], ParentType, ContextType, RequireFields<MutationUpdateUserDataArgs, 'data'>>;
  updateUserPassword?: Resolver<ResolversTypes['SuccessfulReqMsg'], ParentType, ContextType, RequireFields<MutationUpdateUserPasswordArgs, 'newPasswordInput'>>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getGuitarProducent?: Resolver<ResolversTypes['GuitarProducent'], ParentType, ContextType, RequireFields<QueryGetGuitarProducentArgs, 'id'>>;
  getGuitarProducents?: Resolver<ResolversTypes['GetGuitarProducentsRes'], ParentType, ContextType, Partial<QueryGetGuitarProducentsArgs>>;
  getGuitarShape?: Resolver<ResolversTypes['GuitarShape'], ParentType, ContextType, RequireFields<QueryGetGuitarShapeArgs, 'id'>>;
  getGuitarShapes?: Resolver<ResolversTypes['GetGuitarShapesRes'], ParentType, ContextType, Partial<QueryGetGuitarShapesArgs>>;
  getUserData?: Resolver<ResolversTypes['UserType'], ParentType, ContextType>;
  removeGuitarProducent?: Resolver<ResolversTypes['SuccessfulReqMsg'], ParentType, ContextType, RequireFields<QueryRemoveGuitarProducentArgs, 'id'>>;
  removeGuitarShape?: Resolver<ResolversTypes['SuccessfulReqMsg'], ParentType, ContextType, RequireFields<QueryRemoveGuitarShapeArgs, 'id'>>;
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
  GetGuitarProducentsRes?: GetGuitarProducentsResResolvers<ContextType>;
  GetGuitarShapesRes?: GetGuitarShapesResResolvers<ContextType>;
  GuitarProducent?: GuitarProducentResolvers<ContextType>;
  GuitarShape?: GuitarShapeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SuccessfulReqMsg?: SuccessfulReqMsgResolvers<ContextType>;
  Tokens?: TokensResolvers<ContextType>;
  UserType?: UserTypeResolvers<ContextType>;
};

