export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  userWorkspace?: Maybe<WorkspaceUser>;
  userWorkspaces?: Maybe<WorkspaceUserConnection>;
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

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a workspace for current user */
  createWorkspace: WorkspaceUser;
};


export type MutationCreateWorkspaceArgs = {
  name: Scalars['String'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Workspace = {
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

export type WorkspaceUser = {
  __typename?: 'WorkspaceUser';
  id: Scalars['Int'];
  role: WorkspaceUserRole;
  user: User;
  workspace: Workspace;
};

export type WorkspaceProjectSetup = {
  __typename?: 'WorkspaceProjectSetup';
  id: Scalars['Int'];
  active: Scalars['Boolean'];
};

export type WorkspaceProject = {
  __typename?: 'WorkspaceProject';
  id: Scalars['Int'];
  name: Scalars['String'];
  workspace?: Maybe<Workspace>;
  setup?: Maybe<WorkspaceProjectSetup>;
};

export type User = {
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
