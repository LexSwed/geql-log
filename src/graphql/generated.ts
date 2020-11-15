export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};


export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  userWorkspace?: Maybe<WorkspaceUser>;
  userWorkspaces?: Maybe<WorkspaceUserConnection>;
  project?: Maybe<WorkspaceProject>;
};


export type QueryUserWorkspaceArgs = {
  workspaceId: Scalars['Int'];
};


export type QueryUserWorkspacesArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};


export type QueryProjectArgs = {
  id: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a workspace for current user */
  createWorkspace: WorkspaceUser;
  /** Create project API key */
  createSetup: WorkspaceProjectSetup;
};


export type MutationCreateWorkspaceArgs = {
  name: Scalars['String'];
};


export type MutationCreateSetupArgs = {
  projectId: Scalars['Int'];
};

export type Node = {
  /** Resource ID */
  id: Scalars['Int'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Workspace = Node & {
  __typename?: 'Workspace';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  projects?: Maybe<WorkspaceProjectConnection>;
};


export type WorkspaceProjectsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};

export type WorkspaceUser = Node & {
  __typename?: 'WorkspaceUser';
  id: Scalars['Int'];
  role: WorkspaceUserRole;
  user: User;
  workspace: Workspace;
};

export type WorkspaceProjectSetup = Node & {
  __typename?: 'WorkspaceProjectSetup';
  id: Scalars['Int'];
  key: Scalars['String'];
  lastUsedAt?: Maybe<Scalars['DateTime']>;
};

export type WorkspaceProjectStats = Node & {
  __typename?: 'WorkspaceProjectStats';
  id: Scalars['Int'];
};

export type WorkspaceProject = Node & {
  __typename?: 'WorkspaceProject';
  id: Scalars['Int'];
  name: Scalars['String'];
  workspace?: Maybe<Workspace>;
  activeSetup?: Maybe<WorkspaceProjectSetup>;
  stats?: Maybe<WorkspaceProjectStatsConnection>;
};


export type WorkspaceProjectStatsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};

export type User = Node & {
  __typename?: 'User';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  workspaces?: Maybe<WorkspaceUserConnection>;
};


export type UserWorkspacesArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};

export type WorkspaceUserConnection = {
  __typename?: 'WorkspaceUserConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<WorkspaceUserEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type WorkspaceUserEdge = {
  __typename?: 'WorkspaceUserEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<WorkspaceUser>;
};

/** PageInfo cursor, as defined in https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Used to indicate whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Used to indicate whether more edges exist prior to the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean'];
  /** The cursor corresponding to the first nodes in edges. Null if the connection is empty. */
  startCursor?: Maybe<Scalars['String']>;
  /** The cursor corresponding to the last nodes in edges. Null if the connection is empty. */
  endCursor?: Maybe<Scalars['String']>;
};

export type WorkspaceProjectConnection = {
  __typename?: 'WorkspaceProjectConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<WorkspaceProjectEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type WorkspaceProjectEdge = {
  __typename?: 'WorkspaceProjectEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<WorkspaceProject>;
};

export enum WorkspaceUserRole {
  User = 'USER',
  Admin = 'ADMIN'
}

export type WorkspaceProjectStatsConnection = {
  __typename?: 'WorkspaceProjectStatsConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<WorkspaceProjectStatsEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type WorkspaceProjectStatsEdge = {
  __typename?: 'WorkspaceProjectStatsEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<WorkspaceProjectStats>;
};

export type SetupFragmentFragment = (
  { __typename?: 'WorkspaceProjectSetup' }
  & Pick<WorkspaceProjectSetup, 'id' | 'key'>
);

export type GetActiveSetupQueryVariables = Exact<{
  projectId: Scalars['Int'];
}>;


export type GetActiveSetupQuery = (
  { __typename?: 'Query' }
  & { project?: Maybe<(
    { __typename?: 'WorkspaceProject' }
    & Pick<WorkspaceProject, 'id'>
    & { activeSetup?: Maybe<(
      { __typename?: 'WorkspaceProjectSetup' }
      & SetupFragmentFragment
    )> }
  )> }
);

export type CreateSetupMutationVariables = Exact<{
  projectId: Scalars['Int'];
}>;


export type CreateSetupMutation = (
  { __typename?: 'Mutation' }
  & { createSetup: (
    { __typename?: 'WorkspaceProjectSetup' }
    & SetupFragmentFragment
  ) }
);

export type CreateWorkspaceMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateWorkspaceMutation = (
  { __typename?: 'Mutation' }
  & { createWorkspace: (
    { __typename?: 'WorkspaceUser' }
    & { workspace: (
      { __typename?: 'Workspace' }
      & Pick<Workspace, 'id'>
    ) }
  ) }
);

export type ListWorkspaceProjectsQueryVariables = Exact<{
  workspaceId: Scalars['Int'];
}>;


export type ListWorkspaceProjectsQuery = (
  { __typename?: 'Query' }
  & { userWorkspace?: Maybe<(
    { __typename?: 'WorkspaceUser' }
    & { workspace: (
      { __typename?: 'Workspace' }
      & Pick<Workspace, 'id' | 'name'>
      & { projects?: Maybe<(
        { __typename?: 'WorkspaceProjectConnection' }
        & { edges?: Maybe<Array<Maybe<(
          { __typename?: 'WorkspaceProjectEdge' }
          & Pick<WorkspaceProjectEdge, 'cursor'>
          & { node?: Maybe<(
            { __typename?: 'WorkspaceProject' }
            & Pick<WorkspaceProject, 'id' | 'name'>
          )> }
        )>>> }
      )> }
    ) }
  )> }
);

export type GetStatsQueryVariables = Exact<{
  projectId: Scalars['Int'];
}>;


export type GetStatsQuery = (
  { __typename?: 'Query' }
  & { project?: Maybe<(
    { __typename?: 'WorkspaceProject' }
    & { stats?: Maybe<(
      { __typename?: 'WorkspaceProjectStatsConnection' }
      & { edges?: Maybe<Array<Maybe<(
        { __typename?: 'WorkspaceProjectStatsEdge' }
        & { node?: Maybe<(
          { __typename?: 'WorkspaceProjectStats' }
          & Pick<WorkspaceProjectStats, 'id'>
        )> }
      )>>> }
    )> }
  )> }
);
