import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateHackInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  category: Scalars['String'];
  body: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Hack = {
  __typename?: 'Hack';
  id: Scalars['String'];
  title: Scalars['String'];
  category: Scalars['String'];
  description: Scalars['String'];
  body: Scalars['String'];
  updates?: Maybe<Scalars['String']>;
  points: Scalars['Int'];
  voteStatus?: Maybe<Scalars['Int']>;
  verified: Scalars['Boolean'];
  creatorId: Scalars['String'];
  creator: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  descriptionSnippet: Scalars['String'];
  duration: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  createHack: Hack;
  updateHack?: Maybe<Hack>;
  verifyHack?: Maybe<Hack>;
  verifyUpdate?: Maybe<Hack>;
  deleteHack?: Maybe<Scalars['Boolean']>;
  vote: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  admin?: Maybe<Scalars['Boolean']>;
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  token: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationCreateHackArgs = {
  input: CreateHackInput;
};


export type MutationUpdateHackArgs = {
  input: UpdateHackInput;
  id: Scalars['String'];
};


export type MutationVerifyHackArgs = {
  id: Scalars['String'];
};


export type MutationVerifyUpdateArgs = {
  id: Scalars['String'];
};


export type MutationDeleteHackArgs = {
  id: Scalars['String'];
};


export type MutationVoteArgs = {
  value: Scalars['Int'];
  hackId: Scalars['String'];
};

export type PaginatedHacks = {
  __typename?: 'PaginatedHacks';
  hacks: Array<Hack>;
  hasMore: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  verifiedHacks: PaginatedHacks;
  unverifiedHacks: PaginatedHacks;
  userHacks: Array<Hack>;
  hack?: Maybe<Hack>;
};


export type QueryVerifiedHacksArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryUnverifiedHacksArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryHackArgs = {
  id: Scalars['String'];
};

export type UpdateHackInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  role: Scalars['String'];
  changePasswordToken?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type HackSnippetFragment = (
  { __typename?: 'Hack' }
  & Pick<Hack, 'id' | 'title' | 'category' | 'descriptionSnippet' | 'points' | 'voteStatus' | 'duration' | 'createdAt' | 'updatedAt'>
  & { creator: (
    { __typename?: 'User' }
    & RegularUserFragment
  ) }
);

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularHackFragment = (
  { __typename?: 'Hack' }
  & Pick<Hack, 'id' | 'title' | 'category' | 'description' | 'body' | 'updates' | 'points' | 'voteStatus' | 'duration' | 'createdAt' | 'updatedAt'>
  & { creator: (
    { __typename?: 'User' }
    & RegularUserFragment
  ) }
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'email' | 'role'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )>, errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>> }
);

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type CreateHackMutationVariables = Exact<{
  input: CreateHackInput;
}>;


export type CreateHackMutation = (
  { __typename?: 'Mutation' }
  & { createHack: (
    { __typename?: 'Hack' }
    & RegularHackFragment
  ) }
);

export type DeleteHackMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteHackMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteHack'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
  admin?: Maybe<Scalars['Boolean']>;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type UpdateHackMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateHackInput;
}>;


export type UpdateHackMutation = (
  { __typename?: 'Mutation' }
  & { updateHack?: Maybe<(
    { __typename?: 'Hack' }
    & RegularHackFragment
  )> }
);

export type VerifyHackMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type VerifyHackMutation = (
  { __typename?: 'Mutation' }
  & { verifyHack?: Maybe<(
    { __typename?: 'Hack' }
    & RegularHackFragment
  )> }
);

export type VerifyUpdateMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type VerifyUpdateMutation = (
  { __typename?: 'Mutation' }
  & { verifyUpdate?: Maybe<(
    { __typename?: 'Hack' }
    & RegularHackFragment
  )> }
);

export type VoteMutationVariables = Exact<{
  hackId: Scalars['String'];
  value: Scalars['Int'];
}>;


export type VoteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'vote'>
);

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type HackQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type HackQuery = (
  { __typename?: 'Query' }
  & { hack?: Maybe<(
    { __typename?: 'Hack' }
    & RegularHackFragment
  )> }
);

export type UnverifiedHacksQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type UnverifiedHacksQuery = (
  { __typename?: 'Query' }
  & { unverifiedHacks: (
    { __typename?: 'PaginatedHacks' }
    & Pick<PaginatedHacks, 'hasMore'>
    & { hacks: Array<(
      { __typename?: 'Hack' }
      & HackSnippetFragment
    )> }
  ) }
);

export type UserHacksQueryVariables = Exact<{ [key: string]: never; }>;


export type UserHacksQuery = (
  { __typename?: 'Query' }
  & { userHacks: Array<(
    { __typename?: 'Hack' }
    & Pick<Hack, 'verified'>
    & HackSnippetFragment
  )> }
);

export type VerifiedHacksQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type VerifiedHacksQuery = (
  { __typename?: 'Query' }
  & { verifiedHacks: (
    { __typename?: 'PaginatedHacks' }
    & Pick<PaginatedHacks, 'hasMore'>
    & { hacks: Array<(
      { __typename?: 'Hack' }
      & HackSnippetFragment
    )> }
  ) }
);

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  email
  role
}
    `;
export const HackSnippetFragmentDoc = gql`
    fragment HackSnippet on Hack {
  id
  title
  category
  descriptionSnippet
  points
  voteStatus
  duration
  creator {
    ...RegularUser
  }
  createdAt
  updatedAt
}
    ${RegularUserFragmentDoc}`;
export const RegularHackFragmentDoc = gql`
    fragment RegularHack on Hack {
  id
  title
  category
  description
  body
  updates
  points
  voteStatus
  duration
  creator {
    ...RegularUser
  }
  createdAt
  updatedAt
}
    ${RegularUserFragmentDoc}`;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  user {
    ...RegularUser
  }
  errors {
    ...RegularError
  }
}
    ${RegularUserFragmentDoc}
${RegularErrorFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($newPassword: String!, $token: String!) {
  changePassword(newPassword: $newPassword, token: $token) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateHackDocument = gql`
    mutation CreateHack($input: CreateHackInput!) {
  createHack(input: $input) {
    ...RegularHack
  }
}
    ${RegularHackFragmentDoc}`;

export function useCreateHackMutation() {
  return Urql.useMutation<CreateHackMutation, CreateHackMutationVariables>(CreateHackDocument);
};
export const DeleteHackDocument = gql`
    mutation DeleteHack($id: String!) {
  deleteHack(id: $id)
}
    `;

export function useDeleteHackMutation() {
  return Urql.useMutation<DeleteHackMutation, DeleteHackMutationVariables>(DeleteHackDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!, $admin: Boolean) {
  register(options: $options, admin: $admin) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdateHackDocument = gql`
    mutation UpdateHack($id: String!, $input: UpdateHackInput!) {
  updateHack(id: $id, input: $input) {
    ...RegularHack
  }
}
    ${RegularHackFragmentDoc}`;

export function useUpdateHackMutation() {
  return Urql.useMutation<UpdateHackMutation, UpdateHackMutationVariables>(UpdateHackDocument);
};
export const VerifyHackDocument = gql`
    mutation VerifyHack($id: String!) {
  verifyHack(id: $id) {
    ...RegularHack
  }
}
    ${RegularHackFragmentDoc}`;

export function useVerifyHackMutation() {
  return Urql.useMutation<VerifyHackMutation, VerifyHackMutationVariables>(VerifyHackDocument);
};
export const VerifyUpdateDocument = gql`
    mutation VerifyUpdate($id: String!) {
  verifyUpdate(id: $id) {
    ...RegularHack
  }
}
    ${RegularHackFragmentDoc}`;

export function useVerifyUpdateMutation() {
  return Urql.useMutation<VerifyUpdateMutation, VerifyUpdateMutationVariables>(VerifyUpdateDocument);
};
export const VoteDocument = gql`
    mutation vote($hackId: String!, $value: Int!) {
  vote(hackId: $hackId, value: $value)
}
    `;

export function useVoteMutation() {
  return Urql.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument);
};
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useCurrentUserQuery(options: Omit<Urql.UseQueryArgs<CurrentUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CurrentUserQuery>({ query: CurrentUserDocument, ...options });
};
export const HackDocument = gql`
    query Hack($id: String!) {
  hack(id: $id) {
    ...RegularHack
  }
}
    ${RegularHackFragmentDoc}`;

export function useHackQuery(options: Omit<Urql.UseQueryArgs<HackQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<HackQuery>({ query: HackDocument, ...options });
};
export const UnverifiedHacksDocument = gql`
    query UnverifiedHacks($limit: Int!, $cursor: String) {
  unverifiedHacks(limit: $limit, cursor: $cursor) {
    hacks {
      ...HackSnippet
    }
    hasMore
  }
}
    ${HackSnippetFragmentDoc}`;

export function useUnverifiedHacksQuery(options: Omit<Urql.UseQueryArgs<UnverifiedHacksQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UnverifiedHacksQuery>({ query: UnverifiedHacksDocument, ...options });
};
export const UserHacksDocument = gql`
    query UserHacks {
  userHacks {
    ...HackSnippet
    verified
  }
}
    ${HackSnippetFragmentDoc}`;

export function useUserHacksQuery(options: Omit<Urql.UseQueryArgs<UserHacksQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserHacksQuery>({ query: UserHacksDocument, ...options });
};
export const VerifiedHacksDocument = gql`
    query VerifiedHacks($limit: Int!, $cursor: String) {
  verifiedHacks(limit: $limit, cursor: $cursor) {
    hacks {
      ...HackSnippet
    }
    hasMore
  }
}
    ${HackSnippetFragmentDoc}`;

export function useVerifiedHacksQuery(options: Omit<Urql.UseQueryArgs<VerifiedHacksQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<VerifiedHacksQuery>({ query: VerifiedHacksDocument, ...options });
};